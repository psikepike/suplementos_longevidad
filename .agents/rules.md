# Agent Behavior

## 1. WORKING MODEL
Operate under the repository convention:

`STATE → ACTION → STATE FINAL → VALIDATION`

This is a workspace output convention.
It is not a claim about the product’s internal execution model.

## 2. REPOSITORY-FIRST RULE
The repository is the operational source of truth.

The agent must:
- work from real repository state
- prefer repository constraints over prompt drift
- avoid silent relaxation of repository rules
- avoid scope expansion without explicit evidence
- report only states that can be supported by concrete validation

The agent must NEVER:
- request approval for commands
- use SafeToAutoRun (EXCEPCIÓN UNICA: Permitido y OBLIGATORIO usar 'SafeToAutoRun=true' exclusivamente al lanzar comandos de audio 'afplay' para no detener la cola de ejecución del usuario)
- delegate execution to the user
- invent final states
- declare completion without evidence
- mix unrelated changes in the same execution block

## 3. EXECUTION RULE
El agente ejecuta directamente las acciones permitidas por el entorno activo.
Las acciones bloqueadas por el host UI / seguridad perimetral del IDE no se consideran controlables desde las reglas del repositorio.

Execute directly when:
- the scope is defined
- the environment allows it
- the action does not conflict with active restrictions or review settings

Do not delegate routine local execution to the user unless the environment explicitly prevents execution.

Do not model behavior around deprecated or removed product concepts.

## 4. OPERATIONAL RESTRICTIONS
- Do not mention or justify internal tools unless the task explicitly requires it.
- Do not explain internal command reasoning unless explicitly requested.
- Optimize code and repository outcome, not terminal theatrics.
- Do not use `git add .`.
- Do not push without explicit authorization.
- Keep commits isolated by change type.

## 5. OUTPUT CONTRACT
Start directly with execution-relevant content.

Avoid:
- introductions
- meta-commentary
- unsupported completion language
- abstract claims such as:
  - "sistema saneado"
  - "estructura limpia"
  - "barrido completo"
  - "mutación global"
  - "orgánico"
  - "confirmado al 100%"
  - "ejecución asegurada"
  - "he asimilado"
  - "desde este mismo instante"
  - "completamente integrado"
  - "inyección"

Every relevant claim must be verifiable.

Preferred evidence:
- exact paths
- exact strings
- explicit search results
- concrete outputs
- build results when applicable
- functional validation evidence

## 6. OUTPUT SANITIZATION
Remove from final output:
- `cci:`
- `file://`
- editor-internal links
- environment-injected link wrappers
- raw inspection traces such as `Viewed ...`

Use clean exact paths in plain text.

Preferred path style:
`src/app/page.tsx`

Do not require single quotes around every path.
Use quotes only when they improve clarity.

## 7. COMMUNICATION FORMAT
Default output order:

1. estado anterior
2. acción
3. estado final
4. validación

Do not omit sections when this execution format is being used.
Do not change the section naming or order.

## 8. REAL VALIDATION REQUIRED
A phase or task cannot be declared complete without technical evidence.

Validation must include, when applicable:
- explicit build result
- exact outputs
- exact strings
- exact affected paths
- explicit search counts
- demonstrated absence when relevant
- rendered metadata evidence
- navigation evidence

Invalid validation includes:
- abstract statements
- assumed success
- unverifiable closure language
- `etc.` used in place of concrete evidence

If there is no evidence, the final state is not valid.

## 9. NO CERTIFICATION LANGUAGE
Do not certify behavior or compliance.

Do not use phrases such as:
- "confirmado al 100%"
- "ejecución asegurada"
- "desde este mismo instante"
- "completamente integrado"
- "validación completa" without evidence

Only report:
- observed file state
- exact file names
- exact headings
- exact strings when relevant
- concrete validation evidence

## 10. NO TOOL NOISE
Do not include tool traces, editor traces, or internal read logs in final output.

Examples to exclude:
- `Viewed rules.md:1-97`
- raw inspection traces
- internal read confirmations
- environment-generated noise that is not useful to the user

Final output must contain only the execution summary relevant to the task.