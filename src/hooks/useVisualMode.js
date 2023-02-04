import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transition function that takes in a new mode and updates the mode state
  function transition(newMode, replace = false) {
    //If replace is true, replace the current mode
    if (replace) {
      const historyArray = [...history];
      historyArray.pop();
      historyArray.push(newMode);
      const prevMode = historyArray[historyArray.length - 1];
      setMode(prevMode);
      setHistory(historyArray);
      }

    //If replace is false, do not replace the current mode
    if (!replace) {
    const historyArray = [...history];
    setMode(newMode);
    historyArray.push(newMode);
    setHistory(historyArray);
    }
  }

  //Back function that goes back to previous mode
  function back() {
    //If history length is less than 2, do not go back
    if (history.length < 2) {
      return;
    }
    const historyArray = [...history];
    //Set the mode to the previous item in history
    historyArray.pop();
    setHistory(historyArray);
    const prevMode = historyArray[historyArray.length - 1];
    setMode(prevMode);
  }
  return { mode, transition, back };
}