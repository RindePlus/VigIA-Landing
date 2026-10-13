#!/usr/bin/env bash
# Stop hook: al terminar cada turno, recuerda que hay cambios sin commitear.
#
# Los cambios quedan en el working tree a propósito (ver CLAUDE.md § Regla
# estricta de Git): el desarrollador los revisa en el navegador y decide cuándo
# pedir /commit. Este hook solo informa — nunca bloquea ni commitea.
#
# Sale como JSON con `systemMessage` para que el aviso se vea en la UI; el
# stdout plano de un Stop hook solo aparece en el modo transcript.
# Dependencias: bash + git. Diseño: ante cualquier error, sale 0 sin imprimir.
set +e

REPO="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$REPO" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

STATUS="$(git status --porcelain 2>/dev/null)"
[ -z "$STATUS" ] && exit 0

COUNT="$(printf '%s\n' "$STATUS" | wc -l | tr -d ' ')"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
FILES="$(printf '%s\n' "$STATUS" | head -8 | cut -c4- | tr '\n' ' ')"
[ "$COUNT" -gt 8 ] && FILES="$FILES…"

MSG="💾 $COUNT archivo(s) sin commitear en '$BRANCH': $FILES— revisalos en el navegador y pedí /commit cuando estén listos."

# Escape mínimo para JSON (barras, comillas, tabs).
MSG="$(printf '%s' "$MSG" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' -e 's/\t/ /g')"
printf '{"systemMessage": "%s"}\n' "$MSG"
exit 0
