import MainBody from "@/components/main-body";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow">
      <Navbar />
      <MainBody />
    </main>
  );
}
