import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import DraggableImages from "./components/draggableImage/DraggableImages";
import HeroTitle from "./components/heroTitle/HeroTitle";
import MainQuiz from "./components/mainQuiz/MainQuiz";
import Preloader from "./components/preloader/Preloder";

import { quizData } from "./utils/quizData";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [positionChanged, setPositionChanged] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const [finish, setFinish] = useState(false);

  const [firstScreenEnd, setFirstScreenEnd] = useState(false);

  const [animation, setAnimation] = useState(false);

  const [answers, setAnswers] = useState([]);

  const [isCorrect, setIsCorrect] = useState(false);

  const questionAnswered = (currentQuestion) => {
    quizData[currentQuestion].isAnswered = true;
  };

  const handlePositionChange = () => {
    setPositionChanged(true);
    setAnimation(true);
    setTimeout(() => {
      setFirstScreenEnd(true);
    }, 2500);
  };

  const optionClicked = (option, isCorrect) => {
    setSelectedOption(option);
    setShowQuizAnswer(true);
    setAnimation(false);
    questionAnswered(currentQuestion);

    setAnswers((prevAnswers) => [...prevAnswers, option]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 2 > quizData.length) {
      setFinish(true);
    }

    setIsCorrect(isCorrect);
  };

  const handleAnimationComplete = (complete) => {
    setAnimationComplete(complete);
    setShowQuizAnswer(false);
    setAnimation(true);

    if (currentQuestion + 1 < quizData.length) {
      const nextQuestion = currentQuestion + 1;

      if (quizData[nextQuestion].isAnswered) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(answers[nextQuestion]);
        setShowQuizAnswer(true);
      } else {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      }
    } else {
      setIsLast(true);
    }
  };

  return (
    <>
      <Preloader />
      <div className={`App ${isLast ? "white" : ""}`}>
        <Header
          currentQuestion={currentQuestion}
          positionChanged={positionChanged}
          questions={quizData}
          isLast={isLast}
        />
        <HeroTitle
          positionChanged={positionChanged}
          onButtonClick={handlePositionChange}
        />
        <DraggableImages positionChanged={positionChanged} />
        <MainQuiz
          currentQuestion={currentQuestion}
          optionClicked={optionClicked}
          score={score}
          selectedOption={selectedOption}
          questions={quizData}
          showQuizAnswer={showQuizAnswer}
          animationComplete={animationComplete}
          onAnimationComplete={handleAnimationComplete}
          isLast={isLast}
          animation={animation}
          firstScreenEnd={firstScreenEnd}
          isCorrect={isCorrect}
          finish={finish}
        />
      </div>
    </>
  );
}

export default App;
