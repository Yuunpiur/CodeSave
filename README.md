# CodeSave

A full-stack web application for saving, managing, and sharing code snippets with version control and collaboration features.

## 📋 Overview

CodeSave is a modern code editor platform that allows developers to:

- Write and edit code with syntax highlighting across multiple programming languages
- Save code snippets with version history tracking
- Generate shareable links for easy collaboration
- Access version history with the ability to restore previous versions
- Manage multiple code projects with unique identifiers

## 🏗️ Architecture

### Frontend

- **Framework**: React 19 with Vite (build tool)
- **Editor**: Monaco Editor for code editing with syntax highlighting
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM v7
- **State Management**: React Hooks with TanStack React Query
- **Utilities**: Debouncing for performance optimization

### Backend

- **Runtime**: Node.js with ES modules
- **Server**: Express.js
- **Database**: PostgreSQL with pg driver
- **Security**: CORS for cross-origin requests
- **Configuration**: Environment variables via dotenv

## 📦 Project Structure

```
CodeSave/
├── backend/              # Express API server
│   ├── server.js        # Main server entry point
│   ├── save-code-db.js  # Code saving routes
│   ├── save-version-db.js  # Version control routes
│   ├── package.json
│   └── utils/           # Backend utilities
├── frontend/            # React web application
│   ├── src/
│   │   ├── main.jsx     # Application entry point
│   │   ├── code-page.jsx  # Main code editor component
│   │   ├── drop-down-menu.jsx  # Menu component
│   │   ├── settings.jsx  # Settings page
│   │   ├── not-found.jsx  # 404 page
│   │   ├── main.css     # Global styles
│   │   ├── utils/
│   │   │   ├── code-saving.js  # Code API interactions
│   │   │   ├── version-saving.js  # Version API interactions
│   │   │   └── client-utils.js  # Helper functions
│   │   └── assets/      # Images and icons
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
└── psue.md              # Project notes and questions

```

## 🔑 Key Features

### Code Editor

- **Monaco Editor Integration**: Professional code editing experience
- **Multi-language Support**: Syntax highlighting for multiple programming languages
- **Real-time Saving**: Debounced auto-save functionality
- **Copy Link**: Share code snippets with unique shareable links

### Version Control

- **Version History**: Track all saved versions of your code
- **Version Management**: View, restore, and delete versions
- **Snapshot Preservation**: Each version captures a complete snapshot of code

### Collaboration

- **Shareable Links**: Generate unique URLs to share code snippets
- **Read-only Mode**: View-only access for shared code
- **Link-based Access**: Access code by ID from URL parameters

## 📝 Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `npm start` - Start server with file watching

## 🛠️ Technologies Used

### Frontend

- React 19.2.0
- Vite 8.0.0-beta.13
- Tailwind CSS 4.2.0
- Monaco Editor 4.7.0
- React Router DOM 7.13.0
- TanStack React Query 5.95.2
- React Icons 5.5.0
- use-debounce 10.1.0

### Backend

- Express.js 5.2.1
- PostgreSQL (pg 8.20.0)
- CORS 2.8.6
- dotenv 17.3.1
- nanoid 5.1.6

## 📂 API Endpoints

### Code Management

- `GET/PUT/DELETE /api/code` - Code CRUD operations

### Version Management

- `GET/PUT/DELETE /api/version` - Version history operations

## 🔍 Routing

- `/` - Main code editor page
- `/:id` - Access code by unique ID
- `/settings` - Application settings (in development)
- `/not-found` - 404 page




