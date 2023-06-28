import { useEffect } from "react";
import preloader from "../../animations/preloader.json";
import { useLottie } from "lottie-react";

const Preloader = () => {
  const options = {
    loop: false,
    autoplay: false,
    animationData: preloader,
    className: "App__loader",
    rendererSettings: {
      preserveAspectRatio: "none",
    },
  };

  const { View, setSpeed, play } = useLottie(options);

  useEffect(() => {
    setSpeed(1.5);
    setTimeout(() => {
      play();
    }, 2500);
  }, [setSpeed, play]);

  return <div className="App__loader-wrapper">{View}</div>;
};

export default Preloader;
