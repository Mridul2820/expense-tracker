"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
import { useCookie } from "next-cookie";

import { account } from "@/config/appwrite";

const SignUp = (props) => {
  const router = useRouter();
  const cookie = useCookie(props.cookie);

  const signup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    if (!email || !password || !name) {
      toast.error("Please fill in all the fields");
      return;
    }
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
                name="name"
                type="text"
                required
              />
            </div>
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;