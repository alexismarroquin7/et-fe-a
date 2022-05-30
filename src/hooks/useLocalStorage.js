import { useState } from "react"

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    
    if(typeof window === "undefined"){
      return initialValue;
    }
    
    let item;
    
    if(localStorage.getItem(key)){
      item = JSON.parse(localStorage.getItem(key))
      
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
      item = JSON.parse(localStorage.getItem(key))

    }
    
    return item;
  
  });

  const setStoredValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
    return value;
  }

  return [value, setStoredValue];
}