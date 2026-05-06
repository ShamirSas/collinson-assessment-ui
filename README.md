# collinson-assessment-ui

Front-end for the Collinson assessment: a React + TypeScript single-page app built with Vite. Users search for cities or towns via GraphQL (`getLocations`), browse results, and select a location to load activity rankings (`getRanking`). The UI uses Bootstrap 5 for layout, SCSS for styling, and Apollo Client to talk to the assessment GraphQL API.

## Checkout and run

1. Clone the repository and enter the UI project directory:

```bash
git clone https://github.com/ShamirSas/collinson-assessment-ui
cd collinson-assessment-ui
```

2. Install dependencies:

```bash
npm install
```

3. Configure the GraphQL endpoint (optional). Copy the example env file and adjust if your API is not on the default URL:

```bash
cp .env.example .env
```

By default the app uses `http://localhost:4000/graphql` when `VITE_GRAPHQL_ENDPOINT` is unset. Ensure the assessment GraphQL API (`ShamirSas-collinson-assessment-api`) is running (see that project’s README) so queries succeed.

4. Start the development server:

```bash
npm run dev
```

Open the URL Vite prints in the terminal (typically `http://localhost:5173`).

5. Production build (optional):

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` locally so you can verify the production bundle.

## package.json scripts

| Script | Command | What it does |
|--------|---------|----------------|
| `dev` | `vite` | Starts the Vite dev server with hot module replacement (HMR) for fast local development. |
| `build` | `tsc -b && vite build` | Runs the TypeScript project build, then produces an optimized static bundle in `dist/`. |
| `lint` | `eslint .` | Runs ESLint across the project using the repo’s ESLint configuration. |
| `preview` | `vite preview` | Serves the production build from `dist/` (run `npm run build` first). |

## Tech stack (summary)

- **React 18** and **TypeScript**
- **Vite** for bundling and dev server
- **Apollo Client** + **GraphQL** for API calls
- **Bootstrap 5** and **Sass** for UI and styles
