import hero from "@/assets/kids-running-park.jpg";

const Hero = () => {
  return (
    <div>
      <img
        src={hero}
        alt="kids-running-park"
        className="w-full max-h-[600px] object-cover"
      />
    </div>
  );
};

export default Hero;
