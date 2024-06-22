import { useState } from "react";

const Score = ({ questionIdx, setQuestions }) => {
    const [score, setScore] = useState(0);

    const handleInputScore = (newScore, questionIdx) => {
        if (newScore === '') {
            newScore = null;
        } else {
            newScore = parseInt(newScore); 
            if (isNaN(newScore)) {
                newScore = 0; 
            } else {
                newScore = Math.max(newScore, 0); 
            }
        }
        setScore(newScore); 
        if (newScore !== null) {
            setQuestions((prev) => {
                const updatedQuestions = [...prev];
                updatedQuestions[questionIdx] = {
                    ...updatedQuestions[questionIdx],
                    score: Math.max(newScore, 0), 
                };
                return updatedQuestions;
            });
        }
    };

    return (
        <div>
            <span>Score: </span>
            <input type='number' onChange={(event) => handleInputScore(event.target.value, questionIdx)} value={score}></input>
        </div>
    );
}

export default Score;