import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Utils/apiServices";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [fetchError, setFetchError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setLoading(true);

      const response = await instance.post("/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);

      console.log(response)

      if (response.status === 200) {
        navigate("/boards") // CHANGE TO ACTUAL END POINT
      }
    } catch {
      setFetchError("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="w-screen h-screen px-10 flex flex-col py-20 items-center bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <h2 className="text-5xl text-white font-bold ">Login</h2>
      <div className="pt-10 pb-10">
        {fetchError && (
          <div className="p-2 bg-red-500 rounded">
            <p>{fetchError}</p>
          </div>
        )}
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <p className="text-white font-medium mb-2">Email:</p>
        <input
          name="email"
          type="email"
          className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white"
          onChange={handleChange}
        />
        <p className="text-white font-medium mb-2">Password:</p>
        <input
          name="password"
          type="password"
          autoComplete="off"
          className="w-96 h-7 p-2 mb-6 outline-none rounded-md bg-white"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-40 text-xl font-medium mt-7 bg-white h-10 self-center rounded-md"
          disabled={loading}
        >
          Login
        </button>
      </form>
      <button
        className="text-white text-sm mt-10"
        onClick={() => navigate("/register")}
      >
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
