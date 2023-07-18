import { useEffect } from "react";
import startBtn from "../../animations/startBtn.json";
import { useLottie } from "lottie-react";

const StartBtn = ({ playAnim, click }) => {
  const options = {
    loop: true,
    autoplay: false,
    initialSegment: [0, 30],
    animationData: startBtn,
    className: "hover__green",
    rendererSettings: {
      preserveAspectRatio: "none",
    },
  };

  const { View, playSegments, setDirection, stop } = useLottie(options);

  useEffect(() => {
    if (playAnim) {
      playSegments([15, 31], true);
    } else {
      setDirection(-1);
      setTimeout(() => {
        stop();
      }, 200);
    }
  }, [playAnim, playSegments, setDirection, stop]);

  return (
    <div className={`hover__green-wrapp ${click ? "click" : ""}`}>{View}</div>
  );
};

export default StartBtn;
