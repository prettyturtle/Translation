import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import { useTranslation } from './src/use-translation';
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useRef, useState } from 'react';
import LoadingView from './src/LoadingView';
import LottieView from "lottie-react-native"
import { useFonts } from "expo-font"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const animation = useRef(null)
  const { t, locale, setLocale, format } = useTranslation()
  const { cookieKey } = useCookie()
  const [isLoaded, setIsLoaded] = useState(false)

  const [fontsLoaded] = useFonts({
      "RIDIBatang": require("./assets/RIDIBatang.otf")
  })

  const y = new Date().getFullYear()
  const m = new Date().getMonth() + 1
  const d = new Date().getDate()
  const todayText = format(t("today_is"), y, m, d)

  const locales = ["ko", "en", "ja", "es", "zh"]

  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true)
    }
  }, [cookieKey])

  useEffect(() => {
    if (locale !== null && fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [locale, fontsLoaded])

  useEffect(() => {
    console.log("AAA")
    setTimeout(() => {
      animation.current?.play()
    }, 0)
  })

  if (!isLoaded) { return <LoadingView /> }

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        resizeMode='cover'
        source={require("./assets/background.json")}
        style={{
          position: "absolute",
          zIndex: -1
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>

          <View style={styles.buttonsContainer}>
            {locales.map(item => {
              return (
                <Button
                  key={item}
                  onPress={() => setLocale(item)}
                  isSelected={locale === item}
                  text={item.toUpperCase()}
                />
              )
            })}
          </View>
        </View>

      </SafeAreaView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  todayText: {
    fontFamily: "RIDIBatang",
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f"
  },
  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
