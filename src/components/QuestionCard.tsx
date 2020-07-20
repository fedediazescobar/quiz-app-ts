import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNmbr: number;
    totalQuestion: number;

}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNmbr, 
    totalQuestion}) => (

        <div> 
            <p className= "number">
                Question: {questionNmbr} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <div>
                {answers.map( (answer) => (
                    <div key={answer}>
                        <button 
                        disabled={userAnswer} onClick={callback}
                        value={answer}>
                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )



export default QuestionCard
