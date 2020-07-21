import React from 'react'
import { Wrapper, ButtonWrapper} from './QuestionCard.style'


import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: AnswerObject | undefined;
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

        <Wrapper> 
            <p className= "number">
                Question: {questionNmbr} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <div>
                {answers.map( (answer) => (
                    <ButtonWrapper 
                    key={answer}
                    correct= {userAnswer?.correctAnswer === answer}
                    userClicked = {userAnswer?.answer === answer}
                    >
                        <button 
                            disabled={userAnswer ? true : false } onClick={callback}
                            value={answer}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )



export default QuestionCard
