import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen px-10 flex flex-col justify-around items-center bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <h1 className="text-6xl text-white font-bold">Welcome to Sync ツ</h1>

      <div>
        <p className="text-lg text-center text-white">
          Sync is a task management system designed to help teams organise and
          track their work in a collaborative environment.
        </p>
        <p className="text-lg text-center text-white">
          The application is built using the Django framework for the backend
          and utilizes Django Rest Framework to create a RESTful API.
        </p>
      </div>

      <button
        className="w-40 h-16 text-lg text-white rounded-md bg-sky-400"
        onClick={() => navigate("/register")}
      >
        Get Started
      </button>

      <button className="text-white" onClick={() => navigate("/login")}>
        Already have an account? Log in here
      </button>
    </div>
  );
};

export default Home;
