# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📖 Context Management Strategy

**IMPORTANT**: To avoid context pollution, use lazy loading:

1. **Read this file first** (251 lines - index only)
2. **Load guides/** only when triggered (core principles, ~80-100 lines each)
3. **Reference commands/** only if details needed (full docs, ~400-500 lines each)

**Trigger-based loading:**
- User asks course question → Load `.claude/guides/task-manager-core.md`
- User ends session → Load `.claude/guides/session-logger-core.md`
- Need detailed workflow → Reference `.claude/commands/task-manager/WORKFLOWS.md`

**See**: `.claude/README.md` for complete folder structure guide.

## Project Overview

This is a monorepo project for learning UI component modularization and design systems. It contains two packages demonstrating the migration from a legacy design system (`before`) to a modern design system (`after`) using TailwindCSS, CVA (Class Variance Authority), shadcn/ui, and Storybook.

**Purpose**: Understanding the problems with legacy systems and learning modern design system practices including:
- The concept of Atomic Design vs. practical folder structure
- Migration from CSS to TailwindCSS + CVA
- Component API consistency
- Accessibility and type safety

## Communication Guidelines

### Language Preference
- **항상 한글로 답변해주세요**: All responses should be in Korean unless specifically requested otherwise.

### MCP (Model Context Protocol) Usage
- **MCP를 적극 활용하세요**: When MCP tools can provide more accurate, up-to-date, or relevant information, they MUST be used.
- Examples of when to use MCP:
  - Looking up library documentation (Context7)
  - Accessing IDE diagnostics
  - Executing code in Jupyter notebooks
  - Web automation with Playwright

### Interactive Clarification
- **필요한 정보를 요청하세요**: If additional information would help provide a better answer, proactively ask the user for clarification.
- Don't make assumptions when requirements are unclear
- Use the AskUserQuestion tool when facing ambiguous implementation choices

### Documentation Reference
- **`.claude/` 폴더를 참고하세요**: When looking for reference documentation or creating project-specific documentation:
  - Check `.claude/doc/` directory first
  - Current documentation includes:
    - `chapter_goal.md`: Project objectives, requirements, and implementation guidelines
  - This is the primary source for project context and guidelines

## Task Manager (Coaching Mode)

**Purpose:** Coach learners to solve Chapter3-1 independently (no direct implementation).

**Auto-trigger:** Questions ("어떻게", "왜", "다음"), stuck, lost, validation requests

**Principles:**
- ⛔ No direct code/answers
- ✅ Socratic questions, hints, checklists, progressive guidance (Level 1-4)

**Core Guide:** `.claude/guides/task-manager-core.md`

**Detailed Resources:**
- Full guide: `.claude/commands/task-manager/TASK_MANAGER.md`
- Workflows: `.claude/commands/task-manager/WORKFLOWS.md`
- Task list: `.claude/tasks/breakdown.md`

## Learning Session Logger

**Purpose:** Auto-record learning journey in Notion markdown for PR/retro writing.

**Auto-trigger:** "오늘은 여기까지", "학습 마무리", "세션 종료"

**Collects:** Questions/answers, code changes (git log), task progress, timestamps

**Output:** `.claude/tasks/learning-sessions/YYYY-MM-DD-session-N.md`

**Includes:** Session info, Q&A, concepts, code snippets, problems solved, commits table, **PR/retro notes**

**Security:** Auto-filters API keys, tokens, passwords

**Core Guide:** `.claude/guides/session-logger-core.md`

**Detailed Resources:**
- Full guide: `.claude/commands/task-manager/session-logger.md`
- Template: `.claude/commands/task-manager/templates/notion-session-template.md`
- Sessions: `.claude/tasks/learning-sessions/`

## Development Commands

### Root Level (Monorepo)
```bash
# Install dependencies (uses pnpm)
pnpm install

# Development
pnpm dev                  # Run 'before' package dev server
pnpm dev:before          # Run legacy system
pnpm dev:after           # Run modern system

# Build
pnpm build               # Build all packages
pnpm build:before        # Build legacy system only
pnpm build:after         # Build modern system only

# Testing
pnpm test                # Run tests in watch mode (all packages)
pnpm test:run            # Run tests once (all packages)
pnpm test:before         # Test legacy system
pnpm test:after          # Test modern system
pnpm test:run:before     # Run legacy tests once
pnpm test:run:after      # Run modern tests once

# Linting
pnpm lint                # Lint all packages

# Storybook (after package only)
pnpm storybook           # Run Storybook dev server
pnpm build-storybook     # Build Storybook for production
```

### Package Level
Each package (`packages/before/` and `packages/after/`) can be run independently:
```bash
cd packages/before
pnpm dev                 # Development server
pnpm build              # Production build
pnpm test               # Run tests in watch mode
pnpm test:ui            # Run tests with Vitest UI
pnpm test:run           # Run tests once
pnpm lint               # Lint code
pnpm preview            # Preview production build
```

## Architecture

### Monorepo Structure
```
packages/
├── before/              # Legacy design system (analyze this)
│   └── src/
│       ├── components/
│       │   ├── atoms/      # Button, Badge
│       │   ├── molecules/  # FormInput, FormSelect, FormTextarea, FormCheckbox
│       │   └── organisms/  # Header, Card, Modal, Table, Alert
│       ├── pages/          # ManagementPage
│       ├── services/       # userService, postService
│       └── styles/         # CSS files
│
└── after/               # Modern design system (implement here)
    └── src/
        ├── components/     # Target structure (shadcn/ui style: flat ui/ folder)
        ├── tokens/         # Design tokens (to be added)
        ├── hooks/          # Custom hooks (to be added)
        └── stories/        # Storybook stories (to be added)
```

### Key Architectural Concepts

**Legacy System Issues (before package)**:
1. **Inconsistent Component APIs**: Each component uses different prop names (`width` vs `size`, `helpText` vs `help` vs `description`)
2. **Mixed Styling Approaches**: Inline styles, CSS Modules, and hardcoded color values coexist
3. **UI Components with Business Logic**: Components like `Button.tsx` contain domain-specific logic (checking user roles, post status)
4. **Poor Type Safety**: Loose type definitions, manual validation
5. **Accessibility Issues**: Incomplete ARIA labels, limited keyboard navigation

**Modern System Goals (after package)**:
1. **Consistent APIs**: Unified prop naming conventions
2. **TailwindCSS + CVA**: Utility-first styling with variant patterns
3. **Separation of Concerns**: UI components free from business logic
4. **Type Safety**: Strict TypeScript with VariantProps
5. **Accessibility**: Full ARIA support via Radix UI primitives

### Data Layer

Both packages use **localStorage-based services** for user and post management:
- `userService`: CRUD operations for User entities
- `postService`: CRUD operations for Post entities + status actions (publish, archive, restore)

**User Interface**:
- `id`, `username`, `email`, `role` (admin/moderator/user), `status` (active/inactive/suspended)

**Post Interface**:
- `id`, `title`, `content`, `author`, `category`, `status` (draft/published/archived), `views`

Services include validation (e.g., duplicate username check, minimum title length).

### Testing

- **Framework**: Vitest with React Testing Library
- **Setup**: `src/test/setup.ts` configures jsdom environment
- **Tests**: Located in `__tests__/` directories (e.g., `ManagementPage.test.tsx`)
- **Commands**: Use `pnpm test` for watch mode, `pnpm test:ui` for visual interface

## Important Implementation Notes

### When Working on the "after" Package

1. **Use shadcn/ui components**: The goal is to use shadcn/ui CLI to add components:
   ```bash
   cd packages/after
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add input
   # etc.
   ```

2. **Component Structure**: Use flat `components/ui/` folder (like shadcn/ui), not Atomic Design folder hierarchy

3. **Variant Pattern with CVA**: Define variants using class-variance-authority:
   ```typescript
   import { cva, type VariantProps } from "class-variance-authority";

   const buttonVariants = cva(
     "base-classes",
     {
       variants: {
         variant: { primary: "...", secondary: "..." },
         size: { sm: "...", md: "..." }
       },
       defaultVariants: { variant: "primary", size: "md" }
     }
   );
   ```

4. **Separation of Concerns**: Keep UI components pure. Business logic should remain in page components or services.

5. **Storybook Stories**: Create stories for each component to document usage and variants

### Migration Strategy

When migrating from `before` to `after`:
1. Identify the component's **pure UI responsibilities**
2. Extract **business logic** to page level or custom hooks
3. Define **variants** instead of conditional styling
4. Ensure **type safety** with proper TypeScript interfaces
5. Add **accessibility** features using Radix UI primitives
6. Write **Storybook stories** for documentation

### Key Files to Reference

- `packages/before/src/components/atoms/Button.tsx`: Example of UI component with mixed concerns
- `packages/before/src/pages/ManagementPage.tsx`: Main application page showing CRUD operations
- `packages/before/src/services/`: Data layer with localStorage-based persistence

## Technology Stack

- **React 19** with TypeScript
- **Vite**: Build tool and dev server
- **Vitest**: Testing framework
- **pnpm**: Package manager (monorepo workspaces)
- **TailwindCSS v4**: Utility-first CSS (target for "after")
- **CVA**: Variant management (target for "after")
- **shadcn/ui**: Component library based on Radix UI (target for "after")
- **Storybook**: Component documentation (target for "after")

## Common Pitfalls

1. **Don't copy Atomic Design folder structure blindly**: The concept is valuable, but flat structure is more practical
2. **Avoid mixing styling approaches**: In "after" package, use TailwindCSS exclusively
3. **Don't put business logic in UI components**: Keep them pure and reusable
4. **Remember to validate**: Services include validation; ensure UI reflects validation errors properly
5. **Type safety matters**: Use strict TypeScript, avoid `any` types
