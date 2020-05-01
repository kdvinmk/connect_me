import React, { useEffect } from "react";
import "./App.css";
import { Root } from "./components";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("App mounted");
  }, []);
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
