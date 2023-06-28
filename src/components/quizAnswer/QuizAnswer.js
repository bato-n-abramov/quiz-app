import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Lottie from "lottie-react";
import box from "../../animations/desktop/box.json";
import sneakers from "../../animations/desktop/sneakers.json";
import juice from "../../animations/desktop/juice.json";
import abstract from "../../animations/desktop/abstract.json";
import abstract2 from "../../animations/desktop/abstract2.json";
import rope from "../../animations/desktop/rope.json";
import hat from "../../animations/desktop/hat.json";
import sugar from "../../animations/desktop/sugar.json";

import boxMob from "../../animations/mob/box.json";
import sneakersMob from "../../animations/mob/sneakers.json";
import juiceMob from "../../animations/mob/juice.json";
import abstractMob from "../../animations/mob/abstract.json";
import abstract2Mob from "../../animations/mob/abstract2.json";
import ropeMob from "../../animations/mob/rope.json";
import hatMob from "../../animations/mob/hat.json";
import sugarMob from "../../animations/mob/sugar.json";
import Parser from "html-react-parser";
import "./styles.scss";

import {
  hover_buttons_audio,
  click_audio,
  win_audio,
  lose_audio,
  audios,
} from "../../utils/audios";

import { ReactComponent as Shape } from "../../images/shapes.svg";

const QuizAnswer = ({
  currentQuestion,
  selectedOption,
  showQuizAnswer,
  questions,
  onAnimationComplete,
  isLast,
  isCorrect,
  finish,
}) => {
  const lottieRef = useRef();
  const [animationData, setAnimationData] = useState(null);
  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const winAudioRef = useRef(null);
  const loseAudioRef = useRef(null);

  const audio = useMemo(
    () => new Audio(audios[currentQuestion]),
    [currentQuestion]
  );

  const handleClick = () => {
    lottieRef.current?.play();
    audio.play();
    playClickAudio();
  };

  const handleAnimationComplete = () => {
    onAnimationComplete(true);
  };

  useEffect(() => {
    const animations = [
      box,
      sneakers,
      juice,
      abstract,
      sugar,
      abstract2,
      rope,
      hat,
    ];

    const animationsMob = [
      boxMob,
      sneakersMob,
      juiceMob,
      abstractMob,
      sugarMob,
      abstract2Mob,
      ropeMob,
      hatMob,
    ];

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationData(animationsMob[currentQuestion]);
      } else {
        setAnimationData(animations[currentQuestion]);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentQuestion]);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const playHoverAudio = useCallback(() => {
    hoverAudioRef.current.currentTime = 0;
    hoverAudioRef.current.play();
  }, []);

  const playClickAudio = useCallback(() => {
    clickAudioRef.current.play();
  }, []);

  useEffect(() => {
    const playResultAudio = () => {
      if (isCorrect) {
        winAudioRef.current.play();
      } else {
        loseAudioRef.current.play();
      }
    };

    if (showQuizAnswer) {
      playResultAudio();
    }
  }, [showQuizAnswer, isCorrect]);

  return (
    <div
      className={`QuizAnswer ${showQuizAnswer ? "QuizAnswer--visible" : ""}`}
    >
      <div
        className={`QuizAnswer__animation-wrapp ${
          showQuizAnswer ? "animate" : ""
        }`}
      >
        <div className={`QuizAnswer__wrapper ${!isCorrect ? "wrong" : ""} `}>
          <Shape
            className={`${!isCorrect ? "animate" : ""} QuizAnswer__shapes`}
          />
          {isCorrect ? (
            <h2
              className={`QuizAnswer__title ${showQuizAnswer ? "animate" : ""}`}
            >
              yes, it's {selectedOption}
            </h2>
          ) : (
            <h2
              className={`QuizAnswer__title ${showQuizAnswer ? "animate" : ""}`}
            >
              nah, It's a{" "}
              {
                questions[currentQuestion].options.find(
                  (option) => option.isCorrect
                ).answer
              }
            </h2>
          )}
          <div className="QuizAnswer__content">
            <div
              className={`QuizAnswer__animation ${
                showQuizAnswer ? "animate" : ""
              } ${currentQuestion === 6 ? "left" : ""}`}
              onMouseEnter={playHoverAudio}
              onMouseLeave={() => {
                hoverAudioRef.current.pause();
                hoverAudioRef.current.currentTime = 0;
              }}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                onComplete={handleAnimationComplete}
                className="QuizAnswer__lottie"
              />
            </div>
            <div
              className={`QuizAnswer__tip  ${showQuizAnswer ? "animate" : ""}`}
            >
              <div className="QuizAnswer__tip-wrapper">
                <h3>{isCorrect ? "answer" : "correct answer "}</h3>
                <p>{questions[currentQuestion].answerTip}</p>
                <button
                  className="QuizAnswer__next btn-purple"
                  onClick={handleClick}
                  onMouseEnter={playHoverAudio}
                  onMouseLeave={() => {
                    hoverAudioRef.current.pause();
                    hoverAudioRef.current.currentTime = 0;
                  }}
                >
                  {finish ? "Finish" : Parser("Next <br /> question")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={hoverAudioRef} src={hover_buttons_audio} />
      <audio ref={clickAudioRef} src={click_audio} />
      <audio ref={winAudioRef} src={win_audio} />
      <audio ref={loseAudioRef} src={lose_audio} />
    </div>
  );
};

export default QuizAnswer;
