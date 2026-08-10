// import React from "react";
// import { Link } from "react-router-dom";
// import InnerPageHero from "../components/common/InnerPageHero";


// const Notifications = () => {

//   const notifications = [
//     {
//       sr: 1,
//       department:
//         "Child Helpline Unit at District Child Protection Unit (DCPU)-Lakhimpur(Khiri)/Lakhimpur Child Welfare",
//       fees: "118.00",
//       openDate: "28/08/2023",
//       lastDate: "15/09/2023",
//     },
//     {
//       sr: 2,
//       department:
//         "Education Department Bihar/Vacancy for Civil Engineers",
//       fees: "1180.00",
//       openDate: "29/07/2023",
//       lastDate: "14/08/2023",
//     },
//   ];

//   return (
//     <>

//       <InnerPageHero
//         subtitle="The best company in India"
//         title={
//           <>
//             All Notifications/Advertisements
//             <br />
//             Details
//           </>
//         }
//         buttonText="Work With Us Today"
//       />

//       <section className="detailpage py-5">

//         <div className="container">

//           <div className="row g-4">


//             {/* MAIN CONTENT */}

//             <div className="col-lg-9 col-md-8 col-12">

//               <div className="card border-0 shadow-sm">

//                 <div className="card-header bg-white border-0">

//                   <h3 className="mb-0">
//                     Notifications/Advertisements
//                   </h3>

//                 </div>


//                 <div className="card-body">

//                   <div className="table-responsive">

//                     <table className="table table-striped table-bordered align-middle mb-0">

//                       <thead className="table-light">

//                         <tr>

//                           <th>Sr.No.</th>

//                           <th> </th>

//                           <th> </th>

//                           <th>Department</th>

//                           <th>Fees(Rs.)</th>

//                           <th>Open Date</th>

//                           <th>Last Date</th>

//                         </tr>

//                       </thead>


//                       <tbody>

//                         {notifications.map((item) => (

//                           <tr key={item.sr}>

//                             <td>
//                               {item.sr}
//                             </td>


//                             {/* APPLY BUTTON */}

//                             <td>

//                               <Link
//                                 to="/online-registration"
//                                 className="text-success text-decoration-none fw-semibold"
//                               >
//                                 Apply
//                               </Link>

//                             </td>


//                             {/* ADVERTISEMENT */}

//                             <td>

//                               <a
//                                 href="#"
//                                 onClick={(e) =>
//                                   e.preventDefault()
//                                 }
//                                 className="text-danger text-decoration-none"
//                               >

//                                 View Advertisement{" "}

//                                 <i className="fa fa-file-pdf-o"></i>

//                               </a>

//                             </td>


//                             {/* DEPARTMENT */}

//                             <td>

//                               <span>
//                                 {item.department}
//                               </span>

//                               <img
//                                 src="/images/new_red.gif"
//                                 alt="new"
//                                 className="ms-2"
//                               />

//                             </td>


//                             <td>
//                               {item.fees}
//                             </td>


//                             <td>
//                               {item.openDate}
//                             </td>


//                             <td>
//                               {item.lastDate}
//                             </td>

//                           </tr>

//                         ))}

//                       </tbody>

//                     </table>

//                   </div>

//                 </div>

//               </div>

//             </div>


//             {/* SIDEBAR */}

//             <div className="col-lg-3 col-md-4 col-12">

//               <aside className="card border-0 shadow-sm">

//                 <div className="card-body">

//                   <h5 className="mb-4">
//                     Links
//                   </h5>


//                   <div className="d-flex flex-column gap-3">


//                     {/* ONLINE APPLY */}

//                     <Link
//                       to="/online-registration"
//                       className="text-decoration-none"
//                     >

//                       <i className="fa fa-edit me-2"></i>

//                       Online Apply

//                     </Link>


//                     {/* FEE PAYMENT */}
//                     <Link
//                       to="/fee-payment"
//                       className="text-decoration-none"
//                     >
//                       <i className="fa fa-bank me-2"></i>

//                       Submit &amp; Fee Payment
//                     </Link>

//                   </div>

//                 </div>

//               </aside>

//             </div>

//           </div>

