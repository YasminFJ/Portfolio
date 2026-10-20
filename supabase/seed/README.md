# Portfolio content seed

- `content.ts` — verified content (English). Edit here only to regenerate the seed.
- `npm run seed:sql` — writes `portfolio_seed.sql` (idempotent upserts, never deletes).
- Day-to-day edits happen directly in Supabase (Table Editor). Supabase is the source of truth;
  after the initial load, prefer editing there and only regenerate the seed for a fresh project.

Applied to project `portfolio` (ref `jbjincheriznduglwxbv`) on 2026-10-20.

Fields marked `pendingConfirmation` (dates/titles) must be confirmed against LinkedIn.
`site_content.languages` is stored unpublished until the levels are approved.
