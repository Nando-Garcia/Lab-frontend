# Notes Frontend

Angular application for the notes platform. It provides authentication, protected routes, note listing, note creation, and file upload interactions with the NestJS backend.

## Overview

This client consumes the backend API and gives the user a simple, clear experience for managing notes. The UI was built to show real application flow, not just a static mockup: login, registration, note creation, attachment handling, and deletion lifecycle.

## Tech Stack

- Angular
- TypeScript
- RxJS
- Angular Router
- HttpClient
- Standalone components
- SCSS / CSS
- Local storage for JWT persistence
- Protected route guards
- Auth interceptors

## Features

- Login and registration screens
- Protected routing for authenticated users
- Note listing from backend API
- Create notes with optional metadata
- File upload support through backend API
- Delete note flow with instant UI refresh
- Token handling via interceptor
- Responsive and clean UI for portfolio presentation

## Application Structure

```text
src/
├── app/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   ├── app.html
│   ├── app.scss
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── models/
│   │   ├── auth.model.ts
│   │   └── note.model.ts
│   ├── notes/
│   │   └── notes/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── notes.service.ts
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts
└── styles.scss
```

## Local Development

```bash
npm install
ng serve
```

Then open:

```text
http://localhost:4200
```

## Production Build

```bash
ng build
```

## Flow

1. User registers or logs in.
2. Backend returns a JWT token.
3. The frontend stores the token and injects it into requests.
4. Notes are loaded from the protected API.
5. Users can create notes or upload files associated with them.
6. Deletion triggers a backend request and the UI updates immediately.

## License

MIT
