import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";

import { account } from "@/config/appwrite";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const cookie = useCookie(props.cookie);

  const signup = async (e) => {
    e.preventDefault();
    try {
      await account.create("unique()", email, password, name);
      await account.createEmailSession(email, password);
      const jwt = await account.createJWT();
      const user = await account.get();
      cookie.set("jwt", jwt.jwt);
      cookie.set("userid", user.$id);
      toast.success("Signed up successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="container h-screen mx-auto flex justify-center">
      <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
        <h1 className="text-6xl font-bold">Sign Up</h1>
        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/login" className="cursor-pointer underline">
            Login
          </Link>
        </p>
        <form onSubmit={signup}>
          <label className="block mt-6">Name</label>
          <input
            className="w-full mt-1 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white text-lg border-2 border-gray-400 focus:ring-0 focus:border-gray-900 rounded-md"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block mt-6"> Email</label>
          <input
            className="w-full mt-1 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white text-lg border-2 border-gray-400 focus:ring-0 focus:border-gray-900 rounded-md"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mt-6"> Password</label>
          <input
            className="w-full mt-1 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white text-lg border-2 border-gray-400 focus:ring-0 focus:border-gray-900 rounded-md"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={!name || !email || !password}
              className="mx-auto mt-4 py-3 px-10 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
