import { useNavigate } from "react-router-dom";
import { useBoards } from "../../Hooks/useBoards";

const Boards: React.FC = () => {
  const navigate = useNavigate();
  const { boards } = useBoards();

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
    navigate("/edit-board", { state: boardId });
  };

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 pr-10 bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div
        className="w-40 h-16 rounded flex items-center justify-center bg-slate-200 cursor-pointer"
        onClick={() => navigate("/create-board")}
      >
        <p>Create new board</p>
      </div>
      <div className="flex items-start justify-between flex-wrap">
      {boards?.map((board) => (
        <div
          key={board.id}
          className="w-52 h-24 p-2 rounded bg-white cursor-pointer mt-10"
          onClick={() => handleClickBoard(board.id)}
        >
          <p className="text-base font-medium">{board.title}</p>
          <p className="text-xs">{formatPostDate(board.created_at)}</p>
          <p className="text-sm">{board.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Boards;
