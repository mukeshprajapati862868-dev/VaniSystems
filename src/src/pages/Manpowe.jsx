import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const Manpower = () => {
  return (
    <>
      <InnerPageHero
        subtitle="The best company in India"
        title={
          <>
            Vanisystems Pvt.Ltd.
            <br />
            Man Power Services
          </>
        }
        buttonText="Work With Us Today"
      />
      <section className="py-5">
        <div className="container">
          {/* Tab Header */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-primary p-0">
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <button className="nav-link active fw-semibold">
                    Man Power Services
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="row align-items-center g-4">
            {/* Text */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="pe-lg-4">
                <p className="text-muted lh-lg">
                  Vanisystems(p).Ltd. provides end to end Human Resource
                  Management to organizations and helps them address their
                  critical talent needs by providing comprehensive Workforce
                  Management from Recruitment Process Outsourcing (RPO) to
                  Staffing Solutions, Permanent Recruitment and Leadership
                  Training and Development. Our endeavor is to help our clients
                  and candidates win in the changing world of work.{" "}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/manpower.jpg"
                  alt="Consultancy Services"
                  className="img-fluid w-100"
                  style={{
                    minHeight: "280px",
                    maxHeight: "500px",
                    objectFit: "cover",
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

export default Manpower;
