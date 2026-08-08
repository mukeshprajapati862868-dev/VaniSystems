import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const LatestInformation = () => {
  return (
    <>
      <InnerPageHero
        subtitle="The best company ever in India"
        title={<>Latest Information Work With Us Today</>}
        buttonText="Work With Us Today"
      />
      <section className="servicessec secpadd py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="abouttopinfo text-center">
                <h2
                  className="main-color pagemdmhd"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    fontFamily: "'Open Sans', sans-serif",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  ---------------Latest Information---------------
                </h2>
              </div>

              <div id="div1">
                <ul></ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestInformation;
