import React, {useState, useEffect } from "react";
import axios from 'axios';

function useFlip(initialFlipState = true){
    const [isFlipped, setIsFlipped] = useState(initialFlipState);

    const flip = () => {
        setIsFlipped(isUp => !isUp);
    };
    return [isFlipped, flip];
}

function useAxios(key, baseURL){
    const [response, setResponse] = useLocalStorage(key);

    const addResData = async (formatter = data => data, restOfURL = "") =>{
        const response = await axios.get(`${baseURL}${restOfURL}`);
        setResponse(data => [...data, formatter(response.data)]);
    };
    const clearResp = () => {
        setResponse([]);    
    };

    return [response, addResData, clearResp]
}

function useLocalStorage(key, initialValue= []){
    if(localStorage.getItem(key)){
        initialValue = JSON.parse(localStorage.getItem(key));
    };
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue]);
}

export default useLocalStorage;

export { useAxios, useFlip, useLocalStorage };

