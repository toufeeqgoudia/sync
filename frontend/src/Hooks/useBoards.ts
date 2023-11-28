import { useContext } from "react";
import BoardContext, { BoardContextProps } from "../Context/BoardProvider";

export const useBoards = (): BoardContextProps => {
    return useContext(BoardContext)
}