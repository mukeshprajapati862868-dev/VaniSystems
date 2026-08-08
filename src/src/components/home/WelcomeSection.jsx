// src/components/home/WelcomeSection.jsx

import React, { useState } from "react";

const WelcomeSection = () => {
  const [activeTab, setActiveTab] = useState("notifications");

  const news = [
    "New service updates coming soon",
    "Professional manpower solutions",
    "Vani Systems continues to improve",
    "Latest company announcements",
  ];

  return (
    <section className="py-5 bg-white">

      <div className="container">

        {/* SECTION TITLE */}
        <div className="text-center mb-5">

          <h2 className="fw-bold text-dark">
            Welcome to Vanisystems(p).Ltd.
          </h2>

          <div className="mx-auto mt-3 bg-warning rounded"
            style={{ width: "70px", height: "4px" }}
          ></div>

        </div>

        <div className="row g-4">

          {/* LEFT ACCORDION */}
          <div className="col-12 col-md-4">

            <div className="accordion shadow-sm" id="welcomeAccordion">

              {/* Notifications */}
              <div className="accordion-item">

                <h2 className="accordion-header">

                  <button
                    className={`accordion-button ${
                      activeTab !== "notifications" ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "notifications"
                          ? ""
                          : "notifications"
                      )
                    }
                  >
                    Notifications/Advertisements
                  </button>

                </h2>

                <div
                  className={`accordion-collapse collapse ${
                    activeTab === "notifications" ? "show" : ""
                  }`}
                >

                  <div className="accordion-body">

                    <div className="d-flex align-items-center gap-2">

                      <span className="text-warning">●</span>

                      <a
                        href="/notification"
                        className="text-decoration-none"
                      >
                        Apply Online
                      </a>

                      <span className="badge bg-danger">
                        NEW
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Mission */}
              <div className="accordion-item">

                <h2 className="accordion-header">

                  <button
                    className={`accordion-button ${
                      activeTab !== "mission" ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "mission" ? "" : "mission"
                      )
                    }
                  >
                    Vani Systems Group Mission
                  </button>

                </h2>

                <div
                  className={`accordion-collapse collapse ${
                    activeTab === "mission" ? "show" : ""
                  }`}
                >

                  <div className="accordion-body">

                    <div className="ratio ratio-16x9">

                      <iframe
                        src="https://www.youtube.com/embed/rHVFvbGjCB4"
                        title="Vani Systems Group Mission"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>

                    </div>

                  </div>

                </div>

              </div>

              {/* Improving */}
              <div className="accordion-item">

                <h2 className="accordion-header">

                  <button
                    className={`accordion-button ${
                      activeTab !== "improving" ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "improving" ? "" : "improving"
                      )
                    }
                  >
                    We are Always Improving
                  </button>

                </h2>

                <div
                  className={`accordion-collapse collapse ${
                    activeTab === "improving" ? "show" : ""
                  }`}
                >

                  <div className="accordion-body text-secondary">

                    We have a proven record of accomplishment and are a
                    reputable company in India. We ensure that all projects
                    are done with utmost professionalism, support and
                    accessibility.

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ABOUT CONTENT */}
          <div className="col-12 col-md-4">

            <div className="h-100 d-flex flex-column">

              <p className="text-secondary lh-lg">

                Vani Systems (P) Limited is Incorporated under Registrar of
                Companies Act 1956. The Vani Systems is an ISO 9001-2008
                certified private limited company floated by group of Graduate
                Engineers with working experience of over 10 years in
                Information Technology and Software Development Systems
                Industry.

              </p>

              <p className="text-secondary lh-lg">

                The company is headed and managed by Sh. Rajiv Shukla. Vani
                Systems have unmatched combination of superior business
                knowledge coupled with the ability to anticipate and adopt new
                advances in Information Technology.

              </p>

              <p className="text-secondary lh-lg">

                Our comprehensive software solutions are specifically tailored
                to meet an organisation's distinct needs.

              </p>

              <div className="mt-auto pt-3">

                <a
                  href="/about"
                  className="btn btn-warning text-white fw-semibold px-4"
                >
                  Read More
                </a>

              </div>

            </div>

          </div>


          {/* NEWS & EVENTS */}
          <div className="col-12 col-md-4">

            <div className="border rounded shadow-sm overflow-hidden h-100">

              {/* HEADER */}
              <div className="bg-secondary text-white p-3">

                <h4 className="mb-0 fw-bold">
                  News & Event
                </h4>

              </div>

              {/* NEWS LIST */}
              <div
                className="p-3"
                style={{
                  height: "280px",
                  overflow: "hidden",
                }}
              >

                <div
                  className="d-flex flex-column gap-3"
                  style={{
                    animation: "newsScroll 15s linear infinite",
                  }}
                >

                  {[...news, ...news].map((item, index) => (

                    <div
                      key={index}
                      className="border-bottom pb-2"
                    >

                      <span className="text-warning me-2">
                        ●
                      </span>

                      <span className="text-secondary">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* BUTTON */}
              <div className="p-3">

                <a
                  href="/latest-news"
                  className="btn btn-warning text-white fw-semibold px-4"
                >
                  Read More
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WelcomeSection;