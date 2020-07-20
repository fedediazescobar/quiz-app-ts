import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions, Difficulty, QuestionsState } from './API'

 const TOTAL_QUESTIONS = 10;

 export type AnswerObject = {
   question: string;
   answer: string;
   correct: boolean;
   correctAnswer: string;
 }

 const App = () =>  {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true);

 // console.log(questions)
  const startTrivia = async () => {

    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS, 
      Difficulty.EASY
    );

    console.log(newQuestions)

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false)

  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {

  }

  return (
    <div >
        <h1>REACT  QUIZ</h1> 
        { gameOver || userAnswers.length === TOTAL_QUESTIONS 
        ? <button className="start" onClick={startTrivia}> Start </button>
        : null
        }
        {!gameOver? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
        <QuestionCard 
          questionNmbr={number +1}
          totalQuestion={TOTAL_QUESTIONS}
          question= {questions[number].question}
          answers= {questions[number].answers}
          userAnswer= {userAnswers ? userAnswers[number] : undefined}
          callback= {checkAnswer}
        />)}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 
        ? ( <button className="next" onClick={nextQuestion}>Next Question</button>)
        : null }
    </div>
  );
}

export default App;
