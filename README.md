# Habbit

A simple desktop app for tracking habits and daily progress.

![Habbit screenshot](src/assets/screenshots/1.png)

## About

Habbit is an old pet project that is being gradually modernized from plain HTML/CSS/JavaScript into a React-based Electron app.

Current stack:

* Electron
* React
* TypeScript
* Vite
* CSS

## Features

* Create habits
* Choose habit icons
* Set progress targets
* Add daily notes
* Track habit progress
* Delete habits and entries
* Save data locally between app restarts

![Habbit showcase](src/assets/screenshots/2.png)

## Development

Install dependencies:

```bash
pnpm install
```

Run the app:

```bash
pnpm start
```

Build the renderer:

```bash
pnpm run build:renderer
```

Package the app:

```bash
pnpm run package
```
