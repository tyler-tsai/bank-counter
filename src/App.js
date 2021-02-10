import React, { useState, useEffect, useCallback } from "react";
import "antd/dist/antd.css";
import AddCounterButton from "./component/AddCounterButton";
import CounterTable from "./component/CounterTable";
import "./app.scss";
import getRandomWorkingTime from "./utils";
import useAddCounter from "./hooks";

const DEFAULT_COUNTER_NUMBER = 3;
const App = () => {
  const [nextNumber, setNextNumber] = useState(1);
  const [waitingList, setWaitingList] = useState([]);
  const [counterInfo, setCounterInfo] = useState({});

  const addCounter = useAddCounter(setCounterInfo, DEFAULT_COUNTER_NUMBER);

  const handleDrawNumber = useCallback(() => {
    setWaitingList((prev) => [...prev, nextNumber]);
    setNextNumber((prev) => prev + 1);
  }, [nextNumber]);

  useEffect(() => {
    if (waitingList.length) {
      const idleCounterKeyList = Object.keys(counterInfo)
        .filter((key) => counterInfo[key].processingNumber === null)
        .sort(
          (a, b) =>
            counterInfo[a].processed.length - counterInfo[b].processed.length
        );
      // we can not mistreat staff who always work with high performance
      // let's distribute work fairly by sorting

      if (idleCounterKeyList.length) {
        for (const key of idleCounterKeyList) {
          const processingNumber = waitingList.shift();
          if (!processingNumber) break;
          counterInfo[key] = {
            ...counterInfo[key],
            processingNumber,
          };
          setTimeout(() => {
            setCounterInfo((prev) => ({
              ...prev,
              [key]: {
                processingNumber: null,
                processed: [...prev[key].processed, processingNumber],
              },
            }));
          }, getRandomWorkingTime() * 1000);
        }
        setWaitingList([...waitingList]);
        // override by ...prev make sure getting latest counterInfo
        setCounterInfo((prev) => ({ ...counterInfo, ...prev }));
      }
    }
  }, [waitingList, counterInfo]);

  return (
    <>
      <AddCounterButton handleClick={addCounter} />
      <CounterTable
        counterInfo={counterInfo}
        waitingList={waitingList}
        handleDrawNumber={handleDrawNumber}
        nextNumber={nextNumber}
      />
    </>
  );
};
export default App;
