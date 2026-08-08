// src/pages/Milestones.jsx

import React, { useState } from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const milestones = [
  {
    title: "MOU with ECIL Hyderabad www.ecil.in",
    image: "https://vanisystems.in/images/resources/omu.jpg",
    content: (
      <p>
        Vani Systems (P) Ltd entered into an Memorandum of Understanding on 22nd
        Day of April 2003 between Electronics Corporation of India (A Govt of
        India Undertaking) Under the Ministry of Atomic Energy through its Vice
        President ECIL-ECIT Sh V K Malik and Sh Rajiv Shukla Managing Director.
        Work under the Guidance of Branch Manager Sh Rajiv Mathur and Sh R N
        Mall started for the First time in the region of UP for providing
        Courses in Computer Education. Govt of Uttar Pradesh then incorporated
        ECIL vide an amendment GO 174/78-2-2004-25IT/2001 Dated 17th February
        2004 into the prevailing GO 08/78-IT-2-2001 Dated 12th September 2001
        regarding the Computer Hardware policy of IT department. Training of
        Officers and Staff of the UP Seed Corporation Ltd (A Govt of UP
        Undertaking) was successfully executed under the guidance of ECIL
        through Vani Systems (P) Ltd in supervision of Sh Amit Srivastav (MCA).
        Certificates of successful training were distributed by the Vice
        President ECIL-ECIT at Lucknow.
      </p>
    ),
  },

  {
    title:
      "Agreement with Ekikrat Janjati Sahkari Vikas Sangh Ltd (A Govt of UP Undertaking)",
    image: "https://vanisystems.in/images/resources/janj.jpg",
    content: (
      <p>
        Rajiv Shukla Managing Director of the Company has entered into an
        agreement with the Secretary Ekikrat Janjati Sahkari Vikas Sangh Ltd (A
        Govt of UP Undertaking) on 24th December 2004. Company has helped the
        Sangh to overcome the legal battle for the transfer of the Head office
        of the Sangh from Dehradun to 5th Floor Sahkarita Bhawan Lucknow and has
        been since then working with Sangh for the upliftment of the Janjati
        community in Uttar Pradesh. Company has provided jobs to Janjati
        Community through the outsourcing to Government Departments. Company is
        also working in the Ashram Padti Vidyalaya governed by the Samaj Kalyan
        Department of Uttar Pradesh.
      </p>
    ),
  },

  {
    title: "Automatic Bus Washing Plants (ABWP)",
    image: "https://vanisystems.in/images/resources/2.jpg",
    content: (
      <>
        <p>
          Company has erected and installed world class Automatic Bus washing
          Plants at various Locations of Uttar Pradesh at the Work Shops and Bus
          Depots of Uttar Pradesh Road Transport Corporation under an agreement
          for 5 years with UPSRTC. These machines are of International
          Specifications and for the first time in Uttar Pradesh the Government
          buses are being washed and cleaned with machines. Company provides
          these services 24 hours a day, 365 days a year round the clock.
          Cleaned and washed buses are now becoming the first choice of the
          passengers and travelers. There is a significant increase in the road
          transportation after this service was started in Uttar Pradesh.
        </p>

        <p>Machines are running successfully at:</p>

        <ul className="list-group list-group-flush">
          <li className="list-group-item px-0">New Bus Depot UPSRTC Etawah</li>

          <li className="list-group-item px-0">
            Bhaisali Delhi By Pass Road Bus Depot UPSRTC Meerut
          </li>

          <li className="list-group-item px-0">
            Near Railway Station UPSRTC Work Shop Gorakhpur
          </li>

          <li className="list-group-item px-0">
            Near Pacific Mall, Udhyogik Vikas Kendra, Sahibabad Depot UPSRTC
            Ghaziabad
          </li>

          <li className="list-group-item px-0">
            Bodh Vihar Karyashala UPSRTC Sut Mill Chauraha, Aligarh
          </li>

          <li className="list-group-item px-0">
            Edgah Depot Work Shop UPSRTC, Agra
          </li>

          <li className="list-group-item px-0">
            Leader Road UPSRTC Work Shop, Razapur, Allahabad
          </li>

          <li className="list-group-item px-0">
            Satellite Depot Work Shop UPSRTC, Bareilly Crossing Bareilly
          </li>

          <li className="list-group-item px-0">
            Pital Nagari Depot Work Shop, Moradabad
          </li>
        </ul>
      </>
    ),
  },

  {
    title: "Patna Office in 2011 (IWMP)",
    image: "https://vanisystems.in/images/resources/patanaoffice.jpg",
    content: (
      <p>
        Company had established its fully computerized office at Behind Punjab
        National Bank, Punai Chak, Patna PIN 800023, Phone no 0612-6443200. Sh
        Ranjan Kumar is heading as Branch Manager. The Integrated Water Shed
        Management Programme is run through this office all over Bihar. Company
        has successfully made run the State Level Nodal Office at Patna
        Sachivalaya Patna of IWMP and has provided well educated Experts for the
        Technical Experts post of IWMP for the various Districts of Bihar.
      </p>
    ),
  },

  {
    title: "Meerut Office in 2009",
    image: "https://vanisystems.in/images/resources/marut.jpg",
    content: (
      <p>
        Company has established the Meerut Office in the year 2009 to cater the
        services and business in the Northern Region of Uttar Pradesh at Dinesh
        Vihar Colony, Opposite Park No-2, Bagpat Road Meerut. Sh Kuldeep Singh
        is Branch Manager and is successfully administrating the Company works
        spread all over the Northern Uttar Pradesh.
      </p>
    ),
  },
];

