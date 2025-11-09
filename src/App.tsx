import { useState } from 'react'
import './App.css'
import questionsData from './assets/questions.json'

interface Variant {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  variants: Variant[];
}

interface ShuffledQuestion extends Question {
  shuffledVariants: Variant[];
}

function App() {
  const [questions] = useState<Question[]>(questionsData as Question[])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [randomQuestions, setRandomQuestions] = useState<ShuffledQuestion[]>([])
  const [questionCount, setQuestionCount] = useState<number>(10)
  const [showSettings, setShowSettings] = useState(false)

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const startQuiz = (count: number) => {
    const shuffled = shuffleArray(questions)
    const selected = count === questions.length ? shuffled : shuffled.slice(0, count)
    
    // Shuffle variants for each question
    const questionsWithShuffledVariants: ShuffledQuestion[] = selected.map(q => ({
      ...q,
      shuffledVariants: shuffleArray(q.variants)
    }))
    
    setRandomQuestions(questionsWithShuffledVariants)
    setQuizStarted(true)
    setShowSettings(false)
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const currentQuestion = randomQuestions[currentQuestionIndex]

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    
    if (currentQuestion.shuffledVariants[index].isCorrect) {
      setScore(score + 1)
    }
    setAnsweredQuestions(answeredQuestions + 1)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < randomQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const getButtonClass = (index: number) => {
    if (selectedAnswer === null) return 'variant-btn'
    
    if (currentQuestion.shuffledVariants[index].isCorrect) {
      return 'variant-btn correct'
    }
    
    if (selectedAnswer === index && !currentQuestion.shuffledVariants[index].isCorrect) {
      return 'variant-btn incorrect'
    }
    
    return 'variant-btn'
  }

  if (!quizStarted && !showSettings) {
    return (
      <div className="app">
        <div className="welcome-screen">
          <h1>🏥 Медициналық Тест</h1>
          <p className="subtitle">Дайындық үшін тестілеу жүйесі</p>
          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-number">{questions.length}</span>
              <span className="stat-label">Барлық сұрақтар</span>
            </div>
          </div>
          <button className="start-btn" onClick={() => setShowSettings(true)}>
            Тестті бастау
          </button>
        </div>
      </div>
    )
  }

  if (showSettings) {
    return (
      <div className="app">
        <div className="settings-screen">
          <h1>⚙️ Сұрақтар санын таңдаңыз</h1>
          <p className="subtitle">Қанша сұраққа жауап бергіңіз келеді?</p>
          
          <div className="quick-options">
            <button 
              className="option-btn"
              onClick={() => startQuiz(10)}
            >
              <span className="option-number">10</span>
              <span className="option-label">сұрақ</span>
            </button>
            <button 
              className="option-btn"
              onClick={() => startQuiz(20)}
            >
              <span className="option-number">20</span>
              <span className="option-label">сұрақ</span>
            </button>
            <button 
              className="option-btn"
              onClick={() => startQuiz(50)}
            >
              <span className="option-number">50</span>
              <span className="option-label">сұрақ</span>
            </button>
            <button 
              className="option-btn"
              onClick={() => startQuiz(100)}
            >
              <span className="option-number">100</span>
              <span className="option-label">сұрақ</span>
            </button>
          </div>

          <div className="custom-input-container">
            <label htmlFor="customCount" className="custom-label">
              Немесе өз санын енгізіңіз:
            </label>
            <div className="input-group">
              <input
                id="customCount"
                type="number"
                min="1"
                max={questions.length}
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), questions.length))}
                className="custom-input"
                placeholder="Сұрақтар саны"
              />
              <button 
                className="custom-start-btn"
                onClick={() => startQuiz(questionCount)}
              >
                Бастау
              </button>
            </div>
          </div>

          <button 
            className="all-questions-btn"
            onClick={() => startQuiz(questions.length)}
          >
            Барлық {questions.length} сұраққа жауап беру
          </button>

          <button 
            className="back-btn"
            onClick={() => setShowSettings(false)}
          >
            ← Артқа
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / answeredQuestions) * 100)
    return (
      <div className="app">
        <div className="result-screen">
          <h1>🎉 Тест аяқталды!</h1>
          <div className="result-card">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
            </div>
            <div className="result-stats">
              <div className="result-stat">
                <span className="result-label">Дұрыс жауаптар:</span>
                <span className="result-value correct-text">{score}</span>
              </div>
              <div className="result-stat">
                <span className="result-label">Қате жауаптар:</span>
                <span className="result-value incorrect-text">{answeredQuestions - score}</span>
              </div>
              <div className="result-stat">
                <span className="result-label">Барлығы:</span>
                <span className="result-value">{answeredQuestions}</span>
              </div>
            </div>
          </div>
          <button className="restart-btn" onClick={() => {
            setQuizStarted(false)
            setShowSettings(false)
            setShowResult(false)
          }}>
            Қайта бастау
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / randomQuestions.length) * 100}%` }}
          />
        </div>
        
        <div className="quiz-header">
          <div className="question-counter">
            Сұрақ {currentQuestionIndex + 1} / {randomQuestions.length}
          </div>
          <div className="score-display">
            Ұпай: {score} / {answeredQuestions}
          </div>
        </div>

        <div className="question-card">
          <h2 className="question-text">{currentQuestion.question}</h2>
          
          <div className="variants-container">
            {currentQuestion.shuffledVariants.map((variant, index) => (
              <button
                key={index}
                className={getButtonClass(index)}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="variant-letter">{String.fromCharCode(65 + index)}</span>
                <span className="variant-text">{variant.text}</span>
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <button className="next-btn" onClick={handleNextQuestion}>
              {currentQuestionIndex < randomQuestions.length - 1 ? 'Келесі сұрақ →' : 'Нәтижені көру'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
