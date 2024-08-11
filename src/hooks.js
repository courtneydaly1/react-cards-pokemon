import React, {useState, useEffect } from "react";
import axios from 'axios';

function useFlip(initialFlipState = true){
    const [isFlipped, setIsFlipped] = useState(initialFlipState);

    const flip = () => {
        setIsFlipped(isUp => !isUp);
    };
    return [isFlipped, flip];
}

