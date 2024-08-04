import SearchBar from "@/components/SearchBar";
import Hero from "@/layouts/components/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md pt-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-5xl font-bold text-totysseyOrange">
            Find your next adventure!
          </h1>
          {/* <span className="text-xl">
            Your next adventure is just a click away!
          </span> */}
          <div className="m-4">
            <SearchBar />
          </div>
        </div>
        <div className="text-6xl text-center w-full bg-gray-200 py-96">
          Home Page Content Here
        </div>
      </div>
    </div>
  );
};

export default HomePage;
