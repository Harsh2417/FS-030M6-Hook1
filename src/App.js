import React, { useState, useEffect } from 'react';
import './App.css'

const questionsData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    question: 'Which gas do plants use for photosynthesis?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 'Carbon Dioxide',
  },
  {
    question: 'What is the largest mammal?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale',
  },
  {
    question: 'What is the symbol for the chemical element gold?',
    options: ['Go', 'Au', 'Gd', 'Gl'],
    correctAnswer: 'Au',
  },
  {
    question: 'Which planet is known as the "Morning Star" or "Evening Star"?',
    options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
    correctAnswer: 'Venus',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Mars', 'Jupiter'],
    correctAnswer: 'Jupiter',
  }
  
];

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    // Shuffle the order of questions
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowCorrectAnswer(false);
    setWrongAnswers([]);
  }, []);

  const handleOptionClick = (selectedAnswer) => {
    if (showCorrectAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }

    setShowCorrectAnswer(true);

    setTimeout(() => {
      setShowCorrectAnswer(false);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        <h4>End of the quiz</h4>
        // You can show a summary or do something else here
      }
    }, 2000);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <p>Current Score: {score}</p>
      <div className="question-box">
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleOptionClick(option)}
                className="option-button"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        {showCorrectAnswer && (
          <p>Correct answer: {currentQuestion.correctAnswer}</p>
        )}
      </div>
      {currentQuestionIndex === questions.length - 1 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Wrong Answers</h2>
          <ul>
            {wrongAnswers.map((wrongQuestion, index) => (
              <li key={index}>
                {wrongQuestion.question} - Correct answer: {wrongQuestion.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default QuizApp;
