import { useState, useRef, useEffect } from "react";
import { hover_buttons_audio, click_audio } from "../../utils/audios";
import StartBtn from "../startBtn/StartBtn";
import "./styles.scss";

const HeroTitle = ({ positionChanged, onButtonClick }) => {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [click, setClick] = useState(false);

  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleButtonClick = () => {
    onButtonClick();
    setActive(true);
    playClickAudio();
    setClick(true);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
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

  const playClickAudio = () => {
    clickAudioRef.current.play();
  };

  const stopHoverAudio = () => {
    setIsHovered(false);
    clearTimeout(hoverTimeoutRef.current);
    hoverAudioRef.current.pause();
    hoverAudioRef.current.currentTime = 0;
  };

  return (
    <div className={`Hero__title ${positionChanged ? "animate" : ""}`}>
      <div className="container">
        <div
          className="Hero__title-wrapper"
          onMouseEnter={playHoverAudio}
          onMouseLeave={stopHoverAudio}
        >
          <h1 className="Hero__title-title">
            so you think <br /> you know branding?
          </h1>
          <p className="Hero__title-text">
            Come find out if you really use the full potential of your brand
          </p>
          <button
            className={`Hero__title-btn btn-green ${active ? " active" : ""}`}
            onClick={handleButtonClick}
            onMouseEnter={playHoverAudio}
            onMouseLeave={stopHoverAudio}
          >
            <StartBtn playAnim={isHovered} click={click} />
          </button>
        </div>
      </div>
      <audio ref={hoverAudioRef} loop src={hover_buttons_audio} />
      <audio ref={clickAudioRef} src={click_audio} />
    </div>
  );
};

export default HeroTitle;
