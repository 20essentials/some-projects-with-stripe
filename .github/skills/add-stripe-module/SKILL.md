---
name: add-stripe-module
description: Create and register a Stripe API resource module from a docs.stripe.com API URL in this repository.
---

# Add a Stripe module

Use this skill when asked to add a Stripe resource module and the user provides
a Stripe API documentation URL. The URL must be under
`https://docs.stripe.com/api/`. If it is missing or invalid, stop and ask for a
valid URL; do not guess the resource.

## Rules

- Never invent endpoints, parameters, SDK namespaces, response examples, or
  TypeScript types. Verify details in the Stripe docs, the installed
  `node_modules/stripe/types/`, or Stripe's official OpenAPI spec.
- Follow the current conventions in `src/app/`, using
  `src/app/49/shared-payment-issued-token.ts` and
  `src/app/50/shared-payment-granted-token.ts` as the primary style references.
- Do not create a page or route component. These modules are reference wrappers
  linked to GitHub.
- Do not create the `.avif` image; only register its expected path.
- If a module already exists with the same slug or `realHref`, update it and its
  existing project entry rather than adding a duplicate.
- Inspect the current `src/global-data.ts` before editing. Preserve its actual
  type, array declaration, field order, formatting, and trailing-comma
  conventions; do not assume it is declared `as const`.

## Workflow

1. **Verify the docs.** Fetch the supplied URL. Normalize its API path by
   removing locale, query string, fragment, and trailing slash. Identify the
   official resource name, documented operations, parameters, and a real
   example response for each operation. If the docs page is incomplete or
   JavaScript-rendered, use the official OpenAPI spec at
   `https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json`
   and confirm the SDK namespace and types in `node_modules/stripe/types/`.

2. **Derive the module name.** Join all path segments after `/api/` with `-` to
   make the slug. For example, `/api/shared-payment/granted-token` becomes
   `shared-payment-granted-token`. Use the resource's actual docs title for
   `nameProject`, in title case, excluding generic suffixes such as “API
   Reference”. Name exported functions in camelCase as verb plus resource,
   such as `retrieveSharedPaymentGrantedToken`.

3. **Choose numbers from the repository.**
   - Find the highest numeric folder directly inside `src/app/`; use the next
     number for the new folder.
   - Read the last project entry in `src/global-data.ts` and increment its
     numeric `id` for the new entry. Preserve the existing ID formatting,
     including leading zeroes if used. Do not derive the ID from the folder
     number; routes can be reused.
   - Set `href` to `/<folder-number>`, `srcImage` to
     `/assets/projects/<new-id>.avif`, and `realHref` to
     `https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/<folder-number>/<slug>.ts`.

4. **Create the module** at
   `src/app/<folder-number>/<slug>.ts`. Follow the latest module style:

   ```ts
   import 'server-only'

   import Stripe from 'stripe'

   const secret = process.env.STRIPE_API_SECRET

   if (!secret) throw new Error('Missing Stripe secret key')

   const stripe = new Stripe(secret)
   ```

   Export one async function per documented operation, in docs order. Use the
   verified SDK method and derive types from it, for example:

   ```ts
   params: Parameters<typeof stripe.<namespace>.<method>>[0]
   ```

   For each function, include a `try/catch`, log with
   `console.error('Stripe error', error)`, rethrow a descriptive error, and
   include a comment containing a real example response from the docs. Adapt
   arguments to the operation: use the documented ID/path parameters for
   retrieve, delete, or revoke; use the documented query parameters for list
   and search. Do not leave placeholder response values when the docs provide
   real examples.

   If the endpoint has no SDK method, follow
   `src/app/48/product-catalog-imports-v2.ts`: make a REST request with
   `Authorization: Bearer ${secret}`, the documented `Stripe-Version`, and
   locally defined types verified against the docs. Do not fake an SDK method.

   Match the surrounding module style (currently no semicolons, single quotes,
   and two-space indentation where applicable).

5. **Register the project** by appending its item to `arrayOfProjects` in
   `src/global-data.ts`, preserving the file's existing shape and field order:

   ```ts
   {
     href: '/<folder-number>',
     nameProject: '<Resource Name>',
     realHref:
       'https://github.com/20essentials/some-projects-with-stripe/blob/main/src/app/<folder-number>/<slug>.ts',
     srcImage:
       '/assets/projects/<new-id>.avif',
     id: '<new-id>'
   },
   ```

6. **Verify the change.** Run:

   ```bash
   pnpm exec eslint src/app/<folder-number>/<slug>.ts src/global-data.ts
   pnpm exec tsc --noEmit
   ```

   Fix errors caused by the new module or entry. Do not fix unrelated existing
   errors; report them clearly. Confirm the module path, project entry, and
   numbering. In the final response, summarize the new file, operations,
   `href`/`id`/`srcImage`, lint and type-check results, and remind the user that
   the `.avif` image still needs to be added manually.
