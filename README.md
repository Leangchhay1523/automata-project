# Finite Automata Web App

- [Finite Automata Web App](#finite-automata-web-app)
  - [Project Overview](#project-overview)
    - [Features](#features)
    - [System Architecture](#system-architecture)
    - [Tech Stack](#tech-stack)
      - [Frontend](#frontend)
      - [Backend](#backend)
    - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Installation and Setup](#installation-and-setup)
  - [Demo](#demo)
  - [Contributors](#contributors)

## Project Overview

The project aims to develop a web-based application that allows users to interactively construct, test, and perform operations on finite automata. The application provides a wide range of functionalities, including constructing finite automata (both deterministic and non-deterministic), defining the type of finite automata, testing string acceptance, converting NFAs to equivalent DFAs, and minimizing DFAs.

### Features

| Feature                       | Description                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Construct Finite Automata** | Create DFAs and NFAs by defining states, alphabet, transitions, start, and accept states.                      |
| **Type Detection**            | Automatically identifies whether a constructed FA is a DFA or NFA and stores it for future use.                |
| **String Acceptance Testing** | Tests whether a given string is accepted by a selected FA.                                                     |
| **NFA to DFA Conversion**     | Converts a non-deterministic FA to its equivalent deterministic FA, showing both transition tables.            |
| **DFA Minimization**          | Minimizes a DFA by reducing it to the smallest equivalent automaton, with original and minimized tables shown. |

### System Architecture

```mermaid
flowchart LR
    Frontend[Frontend UI]
    API[Backend API Routes]
    Controller[Controller Logic]
    Storage[JSON Storage]

    Frontend -->|Send FA as JSON| API
    API -->|Call logic functions| Controller
    Controller -->|Optionally store FA| Storage
    Controller -->|Return processed result| API
    API -->|Response JSON| Frontend
```

### Tech Stack

#### Frontend

| Technology   | Figure                                                                                                                       | Detail                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| React.js     | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)                | A JavaScript library for building interfaces for web applications |
| Axios        | ![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)                       | Handles HTTP request to communicate with backend API.             |
| HTML         | ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)                    | Structures the web page                                           |
| CSS          | ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)                       | For styling the HTML structured.                                  |
| Tailwind CSS | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | Makes styling fast with classes and responsive design.            |

#### Backend

| Technology | Figure                                                                                                                    | Detail                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Node.js    | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)                   | Runs the server-side JavaScript environment.                |
| Express.js | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) | A framework for Node.js, used to create RESTful API routes. |

### Project Structure

```plaintext
fa-analyzer/
├── backend/                  # Express.js server
│   ├── routes                # Route handler
│   ├── middleware            # Logging middleware
│   ├── controller            # Route logic handler
│   ├── data                  # Store all finite automata
│   ├── logic                 # Finite automata operations logic
│   ├── models
│   ├── utils                 # Utility functions
│   └── server.js             # Server entry point
├── docs                      # Documentation files
├── frontend/                 # React.js application
│   ├── public                # Store public assets
│   ├── src/
│   │   ├── api
│   │   ├── assets/
│   │   │   └── font          # Store fonts
│   │   ├── components/       # Reusable components
│   │   │   ├── common
│   │   │   ├── FaForm
│   │   │   ├── FaHistory
│   │   │   └── FaOperations
│   │   ├── context
│   │   ├── logic
│   │   ├── style
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json          # Dependencies
└── README.md
```

## Getting Started

### Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/Leangchhay1523/automata-project
```

2. Install and run backend server

```bash
cd backend
npm install
npm run dev

```

3. Install and run frontend

```bash
cd frontend
npm install
npm run dev
```

## Demo

- Finite Automata web app
  ![App](docs/demo/fa-app.png)
- Finite Automata creation form
  ![Creation Form](docs/demo/fa-creation.png)

## Contributors

- Ty Punleu - https://github.com/PunleuTY
- Srey Sitharath - https://github.com/Sitharath-s
- Song Kimleangchhay - https://github.com/Leangchhay1523
- Khy Pichsereyvathanak - https://github.com/PichSereyVathanak
