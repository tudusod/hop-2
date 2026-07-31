"use client";
import { useState } from "react";

export const StateComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const addValue = () => {
    const newValue = {
      id: Date.now(),
      value: inputValue,
      isDone: false,
    }
    setValue([...value, newValue])
  }
  console.log(value)

  const delButton = (id) => {
    const newValue = value.filter((item, index) => {
      return item.id !== id
    })
    setValue(newValue)
  }

  const doneButton = (a) => {
    const newValue = value.map((item, index) => {
      if(item.id === a){
        return{...item, isDone: !item.isDone} 
        console.log(!item.isDone)
      }
      return item
    })
    setValue(newValue)
  }

  return (
    <div>
      <input
        placeholder="hello"
        onChange={handleInputValue}
        value={inputValue}
      />
      <button onClick={addValue}>add</button>
      <div>
        {value.map((item, index) => {
          return (
          <div style={{backgroundColor: item.isDone ? "green" : "red"}} key={index}>
            <div>
              {item.value}
            </div>
              <button onClick={() => doneButton(item.id)}>done</button>
              <div key={index}>{item.value}</div>
              <button onClick={() => delButton(item.id)}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
};