// import React from "react";
// import HeroSection from "../components/home/HeroSection.jsx";
// import WelcomeSection from "../components/home/WelcomeSection.jsx";
// import ServicesHeading from "../components/home/ServicesHeading.jsx";
// import ClientsSection from "../components/home/ClientsSection.jsx";
// import EventsPhotos from "../components/home/EventsPhotos.jsx";

// const Home = () => {
//   return (
//     <>
//       <HeroSection />
//       <WelcomeSection />
//       <ServicesHeading/>
//       <ClientsSection/>
//       <EventsPhotos/>
//     </>
//   );
// };

// export default Home;
import React from "react";
import HeroSection from "../components/home/HeroSection.jsx";
import WelcomeSection from "../components/home/WelcomeSection.jsx";
import ServicesHeading from "../components/home/ServicesHeading.jsx";
import ClientsSection from "../components/home/ClientsSection.jsx";
import EventsPhotos from "../components/home/EventsPhotos.jsx";
import Products from "./Products";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Products />
      <WelcomeSection />
      <ServicesHeading />
      <ClientsSection />
      <EventsPhotos />

      {/* Products Section */}
      {/* <Products /> */}
    </>
  );
};

export default Home;