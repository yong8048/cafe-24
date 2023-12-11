import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetReportSize, GetTotalUser } from "@/utils/firebase";
import { useGetStores } from "@/hooks/useGetStores";
import { useReportStore } from "@/store/reportStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const unmannedCafeList = ["만월경", "데이롱", "커피에반하다", "카페일분", "프리헷", "터치카페", "나우커피"];
const generalCafeList = ["The november", "탐앤탐스"];

const AdminDashboard = () => {
  const { stores } = useGetStores();
  const unmanned = stores?.filter(store => store.type === "무인").length;
  const general = stores?.filter(store => store.type === "일반").length;
  const [userLength, setUserLength] = useState<number>(0);
  const [reportLength, setReportLength] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await GetTotalUser();
      setUserLength(users ?? 0);
      const reports = await GetReportSize();
      setReportLength(reports ?? 0);
    };
    fetchUsers();
  }, []);

  const totalData = {
    labels: ["무인카페", "일반카페"],
    datasets: [
      {
        data: [unmanned, general],
        backgroundColor: ["#4bc0c0", "#36a2eb"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const unmannedcafes = unmannedCafeList.map((cafe, index) => {
    return stores?.filter(store => store.name.includes(cafe)).length;
  });

  console.log(unmannedcafes);

  const unmannedData = {
    labels: [...unmannedCafeList, "기타"],
    datasets: [
      {
        data: [...unmannedcafes, calEtcCafes(unmanned, unmannedcafes)],
        backgroundColor: ["#4bc0c0", "#36a2eb"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const generalCafes = generalCafeList.map(cafe => {
    return stores?.filter(store => store.name.includes(cafe)).length;
  });
  const generalData = {
    labels: generalCafeList,
    datasets: [
      {
        data: generalCafes,
        backgroundColor: ["#4bc0c0", "#36a2eb"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="flex w-full h-main_section justify-center pt-14">
      <div className="flex h-1/2">
        <div>
          <div className="text-center">
            <h1>총 카페 개수</h1>
            <h2 className="font-bold text-3xl">{stores?.length}개</h2>
            <div className="w-80 h-80">
              <Doughnut data={totalData} />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="text-center">
            <h1>무인 카페 개수</h1>
            <h2 className="font-bold text-3xl">{unmanned}개</h2>
            <div className="w-80 h-80">
              <Doughnut data={unmannedData} />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="text-center">
            <h1>일반 카페 개수</h1>
            <h2 className="font-bold text-3xl">{general}개</h2>
            <div className="w-80 h-80">
              <Doughnut data={generalData} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[300px] h-1/2 flex flex-col gap-5 mt-20 ml-10">
        <div className="flex flex-col gap-2">
          <h1 className="border-b border-gray-300">로그인 사용자</h1>
          <h2 className="font-bold ml-2">{userLength} 명</h2>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="border-b border-gray-300">현재 제보 리스트</h1>
          <h2 className="font-bold ml-2">{reportLength} 개</h2>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="border-b border-gray-300">총 조회수</h1>
          <h2 className="font-bold ml-2">{userLength} 회</h2>
        </div>
      </div>
    </section>
  );
};
export default AdminDashboard;

const calEtcCafes = (_allCafes: number | undefined, _array: (number | undefined)[]): number => {
  const allCafes = _allCafes as number;
  const array = _array as number[];
  const res = array.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  return allCafes - res;
};
