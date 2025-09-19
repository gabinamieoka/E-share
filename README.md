

Shipyard 3D Model Viewer
An interactive 3D model viewer for shipyard engineering projects, built with Vue 3, TypeScript, and the Google <model-viewer> component.

This project was developed as a final assignment for the [Your Institute's Name Here] institute. It serves as a proof-of-concept for a modern, web-based tool to visualize and inspect complex 3D engineering models, providing a foundational step towards digital twin applications in the naval industry.


✨ Key Features
Dynamic Model Catalogue: Loads and displays a list of available 3D models from a JSON data source.

Interactive 3D Viewer: Provides smooth, intuitive controls for model inspection, including orbit, pan, and zoom.

Hierarchical Tree View: Renders the model's complete component structure in a nested, collapsible tree, mirroring the source file's scene graph.

Component Isolation & Visibility Toggle: Allows users to show or hide individual components and entire sub-assemblies directly from the tree view, making it easy to inspect complex interiors.

TypeScript Integration: The entire codebase is strictly typed, ensuring code quality, reliability, and an improved developer experience.

Reactive Logic with Composables: Encapsulates reusable logic, such as the poster generation for 3D models, into clean and maintainable Vue Composables.

🛠️ Technology Stack
Frontend Framework: Vue 3 (using Composition API with <script setup>)

Language: TypeScript

Build Tool: Vite

3D Rendering: Google <model-viewer> Web Component

Core 3D Library: Three.js (as a dependency of <model-viewer>)

UI Framework (Optional): Vuetify for UI components like cards and dialogs.

Code Linting: ESLint

Code Formatting: Prettier

📂 Project Structure
The project follows a feature-oriented and scalable folder structure to ensure a clear separation of concerns.

/
├── public/
│   └── assets/
│       ├── models/         # 3D model files (.glb, .gltf)
│       └── tools.json      # JSON data for the model catalogue
├── src/
│   ├── components/         # Reusable UI components (e.g., ToolCard, TreeNode)
│   ├── composables/        # Vue Composables (e.g., usePosterGenerator.ts)
│   ├── models/              # TypeScript type definitions and interfaces
│   ├── views/              # Main page components (e.g., Catalogue.vue)
│   └── App.vue             # Main application entry point
└── README.md               # You are here!
🚀 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (version 18.x or higher is recommended)

npm or another package manager like Yarn or pnpm

Installation & Execution
Clone the repository:

Bash

git clone [URL_OF_YOUR_REPOSITORY]
Navigate to the project directory:

Bash

cd [PROJECT_FOLDER_NAME]
Install all the necessary dependencies:

Bash

npm install
Run the development server:
This will start a local server, typically on http://localhost:5173.

Bash

npm run dev
Build for production:
This command will compile and bundle the application for deployment. The output will be in the dist/ folder.

Bash

npm run build
📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.

You should create a file named LICENSE in your project root and paste the MIT License text into it.

👤 Contact