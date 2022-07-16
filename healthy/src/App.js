import "./App.css";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import TextField from "@mui/material/TextField";
import HumanHeat from "./components/human";
import { Button } from "@mui/material";
import convertToHeat from "./components/convertToHeat";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "wec-programming",
    storageBucket: "wec-programming.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  const [symptoms, setSymptoms] = useState('');
  const [heat, setHeat] = useState(convertToHeat("", 3));

  useEffect(() => {
    console.log(symptoms);
  }, [symptoms]);

  // setHeat(convertToHeat('head', 3));

  return (
    <div className="App">
      <TextField
        placeholder="Data"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        sx={{ position: "absolute", left: 10, top: 10 }}
        label="Data"
        variant="standard"
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", left: 10, top: 60 }}
        onClick={() => {}}
      >
        Submit
      </Button>
      <HumanHeat heat={heat} />
    </div>
  );
}

export default App;
