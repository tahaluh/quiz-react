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

  const [answersPT, setAnswersPT] = useState([]);
  const [correctAnswerPT, setCorrectAnswerPT] = useState();
  const [questionPT, setQuestionPT] = useState();

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
    newQuestion();
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log([]);
    } else {
      setAnswers(
        [...values.incorrectAnswers, values.correctAnswer].sort(
          () => 0.5 - Math.random()
        )
      );

      // tradução pt

      libreTranslate(
        [...values.incorrectAnswers, values.correctAnswer].sort(
          () => 0.5 - Math.random()
        ),
        setAnswersPT
      );

      libreTranslate(
        values.correctAnswer,
        setCorrectAnswerPT
      );

      libreTranslate(
        values.question,
        setQuestionPT
      );
    }
  }, [values]);

  async function libreTranslate(toTranslate, setToTranslate) {
    Axios.post("https://libretranslate.de/translate", {
      q: toTranslate,
      source: "en",
      target: "pt",
      format: "text",
      api_key: "",
    }).then(function (response) {
      setToTranslate(response.data.translatedText);
    });
  }

  return (
    <div className="Quiz--Div">
      <h2 className="Quiz--Question">{questionPT}</h2> {/*values.question*/}
      <div className="Quiz--Options--Div">
        {true &&
          answersPT.map((value, index) => { //answers.map
            return (
              <QuizOption
                key={index}
                quizOption={value}
                correctAnswer={correctAnswerPT == value} // correctAnswer== value
                wasAnswered={wasAnswered}
                setWasAnswered={setWasAnswered}
              ></QuizOption>
            );
          })}
      </div>
      {wasAnswered && <NextButton newQuestion={newQuestion} />}
    </div>
  );
}
