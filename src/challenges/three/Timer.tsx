import { Button, HStack, Text } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";

function useTimer() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const start = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (running) {
      const a = setInterval(() => setTime((prevTime) => prevTime + 100), 100);

      return () => clearInterval(a);
    }
  }, [running]);

  return { time, running, start, pause, reset };
}

type TimerType = {
  time: number;
  running: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

const initialContextValue = {
  time: 0,
  running: false,
  start: () => null,
  pause: () => null,
  reset: () => null
};

const TimerContext = createContext<TimerType>(initialContextValue);

type TimerProps = {
  children: JSX.Element;
};

export default function Timer({ children }: TimerProps) {
  const countdown = useTimer();
  return (
    <TimerContext.Provider value={countdown}>{children}</TimerContext.Provider>
  );
}

export function TimerDisplay() {
  const { time } = useContext(TimerContext);
  const [timerText, setTimerText] = useState("0:00:0");

  useEffect(() => {
    const minutes = Math.floor(time / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
    const milliSeconds = Math.floor((time % 1000) / 100).toString();
    setTimerText(`${minutes}:${seconds}:${milliSeconds}`);
  }, [time]);

  return (
    <Text
      fontSize="7xl"
      color="gray.600"
      sx={{
        fontVariantNumeric: "tabular-nums"
      }}
    >
      {timerText}
    </Text>
  );
}

export function TimerControls() {
  const { time, start, pause, reset, running } = useContext(TimerContext);
  return (
    <HStack>
      {running ? (
        <Button onClick={pause} colorScheme="red">
          Pause
        </Button>
      ) : (
        <Button onClick={start} colorScheme="green">
          Start
        </Button>
      )}
      {(time !== 0 || running) && <Button onClick={reset}>Reset</Button>}
    </HStack>
  );
}
