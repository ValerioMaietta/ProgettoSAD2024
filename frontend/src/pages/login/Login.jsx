import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto bg-trasparent rounded-xl p-20 border-4 border-black">
      <h1 className="text-6xl font-semibold text-center text-stone-200">
        Login
        <span className="text-blue-600"> CrossChat </span>
      </h1>

      <form onSubmit={handleSubmit} className="p-4">
        <div>
          <label className="label p-2">
            <span className="text-base label-text text-white">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full input input-bordered h-10 bg-stone-300 border-2 border-black text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="pt-3">
          <label className="label">
            <span className="text-base label-text text-white">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full input input-bordered h-10 bg-stone-300 border-2 border-black text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link
          to="/signup"
          className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
        >
          Non hai ancora un account?
        </Link>

        <div className="pt-3">
          <button
            className="btn btn-block btn-sm mt-2 bg-blue-600 hover:bg-blue-800 text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner "></span>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
