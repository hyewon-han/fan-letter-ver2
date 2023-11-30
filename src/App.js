import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyle";
import Router from "./shared/router";
import { useState, useEffect } from "react";
import { Context } from "./Context";
import fakeData from "./fakeData.json";

function App() {
  // 상태 초기화 함수를 사용하여 localStorage에서 데이터 불러오기!
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("comments");
    return savedData ? JSON.parse(savedData) : fakeData;
  });

  // 데이터가 변경될 때마다 localStorage에 저장!
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(data));
  }, [data]);
  return (
    <Context.Provider value={{ data, setData }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
