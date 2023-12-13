const adminID = [process.env.NEXT_PUBLIC_ADMIN_1, process.env.NEXT_PUBLIC_ADMIN_2];

const category: { [key: string]: { title: string; placeholder?: string; property?: string[] } } = {
  name: { title: "지점명", placeholder: "만월경 위례점" },
  type: { title: "카페 타입", property: ["일반", "무인"] },
  address: { title: "주소", placeholder: "주소 입력" },
  latitude: { title: "위도", placeholder: "주소검색시, 자동으로 등록" },
  longitude: { title: "경도", placeholder: "주소검색시, 자동으로 등록" },
  number: { title: "전화번호", placeholder: "- 포함 입력" },
  table: { title: "테이블", placeholder: "몇 테이블 / 많음" },
  group: { title: "단체석", placeholder: "몇인석" },
  parking: { title: "주차", property: ["가능", "불가"] },
  toilet: { title: "화장실", property: ["있음", "없음"] },
  internet: { title: "인터넷", property: ["가능", "불가"] },
};

export { adminID, category };
