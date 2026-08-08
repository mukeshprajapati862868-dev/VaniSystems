import React from "react";
import InnerPageHero from "../components/common/InnerPageHero";

const Contact = () => {
  const offices = [
    {
      title: "Visit Our Office (Head Office)",
      details: [
        ["Company", "Vani Systems Pvt Ltd"],
        [
          "Address",
          "16, Vidhan Sabha Marg, Above Andhra Bank, Lucknow (U.P) (Branch office: 15 New Berry Road Dalibagh Lucknow - 226001)",
        ],
        ["Phone", "0522-2207400"],
        ["Toll Free", "18001807411"],
        [
          "Email",
          <>
            Info@vanisystems.com
            <br />
            vanisystem2003@Yahoo.co.in
          </>,
        ],
      ],
    },
    {
      title: "Branch Office (Lucknow)",
      details: [
        [
          "Address",
          "Basement Paramount Apartments, New Berry Road Near Ganna Sansthan, Dalibagh, Lucknow - 226001",
        ],
        ["Phone", "0522-2207400 / 3277200 / 3271200"],
        ["Mobile", "8756997223"],
        ["Email", "Info@vanisystems.com"],
      ],
    },
    {
      title: "Branch Office (Delhi)",
      details: [
        [
          "Address",
          "Near CBSE Building, Preet Vihar, Vikas Marg, Laxmi Nagar, New Delhi.",
        ],
        ["Mobile", "8756997223"],
        ["Email", "Info@vanisystems.com"],
      ],
    },
    {
      title: "Visit Our Office (Patna)",
      details: [
        ["Office", "Sumitra Sadan"],
        [
          "Address",
          "Post Office Road, Punai Chak, Shastri Nagar, Patna - 800023.",
        ],
        ["Email", "Info@vanisystems.com"],
      ],
    },
    {
      title: "Branch Office (Meerut)",
      details: [
        [
          "Address",
          "Dinesh Vihar Colony, Opposite Park No. 2, Baghpat Road, Meerut.",
        ],
        ["Email", "Info@vanisystems.com"],
      ],
    },
    {
      title: "Branch Office (Uttarakhand)",
      details: [
        ["Office", "S K Mishra"],
        ["Address", "N - 317, Shivalik Nagar, Haridwar - 249403"],
        ["Email", "Info@vanisystems.com"],
      ],
    },
  ];

  return (
    <>
      {/* HERO */}
      <InnerPageHero
        subtitle="Connect with Vani Systems for Reliable Workforce Solutions"
        title={
          <>
            Let's Connect
            <br />
            Build Your Workforce with Us
          </>
        }
        buttonText="Get in Touch"
      />

      {/* CONTACT SECTION */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#eaf8ff",
        }}
      >
        <div className="container">
          {/* HEADING */}
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-3">Contact Us</h2>

            <p className="text-muted mb-3">
              We are here to help you with reliable and professional solutions.
            </p>

            <div
              className="mx-auto"
              style={{
                width: "70px",
                height: "3px",
                backgroundColor: "#29a9e0",
                borderRadius: "10px",
              }}
            ></div>
          </div>

          {/* OFFICES */}
          <div className="row g-4">
            {offices.map((office, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  style={{
                    borderRadius: "10px",
                    transition: "all 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";

                    e.currentTarget.style.boxShadow =
                      "0 18px 40px rgba(41, 169, 224, 0.22)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";

                    e.currentTarget.style.boxShadow =
                      "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)";
                  }}
                >
                  {/* CARD HEADER */}
                  <div
                    className="card-header border-0"
                    style={{
                      backgroundColor: "#dff4ff",
                      padding: "20px",
                      transition: "all 0.35s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#29a9e0";

                      e.currentTarget.querySelector("h3").style.color =
                        "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#dff4ff";

                      e.currentTarget.querySelector("h3").style.color = "#222";
                    }}
                  >
                    <h3
                      className="h5 mb-0 fw-semibold"
                      style={{
                        color: "#222",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {office.title}
                    </h3>
                  </div>

                  {/* CARD BODY */}
                  <div className="card-body p-4">
                    {office.details.map(([label, value], detailIndex) => (
                      <p
                        className="mb-3"
                        key={detailIndex}
                        style={{
                          color: "#555",
                          lineHeight: "1.7",
                          fontSize: "15px",
                        }}
                      >
                        <strong
                          className="d-inline-block me-2 text-dark"
                          style={{
                            minWidth: "82px",
                          }}
                        >
                          {label}:
                        </strong>

                        <span>{value}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LIVE MAP */}
          <div className="mt-5">
            {/* MAP HEADING */}
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-3">Find Us on the Map</h2>

              <p className="text-muted">Visit Vani Systems Pvt Ltd, Lucknow</p>

              <div
                className="mx-auto"
                style={{
                  width: "70px",
                  height: "3px",
                  backgroundColor: "#29a9e0",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            {/* MAP CARD */}
            <div
              className="position-relative overflow-hidden shadow"
              style={{
                borderRadius: "10px",
                border: "4px solid #ffffff",
                backgroundColor: "#ffffff",
              }}
            >
              {/* LIVE GOOGLE MAP */}
              <iframe
                title="Vani Systems Pvt Ltd Location"
                src="https://www.google.com/maps?q=16%20Vidhan%20Sabha%20Marg%20Lucknow%20Uttar%20Pradesh&output=embed"
                width="100%"
                height="520"
                style={{
                  border: 0,
                  display: "block",
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* LOCATION BADGE */}
              <div
                className="position-absolute top-0 start-0 m-3 bg-white shadow-sm px-3 py-2"
                style={{
                  borderRadius: "10px",
                  zIndex: 2,
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: "#dc3545",
                      boxShadow: "0 0 0 6px rgba(220, 53, 69, 0.15)",
                    }}
                  ></span>

                  <strong
                    className="text-dark"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Vani Systems Pvt Ltd
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
