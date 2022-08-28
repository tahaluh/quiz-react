import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./quizDiv.css";
import QuizOption from "../quizOption/quizOption.js";
import NextButton from "../nextButton/nextButton";

export default function QuizDiv(props) {
  const [isLoading, setLoading] = useState(true);
  const [values, setValues] = useState({});
  const [answers, setAnswers] = useState([]);
  const [wasAnswered, setWasAnswered] = useState(false);

  function newQuestion() {
    setLoading(true);
    Axios.get(
      "https://the-trivia-api.com/api/questions?limit=1&region=BR"
    ).then((response) => {
      setValues(response.data[0]);
      setWasAnswered(false);
      setLoading(false);
    });
  }

  useEffect(() => {
    Axios.get(
      "https://the-trivia-api.com/api/questions?limit=1&region=BR"
    ).then((response) => {
      setValues(response.data[0]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log([]);
    } else {
        setAnswers([...values.incorrectAnswers, values.correctAnswer].sort(() => .5 - Math.random()))
    }
  }, [values]);

  return (
    <div className="Quiz--Div">
      <h2 className="Quiz--Question">{values.question}</h2>
      <div className="Quiz--Options--Div">
        {true &&
          answers.map((value, index) => {
            return <QuizOption key={index} quizOption={value} correctAnswer={values.correctAnswer == value} wasAnswered={wasAnswered} setWasAnswered={setWasAnswered}></QuizOption>;
          })}
      </div>
      {wasAnswered && <NextButton newQuestion={newQuestion}/>}
    </div>
  );
}
