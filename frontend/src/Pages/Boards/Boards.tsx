import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { getMemberships, fetchBoards } from "../../Utils/apiServices";

interface Membership {
  id: number;
  board: number;
  user: number;
}

interface Board {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Boards: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const navigate = useNavigate()
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membershipData = await getMemberships();
        setMemberships(membershipData);

        const boardsData = await fetchBoards();
        setBoards(boardsData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const userBoardIds = memberships
    .filter((membership) => membership.user === user?.id)
    .map((membership) => membership.board);

  const userBoards = boards.filter((board) => userBoardIds.includes(board.id));

  const formatPostDate = (dateString: string) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    } as const;

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
    return formattedDate.replace(",", "");
  };

  const handleClickBoard = (boardId: number) => {
    navigate('/edit-board', {state: boardId})
  }

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 flex flex-wrap bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-40 h-16 rounded flex items-center justify-center bg-slate-200 cursor-pointer" onClick={() => navigate('/create-board')}>
        <p>Create new board</p>
      </div>

      {userBoards.map((board) => (
        <div key={board.id} className="w-48 h-24 p-2 ml-10 rounded bg-white cursor-pointer" onClick={() => handleClickBoard(board.id)}>
          <p className="text-base font-medium">{board.title}</p>
          <p className="text-xs">{formatPostDate(board.created_at)}</p>
          <p className="text-sm">{board.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Boards;
