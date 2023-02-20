import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const [mode, setMode] = useState(initial);

  //Transition function that takes in a new mode and updates the mode state
  function transition(newMode, replace = false) {
    setMode(newMode);
    //If replace is true, replace the current mode
    //If replace is false, do not replace the current mode
    setHistory(prev => replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode])
  }

  //Back function that goes back to previous mode
  function back() {
    //If history length is greater than 1, go back
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, -1)])
    }
  }
  
  return { mode, transition, back };
}