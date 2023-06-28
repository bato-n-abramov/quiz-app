import { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { decorImages, decorImagesDrag } from "../../utils/images";
import Parser from "html-react-parser";
import { Draggable } from "drag-react";

import { hover_buttons_audio, drag_audio } from "../../utils/audios";

const QuizCard = ({
  optionClicked,
  questions,
  currentQuestion,
  animation,
  firstScreenEnd,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const isDraggable = window.innerWidth >= 767;

  const hoverAudioRef = useRef(null);
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

  const stopHoverAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverAudioRef.current.pause();
    hoverAudioRef.current.currentTime = 0;
  };

  const handleDrag = () => {
    setIsDragging(true);
    playDragAudio();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    stopDragAudio();
  };

  return (
    <>
      {!questions[currentQuestion].isAnswered && (
        <div className={`QuizCard ${firstScreenEnd ? "firstScreen" : ""}`}>
          <div className="container">
            <div className="QuizCard__wrapper">
              <div className={`QuizCard__text `}>
                <h2 className={`QuizCard__title ${animation ? "animate" : ""}`}>
                  {Parser(questions[currentQuestion].question)}
                </h2>
                <p className="QuizCard__tip">Choose just one option</p>
                <div
                  className={`QuizCard__image ${animation ? "animate" : ""} ${
                    isDragging ? "dragging" : ""
                  }`}
                >
                  {isDraggable && (
                    <Draggable
                      className={"QuizCard__image-drag"}
                      style={{ zIndex: 9 }}
                      onDragStart={handleDrag}
                      onDragEnd={handleDragEnd}
                    >
                      <img
                        src={decorImages[currentQuestion]}
                        alt={decorImages[currentQuestion]}
                        className="img"
                      />
                      <img
                        src={decorImagesDrag[currentQuestion]}
                        alt={decorImagesDrag[currentQuestion]}
                        className="img-border"
                      />
                    </Draggable>
                  )}

                  {!isDraggable && (
                    <div
                      className={"QuizCard__image-drag"}
                      style={{ zIndex: 9 }}
                      onDragStart={handleDrag}
                      onDragEnd={handleDragEnd}
                    >
                      <img
                        src={decorImages[currentQuestion]}
                        alt={decorImages[currentQuestion]}
                        className="img"
                      />
                      <img
                        src={decorImagesDrag[currentQuestion]}
                        alt={decorImagesDrag[currentQuestion]}
                        className="img-border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`QuizCard__options ${animation ? "animate" : ""}`}
              >
                {questions[currentQuestion].options.map((option, idx) => {
                  return (
                    <div
                      key={idx}
                      className="QuizCard__option-wrapp"
                      onMouseEnter={playHoverAudio}
                      onMouseLeave={stopHoverAudio}
                      onClick={() =>
                        optionClicked(option.answer, option.isCorrect)
                      }
                    >
                      <div className="QuizCard__option-hover"></div>
                      <div className="QuizCard__option">{option.answer}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <audio ref={hoverAudioRef} src={hover_buttons_audio} />
      <audio ref={dragAudioRef} src={drag_audio} />
    </>
  );
};

export default QuizCard;
