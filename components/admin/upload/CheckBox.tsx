"use client";
import { IReportInfo, IStoreInfo, IUploadInfo } from "@/types/firebase";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

const hasNone = ["parking", "toilet", "internet"];

const CheckBox = ({
  stateKey,
  property,
  setState,
  state,
}: {
  stateKey: string;
  property: string[];
  setState:
    | Dispatch<SetStateAction<IUploadInfo>>
    | Dispatch<SetStateAction<IReportInfo>>
    | Dispatch<SetStateAction<IStoreInfo>>;
  state: IUploadInfo | IReportInfo | IStoreInfo;
}) => {
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const res = e.target.name === "none" ? "" : e.target.name === "first" ? property[0] : property[1];
    setState((prevState: any) => ({ ...prevState, [stateKey]: res }));
  };

  return (
    <div onChange={handleClick} className="flex items-center justify-start gap-5 pl-2 leading-10">
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
      {hasNone.includes(stateKey) && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="none"
            checked={state[stateKey as keyof IUploadInfo] === ""}
            className="w-6 h-6"
            readOnly
          />
          정보 없음
        </label>
      )}
    </div>
  );
};

export default CheckBox;
