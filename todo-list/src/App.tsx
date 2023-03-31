import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">TaskTrove</span>
      <InputField />
    </div>
  );
};

export default App;
