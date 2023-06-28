import QuizCard from "../quizCard/QuizCard";
import QuizAnswer from "../quizAnswer/QuizAnswer";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";
import QuizFinish from "../quizFinish/QuizFinish";

const MainQuiz = ({
  currentQuestion,
  optionClicked,
  questions,
  selectedOption,
  showQuizAnswer,
  animationComplete,
  onAnimationComplete,
  score,
  isLast,
  positionChanged,
  animation,
  firstScreenEnd,
  isCorrect,
  finish,
}) => {
  const handleAnimationComplete = (complete) => {
    onAnimationComplete(complete);
  };
  return (
    <div className="MainQuiz">
      <div className="MainQuiz__wrapper">
        {questions[currentQuestion].isAnswered ? (
          <CSSTransition
            in={showQuizAnswer}
            timeout={100}
            classNames="visible"
            unmountOnExit
          >
            <QuizAnswer
              questions={questions}
              currentQuestion={currentQuestion}
              optionClicked={optionClicked}
              selectedOption={selectedOption}
              animationComplete={animationComplete}
              onAnimationComplete={handleAnimationComplete}
              showQuizAnswer={showQuizAnswer}
              isCorrect={isCorrect}
              finish={finish}
            />
          </CSSTransition>
        ) : (
          <QuizCard
            optionClicked={optionClicked}
            currentQuestion={currentQuestion}
            questions={questions}
            animationComplete={animationComplete}
            animation={animation}
            positionChanged={positionChanged}
            firstScreenEnd={firstScreenEnd}
          />
        )}
        {isLast && <QuizFinish score={score} />}
      </div>
    </div>
  );
};

export default MainQuiz;
