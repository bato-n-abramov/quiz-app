import { useState, useRef, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { CSSTransition } from "react-transition-group";
import Parser from "html-react-parser";
import { Draggable } from "drag-react";

import finish1 from "../../images/finish1.png";
import finish2 from "../../images/finish2.png";
import finish3 from "../../images/finish3.png";
import finalBackground from "../../images/final_background.png";
import finalBackgroundMob from "../../images/final_background_mob.png";
import chain from "../../images/chain.png";

import box from "../../images/box.png";
import juice from "../../images/juice.png";
import sneakers from "../../images/sneakers.png";
import sugar from "../../images/sugar.png";

import box2 from "../../images/box2.png";
import juice2 from "../../images/juice2.png";
import sneakers2 from "../../images/sneakers2.png";
import sugar2 from "../../images/sugar2.png";

import juice3 from "../../images/juice3.png";
import juice4 from "../../images/juice4.png";

import ResultBtn from "../resultBtn/resultBtn";

import {
  hover_buttons_audio,
  click_audio,
  drag_audio,
} from "../../utils/audios";

import {
  resultsPhrases,
  titles,
  descriptions,
} from "../../utils/quizFinishData";

import "./styles.scss";
import ContactForm from "../contactForm/ContactForm";

const QuizFinish = ({ score }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [btnStart, setBtnStart] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [click, setClick] = useState(false);

  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const dragAudioRef = useRef(null);
  const dragTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(dragTimeoutRef.current);
    };
  }, []);

  const playHoverAudio = () => {
    setIsHovered(true);
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play();
    }, 100);
  };

  const playDragAudio = () => {
    clearTimeout(dragTimeoutRef.current);
    dragTimeoutRef.current = setTimeout(() => {
      dragAudioRef.current.currentTime = 0;
      dragAudioRef.current.play();
    }, 100);
  };

  const stopDragAudio = () => {
    clearTimeout(dragTimeoutRef.current);
    dragAudioRef.current.pause();
    dragAudioRef.current.currentTime = 0;
  };

  const playClickAudio = () => {
    clickAudioRef.current.play();
  };

  const stopHoverAudio = () => {
    setIsHovered(false);
    clearTimeout(hoverTimeoutRef.current);
    hoverAudioRef.current.pause();
    hoverAudioRef.current.currentTime = 0;
  };

  const handleFormSubmit = () => {
    setBtnStart(true);
  };

  const handleVisibleForm = () => {
    setVisibleForm(true);
    setIsHovered(false);
    stopHoverAudio();
    setClick(true);
  };

  const [draggingElement, setDraggingElement] = useState(null);

  const handleDragStart = (element) => {
    setDraggingElement(element);
    playDragAudio();
  };

  const handleDragEnd = () => {
    setDraggingElement(null);
    stopDragAudio();
  };

  let result = "";
  let title = "";
  let description = "";

  let className = "";

  if (score < 3) {
    result = resultsPhrases[0];
    title = titles[0];
    description = descriptions[0];
    className = "low";
  } else if (score <= 5) {
    result = resultsPhrases[1];
    title = titles[1];
    description = descriptions[1];
    className = "medium";
  } else {
    result = resultsPhrases[2];
    title = titles[2];
    description = descriptions[2];
    className = "high";
  }

  const calculatePosition = (className) => {
    let left;
    let top;

    if (className === "high") {
      left = "90%";
      top = "40%";
    } else if (className === "medium") {
      left = "40%";
      top = "30%";
    } else if (className === "low") {
      left = "100%";
      top = "70%";
    }

    return {
      left,
      top,
    };
  };

  const calculatePosition2 = (className) => {
    let left;
    let top;

    if (className === "high") {
      left = "40%";
      top = "10%";
    } else if (className === "medium") {
      left = "90%";
      top = "50%";
    } else if (className === "low") {
      left = "50%";
      top = "5%";
    }

    return {
      left,
      top,
    };
  };

  return (
    <div className={`QuizFinish ${className}`}>
      <div className="QuizFinish__background">
        <img src={finalBackground} alt={finalBackground} />
      </div>

      <Marquee autoFill={true} className="desktop">
        {result}
      </Marquee>
      <div className="QuizFinish__wrapper">
        <div className="QuizFinish__background-mob">
          <img src={finalBackgroundMob} alt={finalBackgroundMob} />
        </div>
        <div className="QuizFinish__content">
          <h2 className="QuizFinish__title">{Parser(title)}</h2>
          <p className="QuizFinish__text">{description}</p>
          <Draggable
            onDragStart={() => handleDragStart("decor-1")}
            onDragEnd={handleDragEnd}
            className={`QuizFinish__decor decor-1 ${
              draggingElement === "decor-1" ? "dragging" : ""
            } ${className} `}
            style={{
              ...calculatePosition(className),
              position: "fixed",
              zIndex: 99,
              cursor: "grabbing",
            }}
          >
            <img
              src={className === "high" ? box : sugar ? juice3 : ""}
              alt="decoration"
              className="img"
            />
            <img
              src={className === "high" ? box2 : sugar2 ? juice4 : ""}
              alt="decoration"
              className="img-border"
            />
          </Draggable>
          <Draggable
            onDragStart={() => handleDragStart("decor-2")}
            onDragEnd={handleDragEnd}
            className={`QuizFinish__decor decor-2 ${className} ${
              draggingElement === "decor-2" ? "dragging" : ""
            } `}
            style={{
              ...calculatePosition2(className),
              position: "fixed",
              zIndex: 99,
              cursor: "grabbing",
            }}
          >
            <img
              src={className === "high" ? juice : sneakers ? sugar : ""}
              alt="decoration"
              className="img"
            />
            <img
              src={className === "high" ? juice2 : sneakers2 ? sugar2 : ""}
              alt="decoration"
              className="img-border"
            />
          </Draggable>
        </div>
        <Marquee className="mobile" autoFill={true}>
          {result}
        </Marquee>
        <div className="QuizFinish__image">
          {score < 3 && (
            <img src={finish1} className="finish-img" alt="finishQuiz" />
          )}
          {score >= 3 && score < 6 && (
            <img src={finish2} className="finish-img" alt="finishQuiz" />
          )}
          {score >= 6 && (
            <img src={finish3} className="finish-img" alt="finishQuiz" />
          )}
          {score >= 3 && score < 6 && (
            <img className="chain" src={chain} alt="chain" />
          )}
          {score > 3 && score < 6 && (
            <img className="sugar" src={sugar} alt="sugar" />
          )}
          {score >= 6 && <img className="box" src={box} alt="box" />}
        </div>
        {!visibleForm && !btnStart && (
          <div className={`QuizFinish__btn-wrapper`}>
            <div className={`QuizFinish__btn-tip ${className}`}>
              Receive a <strong>full info</strong> & complete 20 step{" "}
              <strong>free guide</strong> to branding on your email
            </div>
            <button
              className="QuizFinish__btn btn-green "
              onClick={handleVisibleForm}
              onMouseEnter={playHoverAudio}
              onMouseLeave={stopHoverAudio}
            >
              <ResultBtn playAnim={isHovered} click={click} />
            </button>
          </div>
        )}
        {btnStart && (
          <a
            href="/quiz-app"
            className={`QuizFinish__btn-start btn-green`}
            onClick={playClickAudio}
            onMouseEnter={playHoverAudio}
            onMouseLeave={stopHoverAudio}
          >
            take the <br /> quiz again
          </a>
        )}
      </div>
      <CSSTransition
        in={visibleForm}
        timeout={100}
        classNames="visible"
        unmountOnExit
      >
        <ContactForm
          visibleForm={visibleForm}
          setVisibleForm={setVisibleForm}
          setClick={setClick}
          visiblePopup={visiblePopup}
          setVisiblePopup={setVisiblePopup}
          onFormSubmit={handleFormSubmit}
        />
      </CSSTransition>
      <audio ref={hoverAudioRef} loop src={hover_buttons_audio} />
      <audio ref={clickAudioRef} src={click_audio} />
      <audio ref={dragAudioRef} loop src={drag_audio} />
    </div>
  );
};

export default QuizFinish;
