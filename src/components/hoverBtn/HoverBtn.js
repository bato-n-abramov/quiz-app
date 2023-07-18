import { useEffect } from "react";

import { useLottie } from "lottie-react";

const HoverBtn = ({ playAnim, animation, click }) => {
  const options = {
    loop: true,
    autoplay: false,
    initialSegment: [0, 25],
    animationData: animation,
    className: "hover__purple",
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
    <div className={`hover__purple-wrapp ${click ? "click" : ""}`}>{View}</div>
  );
};

export default HoverBtn;
