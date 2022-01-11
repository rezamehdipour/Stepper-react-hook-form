import React, { useState } from 'react'

// Initial State
let initialState = {
    // Personal
    firstName: false,
    lastName: false,
    gender: false,
    birthdate: false,

    // Identity
    continent: false,
    country: false,
    nationalCardId: false,
    nationalCardPhoto: false,

    // Contact
    phoneNumber: false,
    email: false,
    address: false,
    website: false,

    // Authentication
    username: false,
    password: false,
    favoriteColor: false
};
if (window.localStorage.getItem('data')) {
    initialState = JSON.parse(window.localStorage.getItem('data'));
}

const DataContext = React.createContext();
export function DataContextProvider({ children }) {
    const [data, setTheData] = useState(initialState);

    const setData = ([key, value]) => {
        setTheData(
            data => {
                let dataCopy = { ...data };
                dataCopy[key] = value;
                window.localStorage.setItem('data', JSON.stringify(dataCopy));
                return dataCopy;
            })
    }

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;