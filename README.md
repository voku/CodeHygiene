# Code Hygiene

An interactive web application that teaches the importance of code hygiene through a merge conflict resolution game. Learn why testing and code quality are not optional.

**Live Demo:** [https://voku.github.io/CodeHygiene/](https://voku.github.io/CodeHygiene/)

## About

Code Hygiene is an educational tool that demonstrates the critical importance of proper testing, error handling, and code quality practices. Through an interactive merge conflict resolution experience, you'll learn to distinguish between fragile patches and hygienic fixes.

Read the full article: [Code Hygiene is NOT Optional](https://dev.to/suckup_de/code-hygiene-is-not-optional-5698)

## Features

- 🎮 Interactive merge conflict resolution game
- 📚 Real-world coding scenarios and best practices
- 🏆 Score tracking and feedback system
- 🎨 Clean, modern UI with syntax highlighting
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/voku/CodeHygiene.git
   cd CodeHygiene
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. Review each merge conflict scenario presented
2. Choose between the "Fragile Patch" (left) or "Hygienic Fix" (right)
3. Make decisions based on code quality, testing, and maintainability
4. See your final score and learn from the feedback

## Key Files Detector - AI Helper Prompt

When working with this codebase, use this prompt to help AI assistants understand the project structure:

```
This is a React + TypeScript + Vite application teaching code hygiene through interactive merge conflicts.

Key files:
- App.tsx: Main application component with merge state management
- data.ts: Contains all merge conflict scenarios and educational content
- components/MergeSection.tsx: Individual merge conflict display component
- components/ConclusionModal.tsx: Final results and feedback modal
- index.html: Main HTML file with Tailwind CSS and Prism.js integration
- vite.config.ts: Vite build configuration

The app presents merge conflicts where users choose between fragile and hygienic code solutions, tracking their decisions and providing educational feedback.
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**Lars Moelleken** ([@voku](https://github.com/voku))

## Acknowledgments

- Built with React, TypeScript, and Vite
- Styled with Tailwind CSS
- Code highlighting powered by Prism.js
- Icons from Lucide React
