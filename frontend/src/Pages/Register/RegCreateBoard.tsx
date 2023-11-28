import { ChangeEvent, FormEvent, useState } from "react"
import { instance } from "../../Utils/apiServices";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface FormData {
  title: string;
  description: string;
}

const RegCreateBoard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ title: '', description: ''})
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
      const response = await instance.post("/api/boards/" , {
        title: formData.title,
        description: formData.description,
      }, { headers: {Authorization: `Token ${token}`}})

      console.log('res: ', response)
      navigate("/register/create-list")
    } catch {
      console.log('Error: ')
    }
  }

  return (
    <div className="max-w-screen min-h-screen px-10 flex flex-col pt-20 items-center bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <h2 className="text-6xl text-white font-bold">Welcome to Sync ツ</h2>

      <div className="w-96 h-full mt-24">
        <p className="text-white text-lg font-semibold">Create a board</p>
        <p className="text-white">
          A board is a container for a specific project. All tasks for a project
          will be created in this board.
        </p>
        <form className="w-full h-full mt-5" onSubmit={handleSubmit}>
          <p className="text-white mb-2">What's your board name?</p>
          <input 
            name="title"
            className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white"
            onChange={handleChange}
          />
          <p className="text-white mb-2">What's your board description?</p>
          <textarea
            name="description"
            className="w-96 h-20 p-2 mb-6 outline-none rounded-md bg-white"
            onChange={handleChange} 
          />
          <div className="flex items-center absolute right-20 bottom-10">
            <button type="submit" className="text-white font-bold">NEXT</button>
            <FaArrowRight className="text-white font-bold ml-2" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegCreateBoard;
