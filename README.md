# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


---

## Estructura completa

frontend/src/app/
├── auth/
│   ├── login/          (componente de login)
│   └── register/       (componente de registro)
├── notes/
│   └── notes/          (dashboard de notas: lista + crear)
├── guards/
│   └── auth.guard.ts   (protege rutas que requieren token)
├── interceptors/
│   └── auth.interceptor.ts  (agrega Bearer token a cada request)
├── models/
│   ├── auth.model.ts   (interfaces de auth)
│   └── note.model.ts   (interface de nota)
├── services/
│   ├── auth.service.ts (login, register, logout, token management)
│   └── notes.service.ts (getNotes, createNote)
├── app.routes.ts       (rutas con lazy loading + auth guard)
└── app.config.ts       (HttpClient + interceptor configurados)


Flujo:

1. /login — Formulario de usuario/contraseña → POST /auth/login → guarda JWT en localStorage → redirige a /notes
2. /register — Crear cuenta → POST /auth/register → redirige al login