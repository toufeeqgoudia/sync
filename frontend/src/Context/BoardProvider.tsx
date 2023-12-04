import { useState, useEffect, createContext, ReactNode } from "react";
import { fetchBoards } from "../Utils/apiServices";
import { useAuth } from "../Hooks/useAuth";

interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  colour: string;
}

interface Boards {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user: User | undefined;
}

export interface BoardContextProps {
  boards: Boards[] | null;
}

const BoardContext = createContext<BoardContextProps>({ boards: null });

export default BoardContext;

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Boards[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardData = await fetchBoards();

        const userBoards = boardData.filter(
          (board: Boards) => board.user === user?.id
        )
      
        // const userBoards = boardData
        //   .filter(
        //     (membership: { user: { id: number | undefined; }; }) =>
        //       membership.user.id === user?.id
        //   )
        //   .map((membership: { board: unknown; }) => membership.board);

        setBoards(userBoards);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <BoardContext.Provider value={{ boards }}>
      {children}
    </BoardContext.Provider>
  );
};
