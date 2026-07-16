# LocalLaunch AI

LocalLaunch AI is a production-oriented SaaS foundation for generating editable local business websites from public business information with strong approval and copyright safeguards.

## Workspace

- `apps/web` - Next.js App Router application
- `packages/ui` - shared UI primitives
- `packages/types` - domain model and shared schemas
- `packages/prompts` - AI prompt builders and output guards
- `packages/templates` - theme presets and section blueprints
- `packages/business-logic` - enrichment, generation, and policy helpers

## Getting started

```bash
npm install
npm run dev
```

## Core principles

- Generate original copy instead of copying public descriptions
- Track provenance and approval state for imported content
- Require approval for publishable images and review-based content
- Optimize for premium output quality and SaaS readiness
