import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";

import Routes from "./src/routes";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function fetchFonts() {
      await Font.loadAsync({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
        "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf")
      });

      setFontLoaded(true);
    }

    fetchFonts();
  });

  if (!fontLoaded) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}
