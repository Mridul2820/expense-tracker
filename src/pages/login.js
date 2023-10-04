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
            <label class="label">Email</label>
            <div class="input-text-wrapper">
              <input
                class="input-text"
                placeholder="Email"
                id="email"
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label class="label">Password</label>
            <div class="input-text-wrapper">
              <input
                class="input-text"
                placeholder="Password"
                id="password"
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="u-padding-block-16">
            <button
              type="submit"
              disabled={!email || !password}
              className="button"
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
