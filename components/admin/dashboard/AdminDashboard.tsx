import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetTotalUser } from "@/utils/firebase";
import { useGetStores } from "@/hooks/useGetStores";

ChartJS.register(ArcElement, Tooltip, Legend);

const unmannedCafeList = ["만월경", "데이롱", "커피에반하다", "카페일분", "프리헷", "터치카페", "나우커피", "기타"];

const AdminDashboard = () => {
  const { stores } = useGetStores();
  const unmanned = stores?.filter(store => store.type === "무인").length;
  const general = stores?.filter(store => store.type === "일반").length;
  const [userLength, setUserLength] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await GetTotalUser();
      setUserLength(users ?? 0);
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

  const cafes = unmannedCafeList.map(cafe => {
    return stores?.filter(store => store.name.includes(cafe)).length;
  });

  const unmannedData = {
    labels: unmannedCafeList,
    datasets: [
      {
        data: cafes,
        backgroundColor: ["#4bc0c0", "#36a2eb"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };
  const generalData = {
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

  return (
    <section className="flex flex-col h-main_section">
      <div className="flex">
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
      <div>
        <h1>사용자 수</h1>
        <h2>{userLength} 명</h2>
      </div>
    </section>
  );
};
export default AdminDashboard;
