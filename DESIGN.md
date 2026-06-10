# WEB招待状 「ふたりの人生をつなぐ。」Favori（ファヴォリ）

## Mission
Create implementation-ready, token-driven UI guidance for WEB招待状 「ふたりの人生をつなぐ。」Favori（ファヴォリ） that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: WEB招待状 「ふたりの人生をつなぐ。」Favori（ファヴォリ）
- URL: https://favori.wedding/products/webinvitation/9cb52403-6af6-49ab-b06b-695a199f5b04#guestAnswer
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Noto Sans JP`, `font.family.stack=Noto Sans JP, serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=18.4px`
- Typography scale: `font.size.xs=0px`, `font.size.sm=13px`, `font.size.md=14px`, `font.size.lg=16px`, `font.size.xl=18px`, `font.size.2xl=30px`, `font.size.3xl=31px`
- Color palette: `color.text.primary=#333333`, `color.text.secondary=#ffffff`, `color.text.tertiary=#261f44`, `color.text.inverse=#9c9c9c`, `color.surface.base=#000000`, `color.surface.raised=#ec775b`, `color.surface.strong=#cccccc`, `color.border.strong=#d9d9d9`
- Spacing scale: `space.1=2px`, `space.2=8px`, `space.3=8.4px`, `space.4=10px`, `space.5=12px`, `space.6=13px`, `space.7=14px`, `space.8=15px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=8px`, `radius.md=40px` | `motion.duration.instant=350ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: inputs (31), links (10), buttons (9), navigation (2), lists (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
