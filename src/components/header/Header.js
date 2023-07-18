import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import logo from "../../images/logo.png";
import {
  main_audio,
  hover_other_buttons_audio,
  click_audio,
  quiz_final_audio,
} from "../../utils/audios";

const Header = ({
  currentQuestion = 0,
  questions = [],
  positionChanged,
  isLast,
}) => {
  const [audioMuted, setAudioMuted] = useState(true);
  const audioRef = useRef(null);
  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isLast) {
      audioElement.src = quiz_final_audio;
      audioElement.loop = true;
      audioElement.volume = 0.05;
    } else {
      audioElement.src = main_audio;
      audioElement.loop = true;
      audioElement.volume = 0.05;
    }
  }, [isLast]);

  const playHoverAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      hoverAudioRef.current.volume = 0.4;
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play();
    }, 100);
  };

  const playClickAudio = () => {
    clickAudioRef.current.play();
  };

  const stopHoverAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverAudioRef.current.pause();
    hoverAudioRef.current.currentTime = 0;
  };

  const muteAudio = () => {
    const audioElement = audioRef.current;
    audioElement.pause();
    setAudioMuted(true);
  };

  const unmuteAudio = () => {
    const audioElement = audioRef.current;
    audioElement.muted = false;
    audioElement.play();
    setAudioMuted(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__links-wrapper">
            <div className="header__links">
              <a
                href="https://theqream.com/"
                className="header__logo"
                onClick={playClickAudio}
                onMouseEnter={playHoverAudio}
                onMouseLeave={stopHoverAudio}
              >
                <span>
                  check out <strong>qream</strong>
                </span>
                <img src={logo} alt="logo" />
              </a>
            </div>
          </div>

          {!isLast && (
            <div
              className={`header__stage-wrapper ${
                positionChanged ? "show" : ""
              }`}
            >
              <div
                className={`header__stage-count ${
                  positionChanged ? "show" : ""
                }`}
              >
                <div className="currentQuestion">{currentQuestion + 1}</div>
                <div className="countQuestion">
                  of <span>{questions.length}</span>
                </div>
              </div>
            </div>
          )}

          <div className="header__mute-wrapper">
            <div
              className="header__mute"
              onMouseEnter={playHoverAudio}
              onMouseLeave={stopHoverAudio}
              onClick={playClickAudio}
            >
              {!audioMuted ? (
                <button onClick={muteAudio}>OFF</button>
              ) : (
                <button onClick={unmuteAudio}>ON</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={isLast ? quiz_final_audio : main_audio} />
      <audio ref={hoverAudioRef} src={hover_other_buttons_audio} />
      <audio ref={clickAudioRef} src={click_audio} />
    </header>
  );
};

export default Header;
