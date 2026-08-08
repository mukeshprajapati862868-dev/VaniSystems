import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";
const teamMembers = [
  {
    image: "https://vanisystems.in/Team/256529010.jpg",
    name: "Rajiv Shukla",
    role: "Managing Director",
    desc: "Established the Company in the year 2003",
  },
  {
    image: "https://vanisystems.in/Team/1738252125.jpg",
    name: "Sunil Kumar Verma",
    role: "Director Vani IT Systems P Ltd",
    desc: "Working as Manager Technical in Vani Systems P Ltd since 2012",
  },
  {
    image: "https://vanisystems.in/Team/1023056582.jpg",
    name: "Mr Aditya Shukla",
    role: "Director",
    desc: "Working as Honorary Director of the Company since 2003",
  },
  {
    image: "https://vanisystems.in/Team/560546528.jpg",
    name: "Sh S N Driwedi",
    role: "Chartered Accountant",
    desc: "CA of Vani Systems P Ltd",
  },
  {
    image: "https://vanisystems.in/Team/1988206464.jpg",
    name: "Eng. Ravindra Sahai",
    role: "Civil Engineer",
    desc: "",
  },
  {
    image: "https://vanisystems.in/Team/1265603750.jpg",
    name: "Dr. Ashok Kumar Singh",
    role: "Consultant",
    desc: "Ashok Kumar Singh is Ph.D. (Sociology) from L.N. Mithila University in 1992. M.A. (Sociology), L. N. Mithila University, 1985. B.A. , L.N. Mithila University, Darbhanga, 1983 Member - India Social Science Association. He is Life Member - Chetana Samiti, Life Member - Socio- Economic Research and Vocational Institute for Cognition Exchange (Service), Life Member - Help Age Institute NIRD, He has successfully conducted Management of Drinking Water & Sanitation Programs Hyderabad, Training on Urban Sanitation, Training on Rehabilitation & Resettlement on the highway related issue conducted NHAI & Word Bank at Allahabad, Training of Implementation of RAP at Bodh Gaya Bihar. He has worked for CAPART Ministry of Rural Development CIPART, Ministry of Rural Development , July 2012 to September 2012, ITL Rehabilitation & Resettlement Expert, Nov. 2010 LAHMERE India Pvt. Ltd. R&R Expert and Social Economist (Intermittent) Jun. 2003 to December 2010 UNIHORN India Pvt Ltd Associated as R&R Expert(Intermittent) Mar 2006 LOKARPIT (ADB Funded R&R Project).",
  },
  {
    image: "https://vanisystems.in/Team/1539568068.jpg",
    name: "Ms Aanchal Piplani",
    role: "Company Secretary",
    desc: "Looking after ROC and Financial Matters of the Company.",
  },
  {
    image: "https://vanisystems.in/Team/1046809839.jpg",
    name: "Sh Raman Singh",
    role: "General Manager (Bihar)",
    desc: "Managing the work in Bihar",
  },
];

const Team = () => {
  return (


    <>
      <InnerPageHero
        subtitle="The best company ever in India"
        title={
          <>
            Our Team
          </>
        }
        buttonText="Work With Us Today"
      />
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <span className="text-danger fw-bold">
              OUR TEAM
            </span>

            <h2 className="fw-bold mt-2">
              Meet Our Professionals
            </h2>

            <p className="text-muted">
              Our experienced team brings expertise and leadership.
            </p>
          </div>

          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div
                className="col-lg-4 col-md-6 col-12"
                key={index}
              >
                <div className="card h-100 border-0 shadow-sm text-center p-4 team-card">

                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle img-fluid border p-1 mb-3 mx-auto"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">

                    <h4 className="fw-bold">
                      {member.name}
                    </h4>

                    <h6 className="text-danger fw-semibold">
                      {member.role}
                    </h6>

                    <hr />

                    <p className="text-muted">
                      {member.desc}
                    </p>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Team;