const Milestones = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {/* PAGE HERO */}

      <InnerPageHero
        subtitle="The best company ever in India"
        title={
          <>
            Our Company
            <br />
            Milestones
          </>
        }
        buttonText="Explore Our Journey"
      />

      {/* MAIN CONTENT */}

      <main className="py-5 bg-light">
        <div className="container">
          {/* PAGE TITLE */}

          <div className="text-center mb-5">
            <span className="text-warning fw-bold text-uppercase">
              Our Journey
            </span>

            <h1 className="fw-bold mt-2">Milestones</h1>

            <p
              className="text-secondary mx-auto mt-3"
              style={{ maxWidth: "700px" }}
            >
              Explore the important milestones and achievements that have shaped
              the journey of Vani Systems (P) Ltd.
            </p>
          </div>

          {/* MILESTONE CARDS */}

          <div className="row g-4">
            {milestones.map((milestone, index) => (
              <div className="col-12" key={milestone.title}>
                <div
                  className="card border-0 overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    transition: "all 0.4s ease",
                    transform:
                      hoveredIndex === index
                        ? "translateY(-8px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredIndex === index
                        ? "0 1rem 3rem rgba(0,0,0,0.18)"
                        : "0 .125rem .25rem rgba(0,0,0,.075)",
                    borderTop:
                      hoveredIndex === index
                        ? "4px solid #f5b400"
                        : "4px solid transparent",
                  }}
                >
                  {/* TITLE */}

                  <div
                    className="card-header border-0 text-white p-0"
                    style={{
                      background: "linear-gradient(135deg, #0b1d33, #193b61)",
                    }}
                  >
                    <div className="p-3 p-md-4">
                      <h4 className="mb-0 fw-bold fs-5 fs-md-4">
                        {milestone.title}
                      </h4>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="card-body p-3 p-md-4">
                    <div className="row align-items-center g-4">
                      {/* TEXT */}

                      <div
                        className={`col-12 ${index % 2 !== 0
                            ? "col-lg-7 order-2 order-lg-1"
                            : "col-lg-7"
                          }`}
                      >
                        <div className="text-secondary lh-lg">
                          {milestone.content}
                        </div>
                      </div>

                      {/* IMAGE */}

                      <div
                        className={`col-12 ${index % 2 !== 0
                            ? "col-lg-5 order-1 order-lg-2"
                            : "col-lg-5"
                          }`}
                      >
                        <div
                          className="overflow-hidden rounded-3 shadow-sm"
                          style={{
                            backgroundColor: "#f8f9fa",
                          }}
                        >
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className="img-fluid w-100"
                            style={{
                              height: "300px",
                              objectFit: "cover",
                              transition: "all 0.5s ease",
                              transform:
                                hoveredIndex === index
                                  ? "scale(1.06)"
                                  : "scale(1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Milestones;
