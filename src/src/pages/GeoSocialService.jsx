import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const GeoSocialService = () => {
  return (
    <>
      <InnerPageHero
        subtitle="Clean Energy Solutions"
        title={
          <>
            Vanisystem (P) Ltd.
            <br />
            Hydrogen Gas Stove
          </>
        }
        buttonText="Enquire Now"
      />

      <section className="py-5">
        <div className="container">

          {/* SECTION 1 - Introduction */}
          <div className="row align-items-start g-4 mb-5">
            <div className="col-lg-9 col-md-8 col-12">
              <h2 className="fw-bold mb-4">Hydrogen Gas Stove</h2>

              <p className="text-muted lh-lg">
                Vanisystem (P) Ltd. proudly manufactures advanced <strong>Hydrogen Gas Stoves</strong> – 
                an innovative, eco-friendly and highly efficient cooking solution for the modern kitchen.
                <br /><br />
                Our Hydrogen Gas Stove runs on pure hydrogen gas produced through electrolysis of water. 
                It offers a completely clean cooking experience with zero carbon emissions, making it 
                one of the most environmentally friendly cooking appliances available today.
                <br /><br />
                Designed with safety, efficiency and durability in mind, our Hydrogen Gas Stoves deliver 
                powerful and consistent flames while consuming minimal electricity and water. 
                This revolutionary technology eliminates the need for LPG cylinders and traditional fossil fuels.
                <br /><br />
                Ideal for homes, hotels, restaurants, hostels and commercial kitchens, the Hydrogen Gas Stove 
                from Vanisystem represents the future of clean cooking technology in India.
              </p>
            </div>

            <div className="col-lg-3 col-md-4 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/hydrogen-stove.jpg"
                  alt="Hydrogen Gas Stove"
                  className="img-fluid w-100"
                  style={{
                    minHeight: "280px",
                    maxHeight: "420px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=Hydrogen+Gas+Stove";
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 - Features & Benefits */}
          <div className="row align-items-start g-4">
            <div className="col-lg-9 col-md-8 col-12">
              <h2 className="fw-bold mb-4">Key Features & Benefits</h2>

              <p className="text-muted lh-lg">
                Our Hydrogen Gas Stove is engineered with cutting-edge technology to provide superior 
                performance, safety and long-term reliability.
              </p>

              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item px-0">
                  <strong>Zero Carbon Emission</strong> – Completely eco-friendly cooking with only water vapor as by-product
                </li>
                <li className="list-group-item px-0">
                  <strong>No LPG Required</strong> – Generates hydrogen on demand from water and electricity
                </li>
                <li className="list-group-item px-0">
                  <strong>High Thermal Efficiency</strong> – Powerful blue flame for fast and uniform cooking
                </li>
                <li className="list-group-item px-0">
                  <strong>Safe Operation</strong> – Multiple safety sensors and automatic shut-off system
                </li>
                <li className="list-group-item px-0">
                  <strong>Low Running Cost</strong> – Highly economical compared to traditional LPG
                </li>
                <li className="list-group-item px-0">
                  <strong>Easy Installation</strong> – Simple setup with standard water and power connection
                </li>
                <li className="list-group-item px-0">
                  <strong>Durable Build</strong> – High-quality stainless steel body and long-lasting components
                </li>
                <li className="list-group-item px-0">
                  <strong>Suitable for All Kitchens</strong> – Perfect for homes, hotels, restaurants and commercial use
                </li>
              </ul>

              <h5 className="fw-bold mt-4 mb-3">Why Choose Vanisystem Hydrogen Gas Stove?</h5>

              <p className="text-muted lh-lg">
                At Vanisystem, we are committed to bringing sustainable and future-ready technology to Indian households 
                and businesses. Our Hydrogen Gas Stove is manufactured with strict quality control standards and 
                is designed to reduce dependency on fossil fuels while providing excellent cooking performance.
                <br /><br />
                Experience the next generation of clean cooking with Vanisystem’s Hydrogen Gas Stove – 
                safe, economical, and environmentally responsible.
              </p>
            </div>

            <div className="col-lg-3 col-md-4 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/hydrogen-stove-2.jpg"
                  alt="Hydrogen Gas Stove Features"
                  className="img-fluid w-100"
                  style={{
                    minHeight: "280px",
                    maxHeight: "420px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=Hydrogen+Stove+Features";
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default GeoSocialService;
