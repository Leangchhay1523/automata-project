# Finite Automata Analyzer

## Table of Contents

- [Finite Automata Analyzer](#finite-automata-analyzer)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
    - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Contributor](#contributor)

## Project Overview

### Project Structure

```plaintext
/dfa-nfa-simulator
├── /public                          # Static assets served directly
│   ├── ...
├── /src                             # Source code for the React app
│   ├── /assets                      # Static assets (images, fonts)
│   │   ├── ...
│   ├── /components                  # Reusable React components
│   │   ├── /FAForm                  # FA input form component
│   │   ├── ...
│   │   ├── /FAHistory               # FA history display component
│   │   ├── ...
│   │   ├── /FATester                # String testing UI component
│   │   ├── ...
│   │   ├── /FAConverter             # NFA-to-DFA conversion UI component
│   │   ├── ...
│   │   ├── /FAMinimizer             # DFA minimization UI component
│   │   ├── ...
│   │   ├── /common                  # Shared UI components
│   │   ├── ...
│   ├── /logic                       # JS FA logic (by Logic Design)
│   │   ├── ...
│   ├── /data                        # Client-side data management
│   │   ├── FaData.json              # Store list of FA
│   │   ├── ...
│   │
│   ├── /styles                      # Global styles (Tailwind CSS)
│   │   ├── ...
│   ├── App.jsx                      # Root component (sets up routing)
│   ├── main.jsx                     # Vite entry point (renders App)
│   ├── index.css
│   ├── app.css
│
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── README.md                        # Project documentation
└── /docs                            # Additional documentation
```

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/Leangchhay1523/automata-project.git
cd fa-analyzer
```

**2. Install the project dependencies**

```bash
npm install
```

**3. Create your own branch to work**

```bash
git checkout -b your-name/task-your-task
```

**4. Work on the task**: Implement neccesary change or feature

**5. Stage and commit your changes:**

```bash
git add . # Add change
git commit -m "Message" # Add commit message
git push origin your-branch-name # Push your code
```

**6. Create Pull Request on GitHub**

- Go to [GitHub](https://github.com/Leangchhay1523/automata-project.git)
- Click on `Compare & Pull Request`
- Fill in the title and description of the PR
- Click on `Create Pull Request`
- Wait for approval, then merge your PR to `main` branch

**Additional Note**:

- **Before starting your task, always pull the latest changes from main to avoid conflicts:**

```bash
git pull origin main
```

- **Best practices:** Always keep your branch up-to-date with the main branch by regularly pulling changes. This helps avoid merge conflicts and ensures you're working with the latest version of the project.

## Contributor

```

```

```

```
