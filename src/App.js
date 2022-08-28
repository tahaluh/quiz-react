import React, { useState, useEffect } from "react";
import './App.css';
import QuizDiv from './components/quizDiv/quizDiv.js'

function App() {
  return (
    <div className="App">
      <div className="Title--div">
      <h1 className="Tittle">Responde essa</h1>
      </div>
      <QuizDiv />
    </div>
  );
}

export default App;
