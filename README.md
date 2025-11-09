# 🏥 Medical Quiz App

A modern, interactive quiz application for medical exam preparation with 773+ questions in Kazakh language.

## Features

- ✨ **Random Question Selection** - Questions are shuffled for each quiz session
- 📊 **Progress Tracking** - Real-time score and progress display
- 🎯 **Instant Feedback** - Immediate visual feedback for correct/incorrect answers
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 🔄 **Restart Capability** - Take the quiz multiple times with different question orders

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Parse the text file to JSON (if needed):
```bash
node scripts/parse-txt.mjs
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## Project Structure

```
medtest/
├── src/
│   ├── assets/
│   │   ├── test.txt          # Original questions file
│   │   └── questions.json    # Parsed questions
│   ├── App.tsx               # Main quiz component
│   ├── App.css               # Quiz styling
│   └── index.css             # Global styles
├── scripts/
│   └── parse-txt.mjs         # Text to JSON parser
└── package.json
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Question Format

Questions are stored in JSON format:
```json
{
  "question": "Question text",
  "variants": [
    { "text": "Answer A", "isCorrect": false },
    { "text": "Answer B", "isCorrect": true }
  ]
}
```

## How to Use

1. Click "Тестті бастау" (Start Test) on the welcome screen
2. Read each question and select your answer
3. Get instant feedback on your choice
4. Click "Келесі сұрақ" (Next Question) to continue
5. View your final score at the end
6. Click "Қайта бастау" (Restart) to take the quiz again

## License

MIT
# meatiest
