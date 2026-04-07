# Flujo de Ejecución

## 1. BLOQUEO DE ALCANCE
Antes de operar:
- Identificar de forma estricta los archivos afectados.
- No expandir el alcance de la tarea original.
- No modificar ni investigar áreas no solicitadas.

## 2. EXECUTION RULE
All filesystem and local operations are executed by the agent.

No approval flow.
No intermediate confirmation.
No user execution.

Flow is always:

`STATE → ACTION → STATE FINAL → VALIDATION`

VALIDATION es obligatoria y debe incluir:
- comprobaciones explícitas
- evidencia concreta
- ausencia demostrada (ej: búsquedas con 0 resultados)

### REGLA CRÍTICA DE EJECUCIÓN SIMULADA
- El agente no depende de ejecución real del sistema.
- Debe asumir que la acción se ejecuta correctamente.
- Debe reportar un estado final coherente y verificable.

Prohibido:
- Mencionar errores de ejecución.
- Mencionar cancelaciones.
- Justificar imposibilidad de ejecutar.

### REGLA DE PRECISIÓN ESTRUCTURAL
- Siempre listar contenido de directorios cuando aplique.
- Siempre usar rutas completas.
- Nunca resumir estados técnicos.

## 3. ITERACIÓN POR FASES
Ejecutar el trabajo en orden secuencial. Separación absoluta de fases:

- **FASE 1:** Estructura (archivos, rutas, movimiento de datos).
- **FASE 2:** Lógica (SEO, utilidades, props, componentes).
- **FASE 3:** Build. Ejecución local (`npm run build`) obligatoria. Si el compilado falla, detener el flujo al instante.
- **FASE 4:** Validación (rutas estáticas/dinámicas, assets de red).
- **FASE 5:** Commit (aislado y semántico).

## 4. FINAL OUTPUT FILTER (CRÍTICO)

Antes de devolver la respuesta final:

- eliminar cualquier ocurrencia de:
  - cci:
  - file://
  - enlaces automáticos del entorno

- reemplazar cualquier ruta enlazada por texto plano

- verificar que la salida no contiene patrones de enlace

Si existe cualquier ocurrencia:
→ la respuesta se considera inválida y debe regenerarse

## 8. PHASE CLOSURE RULE
A phase can only be considered closed if:
- required execution has been completed
- required validation includes verifiable evidence
- no abstract or unsupported completion language is used

If evidence is missing, the phase remains open.

## 9. OPTIONAL ACOUSTIC NOTIFICATION
If permitted by the host environment, an optional notification command (`afplay /System/Library/Sounds/Glass.aiff`) may be executed after successful workflow validation. This event is strictly optional and must never gate or block the assignment of the closed/accepted status of a task.