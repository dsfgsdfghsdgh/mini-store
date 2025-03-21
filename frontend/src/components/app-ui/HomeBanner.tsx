import { homeBanner } from "@/assets";
import Container from "./Container";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <Container className="relative py-10 overflow-hidden">
      {/* Banner Image with Overlay */}
      <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px]">
        <img
        draggable="false"
          src={homeBanner}
          alt="Home Banner"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/30 rounded-xl" />
      </div>

      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
          Explore Our Newly Launched Product
        </h2>
        <p className="text-sm md:text-lg font-medium text-white/90 max-w-md mt-3">
          The new tech gift you&apos;ve been wishing for is right here.
        </p>

        {/* Button */}
        <LinkButton
          className="mt-5 px-6 py-3 text-sm md:text-base font-semibold bg-white text-darkText rounded-md shadow-md hover:bg-darkText hover:text-white transition-all duration-300"
        >
          Shop Now
        </LinkButton>
      </div>
    </Container>
  );
};

export default HomeBanner;
