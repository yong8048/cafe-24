"use client";
import { IUploadInfo } from "@/types/firebase";
import React, { ChangeEvent } from "react";

const CheckBox = ({
  stateKey,
  property,
  setState,
  state,
}: {
  stateKey: string;
  property: string[];
  setState: React.Dispatch<React.SetStateAction<IUploadInfo>>;
  state: IUploadInfo;
}) => {
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, [stateKey]: e.target.name === "first" ? property[0] : property[1] }));
  };

  return (
    <div onChange={handleClick} className="w-[400px] leading-10 flex justify-start gap-5 items-center">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="first"
          checked={state[stateKey as keyof IUploadInfo] === property[0]}
          className="w-6 h-6"
          readOnly
        />
        {property[0]}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="second"
          checked={state[stateKey as keyof IUploadInfo] === property[1]}
          className="w-6 h-6"
          readOnly
        />
        {property[1]}
      </label>
    </div>
  );
};

export default CheckBox;
