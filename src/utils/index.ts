import { DailyObj } from "../types";

const debounce = (cb: Function, delay: number = 200) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const setCurrentPinnedToLocalStorage = (stringifiedVal: string) => {
  window.localStorage.setItem("current_pinned", stringifiedVal);
};
const getCurrentPinnedToLocalStorage = () => {
  const data = window.localStorage.getItem("current_pinned");
  return data;
};

function formatTime(timeString: string) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function mergeArraysToObject(arrays: DailyObj) {
  const keys = Object.keys(arrays);
  const mergedArray = [];

  for (let i = 0; i < arrays[keys[0]].length; i++) {
    const obj: any = {};
    keys.forEach((key: string | number) => {
      obj[key] = arrays[key][i];
    });
    mergedArray.push(obj);
  }

  return mergedArray;
}

export {
  debounce,
  setCurrentPinnedToLocalStorage,
  getCurrentPinnedToLocalStorage,
  formatTime,
  mergeArraysToObject,
};
