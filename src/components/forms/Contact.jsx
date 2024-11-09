"use client";

import { ContactEnqSchema } from "@/utils/schema/ContactS";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GreenButton from "../common/greenButton";
import { bkend } from "@/axios/axiosInstance";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(ContactEnqSchema),
    defaultValues: {
      name: "",
      mail: "",
      phno: null,
      message: "",
    },
  });

  async function SendConEnq(data) {
    console.log(data);
    const f = await bkend.post("/contact", data);
    console.log("🚀 ~ SendConEnq ~ f:", f.data);
  }

  function Submit(formD) {
    delete formD.save;
    console.log("🚀 ~ Submit ~ formD:", formD);
    SendConEnq(formD);
  }

  return (
    <main className="md:!px-[5rem] evenPadding">
      <section className="evenPadding bg-[#D6EFD8] rounded-xl">
        <h1 className="text-center text-[2.1rem] mb-[2rem]">Get In Touch</h1>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="flex flex-col gap-3 md:gap-3 md:flex-row justify-between">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="inpContact !w-full"
            />
            <input
              {...register("mail")}
              type="email"
              placeholder="Email"
              className="inpContact !w-full"
            />
            <input
              {...register("phno")}
              type="number"
              placeholder="Phone"
              className="inpContact !w-full"
            />
          </div>
          <div className="mt-[2rem]">
            <textarea
              {...register("message")}
              type="text"
              placeholder="Message"
              className="inpContact !w-full h-[15rem] resize-none"
            />
            <footer className="flex items-center gap-3 md:h-6">
              <input
                type="checkbox"
                {...register("save")}
                className="border-[1px] border-[#605D64] h-5 w-5 rounded-md"
              />
              <label className="text-[#605D64] text-[12px] md:text-[16px]">
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </footer>
            <p className="text-Red text-center">
              {errors?.name?.message ||
                errors?.mail?.message ||
                errors?.phno?.message ||
                errors?.message?.message}
            </p>
            <div className="flex justify-center mt-5">
              <GreenButton text="Send Message" />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
