import React, { useState } from 'react';

// Initial State
let initialState = 1;

const StepContext = React.createContext();
export function StepContextProvider({ children }) {
    const [step, setTheStep] = useState(initialState);

    const setStep = (number) => {
        setTheStep(number);
    }

    return (
        <StepContext.Provider value={{ step, setStep }}>
            {children}
        </StepContext.Provider>
    )
}

export default StepContext;