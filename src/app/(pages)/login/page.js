"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCookie } from "next-cookie";

import { account } from "@/config/appwrite";

const Login = (props) => {
  const router = useRouter();
  const cookie = useCookie(props.cookie);

  const loginUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
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
    <section className="container u-flex u-main-center u-cross-center u-full-screen-height">
      <div className="u-max-width-350	u-width-full-line u-padding-8">
        <h1 className="heading-level-1 font-bold">Login</h1>
        <p className="body-text-1 u-bold u-padding-block-16">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="u-cursor-pointer u-underline">
            Sign Up
          </Link>
        </p>
        <form onSubmit={loginUser}>
          <div>
            <label className="label">Email</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Email"
                name="email"
                type="email"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Password"
                name="password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="u-padding-block-16">
            <button type="submit" className="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
