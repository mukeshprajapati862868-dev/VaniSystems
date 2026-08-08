import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const Consultancy = () => {
  return (
    <>
      <InnerPageHero
        subtitle="The best company in India"
        title={
          <>
            Vanisystems Pvt.Ltd.
            <br />
            Consultancy Services
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
                    Consultancy Services
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
                  We are a top notch enterprise solution provider in India. We
                  render all sorts of Placement Consultancy, Corporate Training
                  Services, Enterprise Solution and Network Consulting Services
                  in Lucknow.
                  <br />
                  <br />
                  We also offer entire range of solutions for Information
                  Technology and HRM sector including IT services and enterprise
                  empowerment. In addition to these services we provide wide
                  range of IT and HR consulting including onsite, offsite and
                  offshore resources.
                  <br />
                  <br />
                  We are a dynamic networking consultancy company founded and
                  managed by highly qualified IT professionals having vast
                  experience and exposure. Our professionally trained teams of
                  experts have acquired strong caliber to repair, upgrade and
                  maintain any kind of networking system.
                  <br />
                  <br />
                  Our project solutions group offers network development,
                  integration, project planning, documentation, IT and HRM
                  consultancy. We have a solid infrastructural base to deal with
                  any kind of enterprise solution requirements.
                </p>

                <p className="fw-semibold text-dark">
                  We render various types of services such as:
                </p>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Corporate Training Services
                  </li>

                  <li className="list-group-item px-0">Enterprise Solution</li>

                  <li className="list-group-item px-0">
                    Networking Consulting Services
                  </li>

                  <li className="list-group-item px-0">
                    Civil, structural, mechanical and electrical engineering
                  </li>

                  <li className="list-group-item px-0">Contract management</li>

                  <li className="list-group-item px-0">GIS</li>

                  <li className="list-group-item px-0">MIS</li>

                  <li className="list-group-item px-0">Human Resources</li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/Conc.jpg"
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

export default Consultancy;
