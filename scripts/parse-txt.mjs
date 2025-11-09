import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../src/assets/test.txt');
const outputPath = path.join(__dirname, '../src/assets/questions.json');

function parseQuizFile(content) {
  const lines = content.split('\n');
  const questions = [];
  let currentQuestion = null;
  let currentVariants = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('<question>') || line.startsWith('<question2>')) {
      // Save previous question if exists
      if (currentQuestion) {
        questions.push({
          question: currentQuestion,
          variants: currentVariants
        });
      }

      // Start new question
      currentQuestion = line.replace(/<question2?>/, '').trim();
      currentVariants = [];
    } else if (line.startsWith('<variant>')) {
      const variantText = line.replace('<variant>', '').trim();
      const isCorrect = variantText.endsWith('+');
      const text = isCorrect ? variantText.slice(0, -1).trim() : variantText;

      currentVariants.push({
        text,
        isCorrect
      });
    }
  }

  // Add the last question
  if (currentQuestion && currentVariants.length > 0) {
    questions.push({
      question: currentQuestion,
      variants: currentVariants
    });
  }

  return questions;
}

try {
  console.log('Reading file...');
  const content = fs.readFileSync(inputPath, 'utf8');
  
  console.log('Parsing questions...');
  const questions = parseQuizFile(content);
  
  console.log(`Found ${questions.length} questions`);
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2), 'utf8');
  
  console.log(`✅ Successfully created ${outputPath}`);
  console.log(`Total questions: ${questions.length}`);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
