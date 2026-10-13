#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash|PowerShell). Barrera dura sobre git:
#   1. `git commit` en rama protegida (main/develop/master) → bloquea.
#   2. `git commit -m` con mensaje fuera de conventional commits → bloquea.
#   3. `git push` desde rama protegida o hacia main/develop/master → bloquea.
#
# Que el commit/push ocurra solo cuando el usuario lo pide lo garantizan las
# reglas `ask` de .claude/settings.json (piden confirmación siempre) y CLAUDE.md.
# Este hook cubre lo que no depende del pedido: rama y formato.
#
# Entrada: JSON por stdin con tool_input.command.
# Salida: exit 0 permite; exit 2 bloquea y stderr vuelve a Claude.
# Dependencias: bash + git + node (ya requerido por el proyecto; sin python).
# Diseño: si el hook falla por un bug propio, deja pasar (exit 0).
set +e

REPO="${CLAUDE_PROJECT_DIR:-$(pwd)}"
INPUT="$(cat)"

CMD="$(printf '%s' "$INPUT" | node -e '
let s = "";
process.stdin.on("data", (c) => (s += c)).on("end", () => {
  try { process.stdout.write(JSON.parse(s).tool_input?.command ?? ""); } catch {}
});
' 2>/dev/null)"
[ -z "$CMD" ] && exit 0

# Una sola línea para que los patrones no se corten en continuaciones `\`.
FLAT="$(printf '%s' "$CMD" | tr '\r\n' '  ' | sed -E 's/\\[[:space:]]+/ /g')"

# `git` seguido de flags opcionales (`-C dir`, `--git-dir=x`) y el subcomando.
git_sub() {
  printf '%s' "$FLAT" | grep -qE "(^|[;&|( ])git( +-[^ ]+( +[^- ][^ ]*)?)* +$1( |\$)"
}

BRANCH="$(cd "$REPO" 2>/dev/null && git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ -z "$BRANCH" ] && exit 0
PROTECTED=0
case "$BRANCH" in main|develop|master) PROTECTED=1 ;; esac

# ── push ────────────────────────────────────────────────────────────────
if git_sub push; then
  # Solo el tramo del push (hasta el próximo ; & |): si se mirara todo el
  # comando, un mensaje de commit que nombre `develop` o `main` bloquearía.
  PUSH_SEG="$(printf '%s' "$FLAT" | grep -oE 'git( +-[^ ]+( +[^- ][^ ]*)?)* +push[^;&|]*')"
  TARGETS_PROTECTED=0
  printf '%s' "$PUSH_SEG" | grep -qE '(^|[ :+])(refs/heads/)?(main|develop|master)( |$)' && TARGETS_PROTECTED=1
  if [ "$PROTECTED" -eq 1 ] || [ "$TARGETS_PROTECTED" -eq 1 ]; then
    cat >&2 <<EOF
🚫 Push bloqueado: no se pushea a \`main\`/\`develop\`/\`master\` (rama actual: \`$BRANCH\`).

Esas ramas solo reciben cambios por Pull Request mergeado por una persona:
feature → \`develop\` con \`/pr\`, \`develop\` → \`main\` con \`/release\`. Claude solo
pushea su feature branch al abrir un PR. Ver CLAUDE.md § Regla estricta de Git.
EOF
    exit 2
  fi
  exit 0
fi

# ── commit ──────────────────────────────────────────────────────────────
git_sub commit || exit 0

if [ "$PROTECTED" -eq 1 ]; then
  cat >&2 <<EOF
🚫 Commit bloqueado: estás en la rama protegida \`$BRANCH\`.

Creá o retomá una feature branch (\`feat/<slug>\`, \`fix/<slug>\`…) con
\`/branch-new\` y reintentá desde ahí. Los cambios siguen en el working tree.
EOF
  exit 2
fi

# Primer línea del mensaje: -m "…", -m '…', --message=…, o heredoc `$(cat <<'EOF' … EOF)`.
SUBJECT="$(printf '%s' "$CMD" | node -e '
let s = "";
process.stdin.on("data", (c) => (s += c)).on("end", () => {
  const here = s.match(/<<-?\s*["\x27]?(\w+)["\x27]?\s*\r?\n([\s\S]*?)\r?\n\s*\1\b/);
  const flag = s.match(/(?:\s-[a-zA-Z]*m|--message[= ])\s*(?:"((?:[^"\\]|\\.)*)"|\x27([^\x27]*)\x27|(\S+))/);
  let msg = "";
  if (flag && !(flag[1] ?? "").startsWith("$(")) msg = flag[1] ?? flag[2] ?? flag[3] ?? "";
  else if (here) msg = here[2];
  process.stdout.write(msg.trim().split(/\r?\n/)[0] ?? "");
});
' 2>/dev/null)"

# Sin -m (editor, -F archivo, --amend --no-edit): lo valida .githooks/commit-msg.
[ -z "$SUBJECT" ] && exit 0

REGEX='^(feat|fix|chore|refactor|docs|test|style|perf|ci|build)(\([a-z0-9._-]+\))?!?: .+'
if ! printf '%s' "$SUBJECT" | grep -qE "$REGEX"; then
  cat >&2 <<EOF
🚫 Commit bloqueado: el mensaje no cumple conventional commits.

Recibido:  $SUBJECT
Esperado:  type(scope): description
  type ∈ {feat, fix, chore, refactor, docs, test, style, perf, ci, build}
  description en inglés, minúsculas, imperativo, sin punto final.

Ejemplos: feat(home): add audience section · style(header): align theme toggle
EOF
  exit 2
fi
exit 0
