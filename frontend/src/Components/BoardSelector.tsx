import { useBoards } from "../Hooks/useBoards";

const BoardSelector: React.FC = ({ onSelectBoard }) => {
  const { boards } = useBoards();
  return (
    <div className="">
      <p className="text-lg text-white font-medium mb-2">Select board:</p>
      <select className="w-80 p-2 mb-6 text-sm outline-none rounded-md bg-white" onChange={(e) => onSelectBoard(e.target.value)}>
        <option value="">Select a Board</option>
        {boards?.map((board) => (
          <option key={board.id} value={board.id}>
            {board.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardSelector;
