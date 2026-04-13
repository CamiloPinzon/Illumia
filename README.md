# Illumia Group — AI Intelligence Platform

Welcome to the **Illumia Group** frontend repository! This is a cutting-edge, high-performance vanilla web application designed to showcase Illumia's capabilities in Gen AI, Customer Experience (CX), and automation.

The site is built with a strong focus on **premium aesthetics** integrating liquid glassmorphism, animated neural webs, a responsive terminal UI, and Web Speech API integrations to create a deeply technical look and feel.

---

## 🚀 Features

- **"Talk to Illumia AI" Interface:** Integrates with the modern browser Web Speech API. Clicking the microphone triggers an animated sonar pulse on the AI sphere while the synthesized voice reads generated phrases and transcriptions print live on-screen.
- **Dynamic Backgrounds & "Liquid Glass":** Utilizes advanced CSS filters (`backdrop-filter`) and blending modes built into modern `rgba` to create stunning, performant glass panels over animated background orbs.
- **Intersection Observers:** Videos and heavy carousels are paused when out of the screen, drastically reducing browser DOM operations and battery footprint. Everything only runs when you are actually looking at it.
- **Custom Smooth Scroll:** Features a buttery-smooth custom `easeOutQuart` mathematical scrolling formula mapped to anchor links across the app.
- **Responsive Design:** A custom, fully robust CSS Flexbox/Grid foundation that automatically optimizes the layout for Mobile, Tablet, and Desktop breakpoints.

---

## 📂 Project Structure

This project has been cleanly refactored into a highly modular, component-based structure—eliminating generic monolithic files and inline properties. 

```text
illumina/
│
├── index.html            # Main markup and layout
├── favicon.ico           # Site branding icon
│
├── styles/               # Modular CSS Components
│   ├── about.css         
│   ├── background.css    # Animated orbs and grid
│   ├── base.css          # CSS Variables and Reset
│   ├── capabilities.css  # Feature grid and Terminal UI
│   ├── clients.css       # Infinite scrolling logo carousel
│   ├── contact.css       
│   ├── footer.css        
│   ├── hero.css          # "Liquid Glass" panel and AI Sphere
│   ├── nav.css           # Fixed blurring navbar
│   ├── responsive.css    # Centralized Media Queries
│   ├── sections.css      # Core section paddings and headings
│   ├── services.css      
│   └── stats.css         
│
├── js/                   # ES6 JavaScript Modules
│   ├── main.js           # Entry point and event bindings
│   ├── observers.js      # Intersection Observers (lazy load logic)
│   ├── scroll.js         # Custom 500ms smooth scrolling logic
│   └── speech.js         # Web Speech API and transcription loop
│
└── assets/               # Fonts, Images, and Video resources
```

---

## 💻 How to Run Locally

Because the JavaScript uses modern **ES6 Modules** (`<script type="module">`), modern browsers enforce strict Cross-Origin Resource Sharing (CORS) security policies. **You cannot run this project by simply double-clicking the `index.html` file.**

To view the project, you must run it through a local HTTP Server. 

### Method 1: Visual Studio Code (Recommended)
1. Install the **Live Server** extension in VS Code.
2. Open `index.html`.
3. Right-click and press **"Open with Live Server"**.

### Method 2: Node.js (npx)
Open your terminal in the root directory and run:
```bash
npx http-server . -p 8080 -c-1
```
Open `http://localhost:8080` in your web browser.

### Method 3: Python
Open your terminal in the root directory and run:
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 🛠️ Architecture Decisions

* **No UI Frameworks:** The app uses zero heavy UI external frameworks (No React, Vue, Tailwind, or jQuery) to maintain absolute peak load speeds.
* **Semantic Modularity:** Despite being vanilla HTML/JS/CSS, logic is strictly mapped to separate CSS stylesheets and JS Modules to simulate component-based logic cleanly.
* **Component Encapsulation:** CSS is carefully written into blocks to prevent global bleeding style collisions.

_System Active. Let's Transform._
