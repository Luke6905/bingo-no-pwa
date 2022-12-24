import { useEffect, useState } from "react";

export const useLocalStorageState= <T>(initialState:T, localStorageID:string):[T, React.Dispatch<React.SetStateAction<T>>] =>{
    let item = localStorage.getItem(localStorageID);

    if(item === null) localStorage.setItem(localStorageID, JSON.stringify(initialState));


    const [state, setState] = useState(item !== null ?  JSON.parse(item) as T : initialState)

    const saveLocal = ()=>{
        localStorage.setItem(localStorageID, JSON.stringify(state));

    }

   useEffect(() => {
    saveLocal()

   }, [state])
   


    return [state, setState]
}