import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <section className="text-center">
      <div className="flex flex-col items-center gap-4 my-16 leading-6 break-keep">
        <Image src="/Logo.png" width={200} height={100} alt="logo" />
        <h3 className="my-5 text-2xl font-bold">페이지가 없습니다</h3>
        <p>주소가 잘못되었거나 바뀐 것 같습니다.</p>
        <p>다시 확인해주시겠어요?</p>
      </div>
      <nav className="mx-auto flex max-w-[500px] gap-2 items-center justify-center">
        <Link
          className="h-[56px] leading-[56px] text-center rounded-md font-bold text-white bg-[#3d7fff] px-4"
          href="/"
        >
          홈 화면으로 이동
        </Link>
      </nav>
    </section>
  );
}

export default NotFound;
