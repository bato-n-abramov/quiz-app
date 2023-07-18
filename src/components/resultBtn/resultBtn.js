import { useEffect } from "react";
import hoverResult from "../../animations/hoverResult.json";

import { useLottie } from "lottie-react";

const ResultBtn = ({ playAnim, click }) => {
  const options = {
    loop: true,
    autoplay: false,
    initialSegment: [0, 25],
    animationData: hoverResult,
    className: "hover__green",
    rendererSettings: {
      preserveAspectRatio: "none",
    },
  };

  const { View, playSegments, setDirection, stop } = useLottie(options);

  useEffect(() => {
    if (playAnim) {
      playSegments([16, 29], true);
    } else {
      setDirection(-1);
      setTimeout(() => {
        stop();
      }, 200);
    }
  }, [playAnim, playSegments, setDirection, stop]);

  return (
    <div className={`hover__green-wrapp result ${click ? "click" : ""}`}>
      {View}
    </div>
  );
};

export default ResultBtn;
