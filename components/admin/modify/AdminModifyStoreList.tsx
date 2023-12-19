"use client";
import React, { useState } from "react";
import { category } from "@/constants/admin";
import CheckBox from "../upload/CheckBox";
import { IReportInfo, IStoreInfo } from "@/types/firebase";
import { useReportStore } from "@/store/reportStore";

const InputGroup = ({ label }: { label: string }) => (
  <div className="flex">
    <h1 className="w-16 text-center">{label}</h1>
    <input type="text" className="input-admin w-[340px]" />
  </div>
);

const AdminModifyStoreList = ({
  dataIndex,
  clickIndex,
  storeData,
}: {
  dataIndex: string;
  clickIndex: string;
  storeData: IStoreInfo;
}) => {
  const { report, resetReport } = useReportStore();
  const [reportData, setReportData] = useState<IReportInfo>(report);

  //수정 버튼
  const handleClickModify = () => {
    if (confirm("수정하시겠습니까?")) alert("ok");
  };
  //검색 버튼
  const handleClickAddressSearch = () => {};

  return (
    <>
      <div className="w-full grid grid-cols-[40px_10px_minmax(300px,_2fr)_30px_minmax(450px,_3fr)_10px_90px] border p-2 my-2  rounded-sm ">
        <h1>{storeData.type}</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>
        <h1>{storeData.name}</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>

        <h1>{storeData.address}</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>
        <h1>{storeData.date}</h1>
      </div>
      <div
        id="storeListDetail"
        className={`w-full cursor-default border  rounded-b-sm duration-300 ${
          dataIndex === clickIndex ? "h-full" : "h-0 hidden"
        }`}
      >
        <div>
          <div className=" h-48 m-5  border rounded-lg">image</div>
        </div>
        <div className="grid grid-cols-2 mx-3 gap-2">
          {Object.entries(category).map(([key, value]) => (
            <div
              key={key}
              className={`grid grid-cols-[80px_minmax(300px,_1fr)] h-10 items-center ${
                key === "address" && "col-span-2 grid-cols-[80px_minmax(300px,_1fr)_40px]"
              }`}
            >
              <p className=" text-center">{value.title}</p>
              {value.property && (
                <CheckBox stateKey={key} property={value.property} setState={setReportData} state={reportData} />
              )}
              {value.placeholder && (
                <>
                  <input type="text" className="border" />
                  {key === "address" && (
                    <button className="w-[40px] h-[24px] text-sm bg-[#3D7FFF] rounded-[20px] text-white ml-1">
                      검색
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="text-right mr-10 my-3">
          <button className=" w-[60px] h-[32px] bg-[#3D7FFF] rounded-[20px] text-white" onClick={handleClickModify}>
            수정
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminModifyStoreList;

// <div
// id="storeListDetail"
// className={`w-full cursor-default border  rounded-b-sm duration-300 ${
//   dataIndex === clickIndex ? "h-[500px]" : "h-0 hidden"
// }`}
// >
// <div>
//   <div className=" h-48 m-5  border rounded-lg">image</div>
// </div>
// <div className="grid grid-cols-2 mx-3">
//   <div className="flex flex-col gap-2">
//     {labels.slice(0, 2).map(label => (
//       <InputGroup key={label} label={label} />
//     ))}
//     <div className="flex">
//       <h1 className="w-16 text-center">주소</h1>
//       <input type="text" className="input-admin w-[340px]" />
//       <button
//         className="w-[40px] h-[24px] text-sm bg-[#3D7FFF] rounded-[20px] text-white ml-1"
//         onClick={handleClickAddressSearch}
//       >
//         검색
//       </button>
//     </div>
//     {labels.slice(2, 5).map(label => (
//       <InputGroup key={label} label={label} />
//     ))}
//   </div>
//   <div className="flex flex-col gap-2">
//     {labels.slice(5).map(label => (
//       <InputGroup key={label} label={label} />
//     ))}
//   </div>
// </div>
// <div className="text-right mr-10 mt-3">
//   <button className=" w-[60px] h-[32px] bg-[#3D7FFF] rounded-[20px] text-white" onClick={handleClickModify}>
//     수정
//   </button>
// </div>
// </div>
