# Todoist Clone

A modern, feature-rich Todoist clone built with React and TypeScript.

<!-- You can add a screenshot of the application here -->
<!-- ![App Screenshot](link-to-your-screenshot.png) -->

## Features

This application provides a comprehensive set of features for managing your tasks:

- **Full Task Management:** Create, edit (in a clean modal), and delete tasks with ease.
- **Rich Task Details:** Enhance your tasks with due dates and priority levels (High, Medium, Low).
- **Nested Subtasks:** Break down complex tasks into smaller, manageable subtasks, each with its own due date.
- **Interactive UI:**
  - **Drag & Drop:** Easily reorder your main tasks with a smooth drag-and-drop interface.
  - **Expand & Collapse:** Keep your view clean by collapsing subtask lists.
  - **"More Options" Menu:** A modern "..." menu on each task reduces clutter.
  - **Collapsible Forms:** The "Add Task" form is neatly tucked away until you need it.
- **Calendar View:** A compact calendar on the side provides a visual overview of your tasks and their due dates.
- **Theming:** Switch between a light and a dark theme to suit your preference.
- **Persistent Storage:** Your tasks are automatically saved to your browser's local storage, so they're there when you come back.

## Tech Stack

- **React:** For building the user interface.
- **TypeScript:** For type safety and an improved developer experience.
- **Bootstrap & `react-bootstrap`:** For styling and robust UI components like modals and dropdowns.
- **`@hello-pangea/dnd`:** For the smooth drag-and-drop functionality.
- **`react-calendar`:** For the interactive calendar view.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have `npm` installed.
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits, and you will see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
