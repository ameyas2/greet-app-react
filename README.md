# Greet App

A React frontend for managing **greetings** (short messages with a title, description, and author). Users can list, create, view, edit, and delete greets through a simple UI backed by a REST API.

---

## What it does

Greet App is a CRUD client for greeting records. Each greet has:

| Field | Description |
| --- | --- |
| `id` | Unique identifier (assigned by the backend) |
| `title` | Greeting title |
| `description` | Full message text |
| `author` | Who wrote the greet |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last update timestamp |

From the home page you can browse all greets in a table, open details in a modal, jump to the edit form, or delete a greet. A navbar link opens a create form for new greets.

---

## Tech stack

- **React 19** + **TypeScript** — UI and type safety
- **Vite** — development server and production builds
- **React Router** — client-side navigation
- **Axios** — HTTP calls to the greet backend
- **React Hook Form** + **Zod** — form state and validation
- **Tailwind CSS** + **DaisyUI** — styling and UI primitives
- **Lucide React** — icons (info, edit, delete)
- **shadcn / Base UI** — toast notifications and shared UI pieces

---

## Prerequisites

1. **Node.js** (v18+ recommended) and npm
2. A running **greet-service** backend at:

   ```
   http://localhost:10001/greet-service/api/greet
   ```

   The frontend expects this base URL (see `src/service/greetService.tsx`). Start the API before using create/list/edit/delete features.

---

## Getting started

```bash
# From the greet-app directory
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Application structure

```
greet-app/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── main.tsx                 # App bootstrap + BrowserRouter
    ├── App.tsx                  # Navbar + route outlet
    ├── index.css                # Global styles (Tailwind)
    ├── model/
    │   ├── Greet.tsx            # Full greet entity type
    │   └── GreetRequestDTO.tsx  # Create/update payload (title, description, author)
    ├── service/
    │   └── greetService.tsx     # Axios API client (CRUD)
    ├── components/
    │   ├── Navbar.tsx           # Top nav: brand + Add link
    │   ├── Routing.tsx          # Route definitions
    │   ├── Greets.tsx           # Home: table of all greets
    │   ├── GreetInfo.tsx        # Detail modal for a selected greet
    │   ├── CreateGreet.tsx      # Create form
    │   ├── EditGreet.tsx        # Edit form (loads greet by id)
    │   ├── DeleteGreet.tsx      # Delete confirmation modal (available component)
    │   ├── PageNotFound.tsx     # 404 fallback
    │   ├── Utils.tsx            # Date/time formatting helpers
    │   └── ui/                  # Shared UI (button, toast)
    └── lib/
        └── utils.ts             # Class-name helpers
```

---

## Routes

| Path | Component | Description |
| --- | --- | --- |
| `/` | `Greets` | Lists all greets in a table |
| `/create` | `CreateGreet` | Form to create a new greet |
| `/edit/:id` | `EditGreet` | Form to update an existing greet |
| `*` | `PageNotFound` | Shown for unknown URLs |

Navigation is wrapped in `BrowserRouter` in `main.tsx`. `App` always renders the navbar above the active route.

---

## Features in detail

### List greets (`/`)

- On mount, calls `getAllGreets()` and stores the result in component state.
- Renders a DaisyUI table with title (plus a short description preview), author, and formatted created date.
- Row actions:
  - **Info** — fetches the greet by id and opens the `GreetInfo` modal
  - **Edit** — navigates to `/edit/:id`
  - **Delete** — calls `deleteGreet(id)` then reloads the list

Dates are formatted with `formatSlashDateTime` as `DD/MM/YYYY, HH:mm` (en-GB, 24-hour).

### Create greet (`/create`)

- Form fields: title, description, author
- Validated with Zod via `zodResolver`:
  - Title: 10–200 characters
  - Description: 10–500 characters
  - Author: 10–50 characters
- On success, POSTs via `createGreet`, shows a success toast, then navigates home

### Edit greet (`/edit/:id`)

- Reads `id` from the URL, loads the greet with `getGreetById`, and prefills the form with `reset`
- Same Zod rules as create
- On submit, merges form data with the existing greet (keeps `id` and timestamps) and PUTs via `updateGreet`, then returns home

### View greet details

- `GreetInfo` is a DaisyUI popover/modal showing full title, author, description, and created date for the greet selected from the list

---

## API client

All HTTP access goes through `src/service/greetService.tsx`:

| Function | Method | Endpoint |
| --- | --- | --- |
| `getAllGreets()` | `GET` | `/` |
| `getGreetById(id)` | `GET` | `/{id}` |
| `createGreet(dto)` | `POST` | `/` |
| `updateGreet(greet)` | `PUT` | `/` |
| `deleteGreet(id)` | `DELETE` | `/{id}` |

Base URL:

```
http://localhost:10001/greet-service/api/greet
```

Request/response bodies use JSON. Create/update request bodies follow `GreetRequestDTO` (title, description, author). Full entities returned by the API match the `Greet` interface.

To point at another backend, change `baseURL` in `greetService.tsx` (or introduce an environment variable and read it there).

---

## Data models

**`Greet`** — entity returned by the API:

```ts
{
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
```

**`GreetRequestDTO`** — payload for create (and the editable fields on update):

```ts
{
  title: string;
  description: string;
  author: string;
}
```

---

## UI notes

- Navbar brand links to `/`; **Add** links to `/create`
- Forms use DaisyUI `input` classes and a blue submit button
- List actions use Lucide icons with hover scale/color feedback
- Toasts (shadcn / Base UI) confirm successful create

---

## Development tips

1. Keep the greet-service API running on port `10001` while developing.
2. If the list stays empty or the console shows network errors, check CORS and that the backend path matches the Axios `baseURL`.
3. Form validation messages appear under each field when submit fails Zod checks.
4. After create or edit, the app navigates back to `/` so the list can refresh on the next visit/load.

---

## License

Private project (`"private": true` in `package.json`). Not published as an npm package.
