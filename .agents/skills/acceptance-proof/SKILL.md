---
name: acceptance-proof
description: Use when a coding task must be driven to real acceptance with evidence, not just code changes. Optimizes for DoD proven, scoped execution, build discipline, and verifiable closure inside this repository.
risk: safe
source: local-adapted
date_added: 2026-04-07
---

# Acceptance Proof

## Overview

Drive a coding task as a bounded execution flow that ends only when acceptance criteria are verified with concrete evidence or the task is explicitly left open.

Core rule:
Do not optimize for "code changed".
Optimize for "acceptance proven with evidence".

This skill is repository-first and must follow local rules, workflows, and constraints before any completion claim.

## When to Use

Use this skill when:
- the task has explicit acceptance criteria or a clearly inferable definition of done
- the task affects implementation, routing, rendering, metadata, SEO, or repository behavior
- the user expects closure based on proof, not intention
- the work must stay inside a tightly bounded scope
- the task should not be declared complete without build and validation when applicable

Do not use this skill for:
- pure brainstorming
- copy-only tasks without acceptance criteria
- open-ended research without an execution target

## Required Inputs

Require these inputs when available:
- task goal
- acceptance criteria or definition of done
- exact affected area
- target environment
- constraints from repository rules

If explicit acceptance criteria do not exist, infer the minimum verifiable acceptance contract from:
- the user request
- repository structure
- existing local rules and constraints

## Local Authority Order

Use this order of authority:
1. repository files and actual workspace state
2. local rules in `.agents/`
3. task prompt
4. inferred defaults

If repository rules and prompt conflict, do not silently relax repository constraints.

## State Machine

Use these states:
- `intake`
- `scope-locked`
- `executing`
- `build-required`
- `validating`
- `accepted`
- `open`
- `escalated`

## Workflow

### 1. Intake
- read the task
- extract the real goal
- identify the likely definition of done
- identify affected files or affected system area

### 2. Scope Lock
- list exact files when possible
- bound the execution area
- do not expand scope without explicit evidence
- if another area is impacted, report it instead of silently absorbing it

### 3. Execute
- apply the smallest sufficient change
- keep implementation aligned with project constraints
- do not mix unrelated changes
- do not optimize terminal choreography; optimize repository outcome

### 4. Build Gate
Trigger build when the task affects, for example:
- app code
- routing
- imports
- metadata
- shared logic
- configuration
- rendering-critical components

If build is required:
- do not move to final acceptance without running it
- do not claim completion if build fails

### 5. Validation
Validation must be concrete and task-relevant.

Use evidence such as:
- exact file paths
- exact strings
- explicit search counts
- build outputs
- rendered metadata proof
- navigation proof
- absence demonstrated with `0 results` style checks when relevant

Do not use:
- abstract closure language
- assumed success
- "should work"
- "done" without evidence

### 6. Acceptance Gate
Move to `accepted` only when every acceptance criterion has matching evidence.

Move to `open` when:
- code changed but acceptance is not yet proven
- build or runtime proof is still missing
- validation is partial
- uncertainty remains but does not require escalation

Move to `escalated` when:
- required execution is blocked by missing permissions, secrets, environment limits, or external dependencies
- destructive operations would be required
- a required decision belongs to the user
- constraints conflict and cannot both be satisfied
- acceptance criteria are missing and cannot be safely inferred

## Stop Conditions

Stop and do not claim success when:
- scope is no longer bounded
- required build failed
- evidence is stale or missing
- validation depends on assumptions
- the task requires a destructive or higher-risk action outside allowed scope

## Human Gates

Stop for human input when:
- production deployment is required
- destructive git or data operations are required
- billing, security, or irreversible configuration changes are involved
- the smallest next decision depends on user preference or risk acceptance

## Output Contract

When reporting status, include:
- `Status`
- `Scope`
- `Acceptance Criteria`
- `Evidence`
- `Open Risks`
- `Need Human Input` only if blocked

Allowed status values:
- `intake`
- `executing`
- `validating`
- `accepted`
- `open`
- `escalated`

Do not report `accepted` unless acceptance is proven with fresh evidence.

## Repository-Specific Notes

For this repository:
- follow repository-first execution
- follow git discipline
- do not push without explicit authorization
- do not close phases without validation
- keep output verifiable
- prefer exact paths and exact strings
- treat build as mandatory when the change affects implementation-critical code paths

## Completion Rule

A task is complete only when:
- the requested scope was handled
- required build passed when applicable
- validation contains concrete evidence
- acceptance criteria are matched to evidence
- no unsupported completion language is used

If any of these conditions fail, the correct final state is not `accepted`.
