import { useState, useEffect, useRef } from "react";
import { draggableImages, draggableImagesBorder } from "../../utils/images";
import { Draggable } from "drag-react";
import "./styles.scss";

import { drag_audio } from "../../utils/audios";

const DraggableImages = ({ positionChanged }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragZIndices, setDragZIndices] = useState(
    Array(draggableImages.length).fill(9)
  );
  const draggableRef = useRef([]);
  const [isDraggable, setIsDraggable] = useState(window.innerWidth >= 767);

  const dragAudioRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
    const maxZIndex = Math.max(...dragZIndices);
    const updatedZIndices = [...dragZIndices];
    updatedZIndices[index] = maxZIndex + 1;
    setDragZIndices(updatedZIndices);
    playDragAudio();
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    stopDragAudio();
  };

  const playDragAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      dragAudioRef.current.volume = 0.8;
      dragAudioRef.current.currentTime = 0;
      dragAudioRef.current.play();
    }, 100);
  };

  const stopDragAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    dragAudioRef.current.pause();
    dragAudioRef.current.currentTime = 0;
  };

  const calculatePosition = (index) => {
    let left;
    let top;

    if (index === 0) {
      left = "20%";
      top = "70%";
    } else if (index === 1) {
      left = "100%";
      top = "50%";
    } else if (index === 2) {
      left = "-5%";
      top = "70%";
    } else if (index === 3) {
      left = "80%";
      top = "0%";
    } else if (index === 4) {
      left = "1%";
      top = "5%";
    } else if (index === 5) {
      left = "80%";
      top = "60%";
    } else if (index === 6) {
      left = "5%";
      top = "70%";
    } else if (index === 7) {
      left = "50%";
      top = "5%";
    } else if (index === 8) {
      left = "60%";
      top = "10%";
    } else if (index === 9) {
      left = "10%";
      top = "10%";
    } else if (index === 10) {
      left = "25%";
      top = "80%";
    }

    const randomTransition = Math.random() * 0.88 + 0.2;
    const transitionDuration = randomTransition;

    return {
      left,
      top: positionChanged ? "75%" : top,
      transition: positionChanged
        ? `top ${transitionDuration}s ease-in-out`
        : "",
      zIndex: dragZIndices[index],
    };
  };

  const radius = 50;

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDraggable(window.innerWidth >= 767);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={`draggable-wrapper${positionChanged ? " animate" : ""}`}>
      {draggableImages.map((img, index) => {
        const imgBorder = draggableImagesBorder[index];
        const animationClass = `animation-${index + 1}`;
        const gravityClass = ` gravity-${index + 1}`;

        if (!isDraggable) {
          return (
            <div
              key={index}
              className={`draggable-item${
                positionChanged ? " animate" : `${gravityClass}`
              } ${animationClass}`}
              style={{
                ...calculatePosition(index, draggableImages.length, radius),
              }}
            >
              <img src={img} alt={img} className={`img ${animationClass}`} />
              <img src={imgBorder} alt={imgBorder} className="img-border" />
            </div>
          );
        } else {
          return (
            <Draggable
              key={index}
              ref={(el) => (draggableRef.current[index] = el)}
              className={`draggable-item${
                positionChanged ? " animate" : `${gravityClass}`
              }${draggedIndex === index ? " dragging" : ""} ${animationClass}`}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              style={{
                ...calculatePosition(index, draggableImages.length, radius),
              }}
            >
              <img src={img} alt={img} className={`img ${animationClass}`} />
              <img src={imgBorder} alt={imgBorder} className="img-border" />
            </Draggable>
          );
        }
      })}
      <audio ref={dragAudioRef} loop src={drag_audio} />
    </div>
  );
};

export default DraggableImages;
