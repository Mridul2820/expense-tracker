"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
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
      await account.create(ID.unique(), email, password, name);
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
    <section className="container u-flex u-main-center u-cross-center u-full-screen-height">
      <div className="u-max-width-350	u-width-full-line u-padding-8">
        <h1 className="heading-level-1 font-bold">Sign Up</h1>
        <p className="body-text-1 u-bold u-padding-block-16">
          Already have an account?{" "}
          <Link href="/login" className="u-cursor-pointer u-underline">
            Login
          </Link>
        </p>
        <form onSubmit={signup}>
          <div>
            <label className="label">Name</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Name"
                id="name"
                type="text"
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Email"
                id="email"
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
