# Pascal Heus | Personal Website

This is the repository for the personal professional website of **Pascal Heus**, a strategic consultant specializing in Data, Metadata (DDI/FAIR), and Agentic AI.

The site is designed as a high-performance, visually stunning one-page application with a premium focus on interactivity and modern aesthetics.

## 🛠 Tech Stack

- **SSG**: [11ty (Eleventy)](https://www.11ty.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Interactivity**: [Alpine.js](https://alpinejs.dev/)
- **Visuals**: [Three.js](https://threejs.org/) for interactive 3D backgrounds
- **Fonts**: Inter & Outfit (via Google Fonts)

## 🚀 Local Development

Follow these steps to preview the website on your local machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### 1. Installation

Clone the repository and install the dependencies:

```bash
pnpm install
```

### 2. Start the Development Server

Run the following command to start the 11ty development server and the Tailwind CSS compiler in watch mode:

```bash
pnpm start
```

### 3. Preview

Once started, the site will be available at:
👉 **[http://localhost:8080](http://localhost:8080)**

The browser will automatically refresh whenever you make changes to files in the `src/` directory.

## 🏗 Project Structure

- `src/`: Source files
  - `_data/`: Global data files
  - `_includes/`: Layouts and components
  - `assets/`: Static assets (CSS, JS, Images)
- `_site/`: The generated static website (output directory)
- `tailwind.config.js`: Tailwind configuration (though v4 is largely CSS-driven)
- `.eleventy.js`: Eleventy configuration
- `AGENTS.md`: Detailed instructions and context for AI coding agents

## 📦 Building for Production

To generate a optimized, production-ready build in the `_site/` folder:

```bash
pnpm run build
```

---
© 2026 Pascal Heus.