//         </div>

//       </section>

//     </>
//   );

// };

// export default Notifications;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InnerPageHero from "../components/common/InnerPageHero";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadVacancies = () => {
      try {
        const storedVacancies =
          JSON.parse(localStorage.getItem("vani_vacancies")) || [];

        setNotifications(storedVacancies);
      } catch (error) {
        console.error("Error loading vacancies:", error);
        setNotifications([]);
      }
    };

    loadVacancies();

    // Admin panel se upload hone ke baad same browser tab/window
    // ke data ko refresh karne ke liye event listener.
    window.addEventListener("storage", loadVacancies);

    return () => {
      window.removeEventListener("storage", loadVacancies);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <>
      <InnerPageHero
        subtitle="The best company in India"
        title={
          <>
            All Notifications/Advertisements
            <br />
            Details
          </>
        }
        buttonText="Work With Us Today"
      />

      <section className="detailpage py-5">
        <div className="container">

          <div className="row g-4">

            {/* MAIN CONTENT */}

            <div className="col-lg-9 col-md-8 col-12">

              <div className="card border-0 shadow-sm">

                <div className="card-header bg-white border-0">

                  <h3 className="mb-0">
                    Notifications/Advertisements
                  </h3>

                </div>

                <div className="card-body">

                  <div className="table-responsive">

                    <table className="table table-striped table-bordered align-middle mb-0">

                      <thead className="table-light">

                        <tr>
                          <th>Sr.No.</th>
                          <th> </th>
                          <th> </th>
                          <th>Department</th>
                          <th>Fees(Rs.)</th>
                          <th>Open Date</th>
                          <th>Last Date</th>
                        </tr>

                      </thead>

                      <tbody>

                        {notifications.length === 0 ? (

                          <tr>
                            <td
                              colSpan="7"
                              className="text-center py-5 text-muted"
                            >
                              No Notifications/Advertisements Available
                            </td>
                          </tr>

                        ) : (

                          notifications.map((item, index) => (

                            <tr key={item.id || index}>

                              <td>
                                {index + 1}
                              </td>

                              {/* APPLY BUTTON */}

                              <td>

                                <Link
                                  to={
                                    item.applyLink ||
                                    "/online-registration"
                                  }
                                  className="text-success text-decoration-none fw-semibold"
                                >
                                  Apply
                                </Link>

                              </td>

                              {/* ADVERTISEMENT */}

                              <td>

                                {item.advertisement ? (

                                  <a
                                    href={item.advertisement}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-danger text-decoration-none"
                                  >
                                    View Advertisement{" "}
                                    <i className="fa fa-file-pdf-o"></i>
                                  </a>

                                ) : (

                                  <span className="text-muted">
                                    Advertisement
                                  </span>

                                )}

                              </td>

                              {/* DEPARTMENT */}

                              <td>

                                <span>
                                  {item.department}
                                </span>

                                <img
                                  src="/images/new_red.gif"
                                  alt="new"
                                  className="ms-2"
                                />

                              </td>

                              {/* FEES */}

                              <td>
                                {item.fees}
                              </td>

                              {/* OPEN DATE */}

                              <td>
                                {formatDate(item.openDate)}
                              </td>

                              {/* LAST DATE */}

                              <td>
                                {formatDate(item.lastDate)}
                              </td>

                            </tr>

                          ))

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

            {/* SIDEBAR */}

            <div className="col-lg-3 col-md-4 col-12">

              <aside className="card border-0 shadow-sm">

                <div className="card-body">

                  <h5 className="mb-4">
                    Links
                  </h5>

                  <div className="d-flex flex-column gap-3">

                    {/* ONLINE APPLY */}

                    <Link
                      to="/online-registration"
                      className="text-decoration-none"
                    >
                      <i className="fa fa-edit me-2"></i>
                      Online Apply
                    </Link>

                    {/* FEE PAYMENT */}

                    <Link
                      to="/fee-payment"
                      className="text-decoration-none"
                    >
                      <i className="fa fa-bank me-2"></i>
                      Submit &amp; Fee Payment
                    </Link>

                  </div>

                </div>

              </aside>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Notifications;

