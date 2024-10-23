## Josh's onboarding react task

Originally a NextJS app, now it uses `react-scripts` to handle compiling and serving.

## Dependencies

You will need to have this repo and checked out locally and running over docker:

https://github.com/travelperk/django-onboarding/compare/task/josh_tait_react_app

Important: you need to have the `task/josh_tait_react_app` branch running in the repo.

You will also need to rebuild the containers `docker-compose build --no-cache` to ensure
the dependencies are pulled in.

## Running

Create a .env file:

```bash
cp .env.example .env
```

Install the dependencies locally:

```bash
cd app && npm i
```

I wasn't able to install the node dependencies inside the Dockerfile (401 error) so for this task, they are symlinked
via
docker-compose volume.

Then run the following command:

```bash
docker-compose -f docker-compose.yml up -d
```

App should be running on https://localhost:3000.

### File and Folder Structure

All logic is contained under `app/src`.

- `components/`: Contains all the React components. Styled via suitcase and `styled-components`.
- `http/`: Contains the API calls to the backend. Axios wrappers with callbacks
- `lang/`: Localisation files, standard stuff
- `pages/`: Specific 'routes' for the app. Each file is a route.
- `pages/App.tsx`: The core app file that contains the routing logic.
- `formatters.ts`: Formats some state objects to component props and vice versa.
- `index.tsx`: React bootstrapping, renders the `App` into the DOM.
- `interfaces.ts`: Typescript interfaces used across the app
- `schemas.js`: `Yup.js` objects used to define the `interfaces` and handle form validation.
