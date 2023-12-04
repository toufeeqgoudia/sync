import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createBoard,
  fetchBoards,
  addMembership,
} from "../../Utils/apiServices";
import { useAuth } from "../../Hooks/useAuth";

interface FormData {
  title: string;
  description: string;
}

interface Board {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user: number;
}

const CreateBoard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createBoard({
        title: formData.title,
        description: formData.description,
        user: user?.id,
      });

      const getAllBoards: Board[] = await fetchBoards();

      const board = getAllBoards.filter(
        (b) =>
          b.title === formData.title && b.description === formData.description
      )[0];

      await addMembership({ user: user?.id, board: board?.id });

      navigate("/boards");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 pr-10 flex flex-col bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-full flex justify-between items-center">
        <h4 className="text-lg font-semibold text-white">Create Board</h4>
      </div>

      <form className="w-96 flex flex-col pt-16" onSubmit={handleSubmit}>
        <p className="text-white mb-2">Title</p>
        <input
          name="title"
          className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white"
          onChange={handleChange}
        />
        <p className="text-white mb-2">Description</p>
        <textarea
          name="description"
          className="w-96 h-20 p-2 mb-6 outline-none rounded-md bg-white"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-20 p-2 text-white font-medium rounded-md bg-slate-400 self-end"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBoard;
