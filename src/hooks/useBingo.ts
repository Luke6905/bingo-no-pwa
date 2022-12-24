import { useState } from "react";
import BingoArray, { item } from "../BingoArray";
import { useLocalStorageState } from "./useLocalStorageState";

export const useBingo= <T>(initialState:string[]):[ state: BingoArray, setState: (newBingoArray: BingoArray) => void] =>{
    const [rows, setRows] = useLocalStorageState([] as Array<Array<item>>, "bingo_card")
    const [game, setGame] = useState((rows && rows.length > 0) ? new BingoArray(rows) : new BingoArray(initialState))

    const setState = (newBingoArray: BingoArray) =>{
        setGame(newBingoArray)
        setRows(newBingoArray.rows)
    }
    return [game, setState]
}