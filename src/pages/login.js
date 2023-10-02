import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import toast from "react-hot-toast";

import { account } from "@/config/appwrite";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const cookie = useCookie(props.cookie);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(email, password);
      const jwt = await account.createJWT();
      const user = await account.get();
      cookie.set("jwt", jwt.jwt);
      cookie.set("userid", user.$id);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="container h-screen mx-auto flex justify-center">
      <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
        <h1 className="text-6xl font-bold">Login</h1>
        <p className="mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="cursor-pointer underline">
            Sign Up
          </Link>
        </p>
        <form onSubmit={loginUser}>
          <label className="block mt-6" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            id="email"
            className="w-full mt-1 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white text-lg border-2 border-gray-400 focus:ring-0 focus:border-gray-900 rounded-md"
            type="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mt-6" htmlFor="password">
            {" "}
            Password
          </label>
          <input
            id="password"
            className="w-full mt-1 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white text-lg border-2 border-gray-400 focus:ring-0 focus:border-gray-900 rounded-md"
            type="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={!email || !password}
              className="mx-auto mt-4 py-3 px-10 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
