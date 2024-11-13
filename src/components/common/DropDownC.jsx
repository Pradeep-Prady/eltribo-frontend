"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link'
export default function DropDownC({
  validate,
  options: { main, heading, body },
  setValue,
  items,
  headingText,
  setHeadingText,
  disp,
  setDisp,
  paddStyle
}) {
  console.log("inside", items);

  useEffect(() => {
    if (items.current.children) {
      console.log("inside use effect if");
      Object.entries(items.current.children).map((i) =>
        i.slice(1, 2).map((k) => {
          k.onclick = () => {
            setDisp(false);
            console.log("inside clicked");
            console.log("👸", "clicked");
            if (validate === "dontCheck") {
              console.log("👨‍👧‍👧", "in if");
            } else {
              console.log("👨‍👦", "in else");
              setValue("size", k.innerText);
              setHeadingText(k.innerText);
            }
          };
        })
      );
    }
    console.log(items.current.children, "itemsitemsitems");
  }, []);

  if (heading && body) {
    return (
      <main className={`${main.tw}  select-none `}>
        <div
          className={` ${heading.tw} ${paddStyle && "!px-0"} flex items-start  `}
          onClick={() => setDisp(() => !disp)}
        >
          {headingText ? headingText : heading.text}
          <IoIosArrowDown className={`${disp ? "-rotate-180" : ""}`} />
        </div>
        <ul
          className={` !w-[170px] ${disp ? "block " : "hidden"} z-30 ${
            body.tw
          }`}
          ref={items}
        >
          {Object.entries(body.items).map((i, j) =>
            validate === "dontCheck" ? (
              <li
               
                key={j}
                onClick={() => {
                  i[1]?.data ? i[1].click(i[1].data) : "";
                  setDisp(false);
                }}
                className={body.itemstw}
              >
                <Link
              href={i[1].text}>
                {i[1].text}
                </Link>
              </li>
            ) : (
              <li key={j} className={body.itemstw}>
                {i[1].text}
              </li>
            )
          )}
        </ul>
      </main>
    );
  }
}
