"use client";

import { useState } from "react";
import ImageC from "../utils/ImageC";
import { FiMinus, FiPlus } from "react-icons/fi";
export default function FAQ() {
  const [values, setValues] = useState([
    {
      show: false,
      name: "What materials are the Biscuit Tea Cups made from?",
      content:
        "The Biscuit Tea Cups are made from edible, high-quality ingredients like wheat flour, sugar, and natural flavors. Crafted to hold hot beverages safely, these eco-friendly tea cups provide a unique sustainable solution to reduce waste. Enjoy both the flavor and eco-conscious design as you savor your tea or coffee, making these edible tea cups perfect for a zero-waste lifestyle!",
    },
    {
      show: false,
      name: "Can I buy a matching set of cups?",
      content:
        "Yes, you can purchase a matching set of Biscuit Tea Cups! We offer sets in various quantities, allowing you to choose a complete set of eco-friendly, edible cups that best suits your needs. These sustainable, matching tea cup sets are perfect for gatherings, parties, or gifting, providing both style and an enjoyable, zero-waste experience.",
    },

    {
      show: false,
      name: "Are the paper bags available in different sizes?",
      content:
        "Yes, our paper bags are available in multiple sizes to meet your specific needs. Designed with durability and eco-friendliness in mind, these bags are perfect for everything from small items to larger purchases. Choose the ideal size of eco-friendly paper bags for shopping, gifts, or retail use, making sustainable choices easy and versatile.",
    },
    {
      show: false,
      name: "What fabric is used for the napkins?",
      content:
        "The napkins are made from premium, eco-friendly fabrics like 100% organic cotton or linen. These sustainable, high-quality materials are soft, durable, and designed to withstand frequent use while being gentle on the environment. Perfect for both everyday dining and special occasions, our organic cotton and linen napkins offer a stylish, sustainable addition to your table setting.",
    },
  ]);

  function toggle(index) {
    setValues((prevValues) =>
      prevValues.map((item, i) => ({
        ...item,
        show: i === index ? !item.show : false,
      }))
    );
  }

  return (
    <main className="FColC my-7">
      <h1 className="font-pMedium text-[2rem]">Eltribo FAQ</h1>
      {values.map((item, index) => (
        <div
          className="w-[90%] md:w-[80%] py-7 md:py-10 border-b-2"
          key={index}
        >
          <header
            className={`flex items-center justify-between  ${
              values.length - 1 > index && !item.show ? "border-b-" : ""
            }`}
          >
            <h1 className="text-[18px] md:text-[1.5rem] w-[85%] md:w-full ">
              {item.name}
            </h1>
            <span onClick={() => toggle(index)} className="cursor-pointer">
              {item.show ? (
                <FiMinus className="  border border-black p-2 md:p-3 text-[28px] md:text-[42px]    rounded-full" />
              ) : (
                <FiPlus className="md:text-[42px] p-2 md:p-3 text-[28px] bg-black text-white rounded-full" />
              )}
            </span>
          </header>
          <main
            className={`  ${
              item.show ? "flex pt-2 w-10/12 text-gray-400" : "hidden"
            } w-[100%] md:w-[80%] `}
          >
            <p className="md:text-[18px]">{item.content}</p>
          </main>
        </div>
      ))}
    </main>
  );
}
