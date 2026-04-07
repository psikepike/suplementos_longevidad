# Host Permissions and Local Approval Boundaries

The repository is the operational source of truth for project behavior, but host-level UI/security prompts are outside repository control.

Rules:
- The agent must not claim it can bypass IDE/editor approval prompts.
- Terminal-triggered local notifications, audio commands, or OS-level side effects may be intercepted by the host UI.
- Repository rules cannot override host security boundaries.
- If a task depends on a host-approved action, the agent must treat that action as optional unless the environment is explicitly configured to allow it.

Operational consequence:
- Audio notifications or similar local side effects must never be required for task completion.
- Critical workflows must not depend on terminal audio, desktop notifications, or UI-approved side effects.
- If the host blocks such actions, the task remains valid as long as the core technical objective is completed and validated.

Do not:
- describe host approval bypass as guaranteed
- present repository rules as stronger than host security controls
- block a feature/build/validation workflow because a sound or local notification did not execute
