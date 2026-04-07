# Optional Notify

Use this workflow only for non-critical local notifications.

Rules:
1. Complete the real technical task first.
2. Validate the task with evidence.
3. Trigger optional local notification only if the host environment permits it.
4. If the host blocks the notification, do not mark the technical task as failed.
5. Never depend on audio or desktop side effects for workflow completion.

Examples of optional-only actions:
- terminal bell
- local audio playback
- desktop notification
- OS script side effects
