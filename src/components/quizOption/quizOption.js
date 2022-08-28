import React, { useState } from "react";
import "./quizOption.css";


export default function QuizOption(props) {
    const checkAnswer = () => {
        props.setWasAnswered(true);
    }

    return (
        <div className={"Quiz--Option" + (props.wasAnswered ? (props.correctAnswer ? " correct-option" : " wrong-option") : '')} onClick={checkAnswer}>
            <p>{props.quizOption}</p>
        </div>
    );
}