# Issue Management System

This project is a simple issue management system built with Vue 3, TypeScript, and Tailwind CSS. It provides a user interface for creating, reading, updating, and deleting issues through a REST API.

## Features

- List all issues
- Create new issues
- Edit existing issues
- Delete issues
- Responsive design with Tailwind CSS

## Tech Stack

- Vue 3
- TypeScript
- Tailwind CSS
- Axios for API calls

## Project Structure

- `src/components/IssueManager.vue`: Main component for managing issues
- `src/services/IssueService.ts`: Service for handling API calls
- `src/assets/tailwind.css`: Tailwind CSS import file

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running the Project

To run the project in development mode:

```
npm run dev
```

## API Configuration

The API base URL is currently set to `http://localhost:3000` in `IssueService.ts`. Update accordingly if you made changes on backend side.

## Future Improvements

- Add error handling and user notifications
- Implement pagination for the issue list
- Add sorting and filtering options
- Integrate with a state management solution like Pinia for larger applications
