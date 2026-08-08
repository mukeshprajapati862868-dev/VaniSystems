import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const Application = () => {
  return (
    <>
      <InnerPageHero
        subtitle="The best company in India"
        title={
          <>
            Vanisystems Pvt.Ltd.
            <br />
            Application development
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
                    Application Development
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
                <p className="text-muted lh-lg mb-0">
                  Vani Systems develops and delivers best-in-class application
                  development solutions to fulfill our customers' business
                  requirements. Our team of experts leverages new technologies,
                  improved frameworks, and suitable methodologies to create
                  superior applications that feature standardized processes and
                  enable business transformation.
                  <br />
                  <br />
                  We adopt a partnership approach with our clients, their
                  partners, suppliers, and customers to deliver the best
                  possible services together. Our close working relationship
                  with our customers enables us to understand their needs better
                  and deliver high-value technology consulting.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/app.jpg"
                  alt="Application Development"
                  className="img-fluid w-100"
                  style={{
                    minHeight: "280px",
                    maxHeight: "420px",
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

export default Application;
