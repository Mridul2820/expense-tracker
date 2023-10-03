import React from "react";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = (props) => {
  const cookie = useCookie(props.cookie);
  const router = useRouter();

  return (
    <div className="flex justify-between items-center py-5 px-8 border-b">
      <div className="w-6" />
      <div className="">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
      </div>
      <button
        className="w-6"
        onClick={() => {
          cookie.remove("jwt");
          cookie.remove("userid");
          router.push("/login");
        }}
      >
        <AiOutlineLogin className="text-2xl" />
      </button>
    </div>
  );
};

export default Navbar;
