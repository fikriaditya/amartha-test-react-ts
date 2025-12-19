# Employee Management System - Assesment Test


## 📌 Project Context
This project was developed as part of the **Amartha Assessment Test**. It demonstrates the implementation of a distributed data system using React and TypeScript, focusing on data integrity, asynchronous state management, and clean architectural patterns.

## 🔗 Live Demo
**Access the application here:** [https://fikriaditya-amartha-test.netlify.app/](https://fikriaditya-amartha-test.netlify.app/)

**GitHub Repository:** [https://github.com/fikriaditya/amartha-test-react-ts.git](https://github.com/fikriaditya/amartha-test-react-ts.git)

## 🚀 Features

### 1. Registration Wizard
- **Step-by-Step Flow:** Clean separation between Basic Information and Employment Details.
- **Smart Autosave:** Custom `useAutosave` hook that persists data to `localStorage` during user idle time (2-second debounce).
- **Draft Management:** Ability to clear current progress and reset the form state globally.

### 2. Submission Engine
- **Sequential API Orchestration:** Simulates complex backend workflows by processing data across two different API with delay.
- **Real-time Feedback:** A `SubmissionProgress` component provides visual logs and a progress bar to keep users informed during the async process.

### 3. Employee Listing Page
- **Distributed Data Merging:** Performs a client-side "join" of data from Port 4001 and Port 4002 based on `employee_id`.
- **Flat Data Structure:** Merges nested API responses into a single-level object for easier manipulation.
- **Pagination:** Dynamic row-per-page selector and direct page-jump input.

## 🛠️ Technical Stack

- **Framework:** React 19+ (TypeScript) 
- **State Management:** React Hooks (useState, useEffect, useMemo)
- **Build Tools:** Vite v7
- **Styling:** Vanilla CSS with **BEM (Block Element Modifier)** naming convention.
- **Data Source:** JSON-Server (Running on Ports 4001 & 4002).
- **Running Node version:** 22.16.0

## 📋 Project Setup & Running Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone [https://github.com/fikriaditya/amartha-test-react-ts.git](https://github.com/fikriaditya/amartha-test-react-ts.git)
cd amartha-test-react-ts
npm install 
```

### 3. Running The mock API server
This project simulates a microservices environment using two 'json-server' instances (port 4001 & port 4002).
```bash
npm run server 
```

### 3. Running The Dev App
In a terminal window, launch the Vite development server:instances (default port 5173).
```bash
npm run dev 
```

## 📋 Testing The Application
- **Wizard Persistence:** Fill "Step 1", wait 2 seconds, refresh, and verify the data remains.

- **Submission Logic:** Click "Submit" and watch the progress bar. Ensure logs update at the 3s and 6s marks.

- **Data Merge:** Check the "Employee List" to see the combined record from both JSON servers.

Run Unit testing
```bash
npm run test 
```

## 📂 Project Structure

```text
.
├── public/                 # Static assets served at root
├── src/
│   ├── assets/             # Assets processed by build tools (images, logos)
│   ├── components/
│   │   ├── features/       # Feature-scoped components (Wizard, List)
│   │   │   ├── EmployeeList/
│   │   │   └── Wizard/
│   │   └── listing/        # Listing components
│   │   └── wizard/         # Wizard Components
│   │   └── ui/             # Shared atomic UI components
│   ├── core/
│   │   └── constant/       # base constants
│   │   └── types/          # TypeScript interfaces
│   │   └── utils/          # Custom reusable Utility classes
│   ├── services/           # API abstraction layer
│   ├── hooks/              # Custom reusable logic (Autosave, Debounce)
│   ├── pages/              # Top-level route views
│   ├── styles/             # Global variables and CSS resets
│   ├── router.tsx          # Routing configuration
│   └── main.tsx            # Entry point
├── db-1.json                # Mock Database for Port 4001
├── db-2.json                # Mock Database for Port 4002
└── README.md
```