import { useState, useEffect, createContext, ReactNode } from "react";
import { getMemberships, fetchBoards } from "../Utils/apiServices";
import { useAuth } from "../Hooks/useAuth";

interface Boards {
  id: number;
  title: string;
  description: string;
  created_at: string;
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
        const membershipData = await getMemberships();

        const userBoards = membershipData
          .filter(
            (membership: { user: { id: number | undefined; }; }) =>
              membership.user.id === user?.id
          )
          .map((membership: { board: unknown; }) => membership.board);

        // const userBoards = boardsData.filter((board: { id: unknown; }) =>
        //   userBoardIds.includes(board.id)
        // );
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
