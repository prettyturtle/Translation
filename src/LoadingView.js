import { View } from "react-native"
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from "react";

export default () => {
  const animation = useRef(null)

  useEffect(() => {
    console.log("BBB")
    setTimeout(() => {
      animation.current?.play()
    }, 0);
  })

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LottieView
        ref={animation}
        // autoPlay={true}
        style={{
          width: 200,
          height: 200
        }}
        source={require("../assets/loading.json")}
      />
    </View>
  )
}