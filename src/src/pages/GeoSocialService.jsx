import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const GeoSocialService = () => {
  return (
    <>
      <InnerPageHero
        subtitle="The best company ever in India"
        title={
          <>
            Vanisystem(p) Ltd.
            <br />
            DELTA WIRES AND CABLES
          </>
        }
        buttonText="Work With Us Today"
      />
      <section className="py-5">
        <div className="container">
          {/* SECTION 1 */}
          <div className="row align-items-start g-4 mb-5">
            <div className="col-lg-9 col-md-8 col-12">
              <h2 className="fw-bold mb-4">Delta Wire &amp; Cables</h2>

              <p className="text-muted lh-lg">
                With a motive to have a major share of wires and cables industry
                with its superior products, DELTA WIRES AND CABLES came into
                existence in 2009. Today, we are one of the most trusted and
                reliable manufacturers and exporters of all types of cables and
                wiring solutions.
                <br />
                <br />
                We manufacture wires and cables for automotive applications,
                domestic as well as industrial applications. Apart from normal
                PVC wires, we also export high end products such as FR wires
                (Fire Retardant), Fire Retardant Low Smoke (FRLS) Wires, HR
                (Heat Resistance) Wires etc. for enhanced safety. These are
                marketed internationally under the brand name "DELTA".
                <br />
                <br />
                Our focus is on manufacturing and creating state-of-the-art
                products that offer exceptional performance and customized
                solutions for a wide range of industrial applications. We are
                geared to excel in this industry by keeping pace with advancing
                technologies and changing customer requirements.
                <br />
                <br />
                We recognize economically priced high quality products and
                dedication to service our customers at each step are the core
                values of our company.
                <br />
                <br />
                Established in 2009, DELTA WIRES AND CABLES is pleased to
                introduce itself as one of the leading manufacturers and
                stockists of a wide range of PVC &amp; FRLS electrical wires,
                insulated single core &amp; multi core industrial flexible
                cables, PVC insulated 3 core flat submersible cables, control
                &amp; power cables, screened / shielded instrumentation cables,
                LAN cables, coaxial cables, telephone cables, EPR/TRS/Silicon
                insulated rubber cables, aerial bunched cables and PTFE (Teflon)
                insulated cables.
              </p>
            </div>

            <div className="col-lg-3 col-md-4 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/deltaw.jpg"
                  alt="Delta Wire and Cables"
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

          {/* SECTION 2 */}
          <div className="row align-items-start g-4">
            <div className="col-lg-9 col-md-8 col-12">
              <h2 className="fw-bold mb-4">
                Infrastructure &amp; Quality Assurance
              </h2>

              <p className="text-muted lh-lg">
                DELTA WIRES AND CABLES is well-equipped with the latest
                machinery and test laboratory to manufacture the heterogeneous
                range of cables and wires. Supported by a competent team of
                technocrats and quality checkers, the company implements strict
                control measures throughout the production line in manufacturing
                "DELTA" cables.
                <br />
                <br />
                Recently, the company has undergone significant expansion to
                stabilize its business and develop the test laboratories with
                modern instrumentation. The wires and cables manufactured by the
                company are stringently checked at Central Power Research
                Institute (CPRI) of Bangalore and approved by State Electricity
                Board. Incoming raw material is also tested thoroughly to ensure
                consistency of quality.
                <br />
                <br />
                In a very short span of time DELTA WIRES AND CABLES achieved
                substantial growth with regard to superior quality of products
                and customer satisfaction. The company's customer-oriented
                approach and focus on quality and customer contentment has won
                it a distinguished list of clients from around the world.
                <br />
                <br />
                The best run corporations across the world are not run by
                machines, computers or systems. Rather, businesses become
                successful operations when the right teams are in place, made up
                of the right persons on the right jobs.
                <br />
                <br />
                We at VSPL, a full-service staffing and training company, have a
                mission to provide true consulting-based executive search,
                training, dedicated manpower and placement services for
                Foreign/Indian companies to help them improve productivity
                through an effective high-level recruitment process.
                <br />
                <br />
                We focus on continued success by bringing the best possible
                candidates to our clients. We accomplish this by gaining a solid
                understanding of our client's organization, products &amp;
                services, competitive advantage, corporate culture, competitors,
                strengths and niche expertise.
                <br />
                <br />
                We offer total recruitment, training, dedicated manpower and
                placement solutions through our refined process, extensive
                database and professional methods of selecting eligible
                candidates for a particular placement.
                <br />
                <br />
                VSPL is a global one-stop-shop to meet all your recruitment,
                training, dedicated manpower and placement requirements.
                <br />
                <br />
                We enter into recruitment contracts with our clients to provide
                jobs to candidates seeking opportunities to enhance and uplift
                their way of life. We focus on ethics, quality and customer
                service, believing that we have two customers to serve: our
                client companies and the many candidates that we represent.
                <br />
                <br />
                We have experience and expertise in providing Manpower
                Consultancy for Information Technology, Hospitality Industry,
                Construction Engineering and Civil Workers, Hospitals and
                Healthcare, Oil and Gas Industry, Call Centers and Service
                Industry, Aviation Industry, Manufacturing Industry and various
                Cleaning, Security and Maintenance Companies.
              </p>

              <h5 className="fw-bold mt-4 mb-3">
                MANY GOVERNMENT ORGANIZATIONS SUCH AS
              </h5>

              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  Human Rights Commission
                </li>

                <li className="list-group-item px-0">
                  Land Development and Water Resources
                </li>

                <li className="list-group-item px-0">Agriculture Department</li>

                <li className="list-group-item px-0">Zila Panchayat</li>

                <li className="list-group-item px-0">Pollution Control</li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-4 col-12">
              <div className="overflow-hidden rounded-3 shadow-sm">
                <img
                  src="https://vanisystems.in/images/resources/deltw1.jpg"
                  alt="Infrastructure and Quality Assurance"
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

export default GeoSocialService;
