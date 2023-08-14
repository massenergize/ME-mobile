import React, { forwardRef, useLayoutEffect, useState } from "react";

import { View } from "native-base";
import ConfettiCannon from "react-native-confetti-cannon";

import ConfettiController from "./ConfettiController";

const Confetti = () => {
  let ref;
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  useLayoutEffect(() => {
    ConfettiController.setConfettiRef(ref);
  }, []);

  return (
    <View
      position="absolute"
      height="100%"
      width="100%"
      zIndex={999}
      display={isConfettiVisible ? "block" : "none"}
    >
      <ConfettiCannon
        count={50}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1500}
        fadeOut={true}
        autoStart={false}
        onAnimationStart={() => setIsConfettiVisible(true)}
        onAnimationEnd={() => setIsConfettiVisible(false)}
        ref={(_ref) => (ref = _ref)}
      />
    </View>
  );
};

export default forwardRef(Confetti);
