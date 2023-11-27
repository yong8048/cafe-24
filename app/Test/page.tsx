"use client";
import React, { useState } from "react";
import { PostStoreInfo } from "@/utils/firebase";
import { IStoreInfo } from "@/types/firebase";

const Test = () => {
  const [storeData, setStoreData] = useState<IStoreInfo>({
    address: "",
    group: "",
    internet: "",
    latitude: "",
    longitude: "",
    name: "",
    number: "",
    parking: "",
    table: "",
    toilet: "",
    type: "",
  });
  const Post = () => {
    PostStoreInfo(storeData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div onChange={handleChange}>
      <input type="text" placeholder="주소" name="address" />
      <input type="text" placeholder="그룹" name="group" />
      <input type="text" placeholder="인터넷" name="internet" />
      <input type="text" placeholder="위도" name="latitude" />
      <input type="text" placeholder="경도" name="longitude" />
      <input type="text" placeholder="이름" name="name" />
      <input type="text" placeholder="번호" name="number" />
      <input type="text" placeholder="주차" name="parking" />
      <input type="text" placeholder="테이블" name="table" />
      <input type="text" placeholder="화장실" name="toilet" />
      <input type="text" placeholder="무인" name="type" />
      <button onClick={Post}>저장</button>
    </div>
  );
};

export default Test;
