# Kisan AI Sahayak

Kisan AI Sahayak is a React-based single-page application built using Vite. It acts as an interactive and highly responsive AI crop suggestion tool specifically aimed at empowering farmers in Madhya Pradesh. 

By taking inputs such as the farmer's district, soil health (N, P, K, pH), and real-time (mock) weather data, the app offers comprehensive AI crop recommendations containing details like seed type, fertilizer required, irrigation schedules, and even live mandi prices.

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### To Use API
change the name of `.env.example` to `.env` 
Here we use open source API keys

### Installation

1. Open your terminal and ensure you are in the project's root folder:
   ```bash
   cd kisan-ai-sahayak
   ```

2. Install the necessary dependencies (like React, Vite, and TailwindCSS):
   ```bash
   npm install
   ```

### Running the App

1. Start the Vite development server:
   ```bash
   npm run dev
   ```

2. Open your browser:
   After running the command, your terminal will output a local network address (usually `http://localhost:5173/`). Click that link or paste it into your browser to view the application. The page will automatically refresh as you edit and save your `.jsx` or `.css` files!

---

## 📁 Project Structure

This project has been set up with code maintainability and scalability in mind using modular React components.

```text
kisan-ai-sahayak/
├── .gitignore               # Excludes generated files and node_modules from Git
├── package.json             # Manages metadata, scripts, and dependencies (React, Vite)
├── package-lock.json        # Locks dependency tree versions
├── README.md                # Project documentation and instructions
├── eslint.config.js         # Configuration for ESLint (code quality & styling)
├── index.html               # Core HTML file and standard entry point for the app
├── vite.config.js           # Configuration settings for Vite bundler & dev server
│
├── public/                  # Raw static assets that bypass Vite's asset handling
│
└── src/                     # All source code for the React application
    ├── index.css            # Base global CSS, defining font families and Tailwind layer
    ├── App.jsx              # The main React root component; orchestrates routing
    ├── main.jsx             # React DOM entry point that mounts App onto index.html
    │
    ├── assets/              # Handled static assets (e.g., images) directly imported into components
    │
    ├── components/          # Reusable UI components
    │   ├── FloatingVoiceAssistant.jsx # Interactive cartoon farmer voice assistant
    │   └── layout/          # Layout specific component wrappers
    │       ├── Navbar.jsx   # Top navigation bar containing the app title and language selection
    │       └── Footer.jsx   # Bottom footer providing legal info and links
    │
    ├── context/             # React Context Providers for global state
    │   └── AppContext.jsx   # Manages global states like language selection and active district
    │
    ├── lib/                 # Utility functions and shared helpers
    │   └── utils.js         # General JavaScript helpers, like Tailwind classname overriders (cn)
    │
    └── pages/               # Main feature views of the application
        ├── LandingPage.jsx   # Welcomes users with a premium design and calls them to action
        ├── CropSuggestForm.jsx # Form for users to enter agricultural parameters (District, Soil, Weather)
        └── ResultsPage.jsx   # Analyzes the form data and consistently presents crop recommendations
``` 

## 🧠 Core Component Intentions

- **`pages/`**: The core workflow of the app. A user enters on the **Landing Page**, moves to the **Crop Suggest Form** to securely provide their parameters, and finally views the **Results Page** to gain actionable decisions.
- **`components/FloatingVoiceAssistant.jsx`**: Provides an accessible, friendly floating helper character for native language support and guidance.
- **`context/AppContext.jsx`**: Handles shared/global state required anywhere in the application; specifically designed to hold language localization preferences and the district choice seamlessly across routes.
