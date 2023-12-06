"use client";
import { IUploadInfo } from "@/types/firebase";
import React, { ChangeEvent, useState } from "react";

const CheckBox = ({
  stateKey,
  property,
  setState,
}: {
  stateKey: string;
  property: string[];
  setState: React.Dispatch<React.SetStateAction<IUploadInfo>>;
}) => {
  const [checked, setChecked] = useState("");

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.name);
    setState(prevState => ({ ...prevState, [stateKey]: e.target.name === "first" ? property[0] : property[1] }));
  };

  return (
    <div onChange={handleClick} className="w-[400px] leading-10 flex justify-start gap-5 items-center">
      <label className="flex items-center gap-2">
        <input type="checkbox" name="first" checked={checked === "first"} className="w-6 h-6" readOnly />
        {property[0]}
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="second" checked={checked === "second"} className="w-6 h-6" readOnly />
        {property[1]}
      </label>
    </div>
  );
};

export default CheckBox;
