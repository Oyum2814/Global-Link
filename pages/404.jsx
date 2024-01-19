import Navbar from "@/components/Navbar";
export default function Custom404() {
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
        <h1 className="text-white font-mono text-xl md:text-5xl font-[700]">
          Error 404 : Page not Found!
        </h1>
      </div>
    </>
  );
}
