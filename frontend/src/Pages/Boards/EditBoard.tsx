import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBoard, instance } from "../../Utils/apiServices";
import { useAuth } from "../../Hooks/useAuth";

const token = localStorage.getItem("token");

interface FormData {
  title: string;
  description: string;
}

const EditBoard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });
  const location = useLocation();
  const boardId = location.state;
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBoard = async () => {
      const response = await getBoard(boardId);
      setFormData(response);
    };
    fetchBoard();
  }, [boardId]);

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

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await instance.put(
        `/api/boards/${boardId}/`,
        {
          title: formData.title,
          description: formData.description,
          user: user?.id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/boards");
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async () => {
    await instance.delete(`/api/boards/${boardId}`, {
      headers: { Authorization: `Token ${token}` },
    });
    navigate("/boards");
  };

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 pr-10 flex flex-col bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-full flex justify-between items-center">
        <h4 className="text-lg font-semibold text-white">
          Edit / Delete Board
        </h4>
        <button
          className="w-32 py-2 rounded-md text-white font-semibold bg-red-500"
          onClick={handleDelete}
        >
          Delete board
        </button>
      </div>

      <form className="w-96 flex flex-col pt-16" onSubmit={handleEdit}>
        <p className="text-white mb-2">Title</p>
        <input
          name="title"
          className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white"
          value={formData.title}
          onChange={handleChange}
        />
        <p className="text-white mb-2">Description</p>
        <textarea
          name="description"
          className="w-96 h-20 p-2 mb-6 outline-none rounded-md bg-white"
          value={formData.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-20 p-2 text-white font-medium rounded-md bg-slate-400 self-end"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditBoard;
