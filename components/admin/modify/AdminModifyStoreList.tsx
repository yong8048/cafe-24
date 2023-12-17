import React from "react";

const AdminModifyStoreList = ({ dataIndex, clickIndex }: { dataIndex: number; clickIndex: number }) => {
  return (
    <>
      <div className="w-full grid grid-cols-[40px_10px_minmax(300px,_2fr)_30px_minmax(450px,_3fr)_10px_90px] border p-2 my-2  rounded-sm ">
        <h1>무인</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>
        <h1>커피에 반하다 수원센트럴아이파크자이점</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>

        <h1>경기도 부천시 원미구 역곡로 19번길 26</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>
        <h1>2023-10-23</h1>
      </div>
      <div
        id="storeListDetail"
        className={`w-full  border border-t-0 rounded-b-sm -mt-2 duration-300 ${
          dataIndex === clickIndex ? "h-[500px]" : "h-0"
        }`}
      ></div>
    </>
  );
};

export default AdminModifyStoreList;
