"use client"

import React, { useEffect } from "react";
import { Roboto } from "next/font/google";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useDispatch ,useSelector} from "react-redux"; // Import useDispatch to dispatch actions
import { db } from "@/axios/axiosInstance";
import {
  prodSet,
  userProdSet,
  contactSet,
  categorySet,
} from "@/redux/slice/ProductSlice"; // Import your actions

const roboto2 = Roboto({ subsets: ["latin"], weight: ["500"] });

export default function Page() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch

  const { mutate, isLoading, isSuccess, error, data } = useMutation(
    async (form) => {
      const f = await db.post(`/login`, form);
      console.log(f.data.data);

      console.log(f?.data)
      if (f.data?.statusCode === 200) {
        // After successful login, dispatch the action to set isAdmin to true
        // dispatch(prodSet({ id: f.data.data.id })); // Optional: if you want to store the user ID
        // dispatch(userProdSet(f.data.data)); // Optional: if you want to store the user product info
        // dispatch(categorySet(f.data.data.category)); // Optional: if you want to store the category

        // Set isAdmin to true
        dispatch({ type: "ProductSlice/prodSet", payload: { isAdmin: true } }); // Updating isAdmin in your state

        // Navigate to admin page
        router.push("/admin");
      }
    },
    {
      onError: (err) => {
        console.log("in error else");
        setError("form", { type: "manual", message: "Invalid Credentials" });
      },
    }
  );

  const { isAdmin } = useSelector((state) => state.prodR);
 

  function formSubmit(form) {
    console.log("inside");
    clearErrors();
    mutate(form);
  }

  const username = watch("username");
  const password = watch("password");

  useEffect(() => {
    if (errors.form) clearErrors("form");
  }, [username, password]);

  return (
    <main className="flex justify-evenly items-center p-5 h-screen bg-[#f0f2f5]">
      <div className="w-[48%] h-full rounded-[25px]">
        <article className="h-[130px]"></article>
        <section className="w-full flex justify-center items-center h-[60%] px-[30px]">
          <div className="h-full w-full bg-white rounded-[25px] text-center">
            <h1 className={`${roboto2.className} text-[25px] mt-[20px]`}>
              Sign In
            </h1>
            <p className="text-[rgb(157,153,153)]">
              Welcome back Please enter your details
            </p>
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="text-left mt-[30px] px-5 h-full"
            >
              <div>
                <label className="text-[rgb(157,153,153)]">User Name</label>{" "}
                <br />
                <input
                  type="text"
                  className="border-[1px] border-[rgb(157,153,153)] mt-1 w-full rounded-lg py-2 pl-4 placeholder:text-black"
                  placeholder="User Name"
                  {...register("username", { required: true })}
                />{" "}
                <br />
                {errors.username && (
                  <p className="text-red-500">User Name is required</p>
                )}
              </div>
              <div className="mt-5">
                <label className="text-[rgb(157,153,153)]">Password</label>{" "}
                <br />
                <input
                  type="password"
                  className="border-[1px] border-[rgb(157,153,153)] mt-1 w-full rounded-lg py-2 pl-4 placeholder:text-black"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />{" "}
                <br />
                {errors.password && (
                  <p className="text-red-500">Password is required</p>
                )}
              </div>
              {errors.form && (
                <p className="text-red-500">{errors.form.message}</p>
              )}
              <input
                type="submit"
                value="Sign In"
                className="w-full bg-[#3e71ed] text-white rounded-lg text-xl py-2 mt-8"
              />
            </form>
          </div>
        </section>
      </div>
      <div className="w-[48%] h-full bg-[#3e71ed] flex flex-col pt-[10%] items-center gap-y-10 text-white text-center rounded-[25px]">
        <h1 className={`text-[40px] ${roboto2.className}`}>
          Welcome back! <br />
          Please sign in to your <br />
          <u>Edible Cups</u> account
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          sapiente, maiores facere maxime libero repellendus eius deserunt.
          Atque, molestias et?
        </p>
      </div>
    </main>
  );
}
