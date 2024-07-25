const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-totysseyOrange">
          Adventures begin here!
        </h1>
        <span className="text-xl">
          Your next adventure is just a click away!
        </span>
      </div>
      <div className="text-6xl text-center w-full bg-gray-200 py-96">
        Home Page Content Here
      </div>
    </div>
  );
};

export default HomePage;
