// // // src/components/home/EventsPhotos.jsx

// // import React, { useEffect, useState } from "react";

// // const events = [
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/5.jpg",
// //     title: "Corporate Event",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/7.jpg",
// //     title: "Annual Ceremony",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/8.jpg",
// //     title: "Company Celebration",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/9.jpg",
// //     title: "Special Event",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/9.jpg",
// //     title: "Business Conference",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/2.jpg",
// //     title: "Team Event",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/1.jpg",
// //     title: "Corporate Meeting",
// //   },
// //   {
// //     image:
// //       "https://vanisystems.in/images/news/2.jpg",
// //     title: "Company Function",
// //   },
// // ];

// // const EventsPhotos = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [visibleCards, setVisibleCards] = useState(3);

// //   /* ================= RESPONSIVE CARD COUNT ================= */
// //   useEffect(() => {
// //     const updateCards = () => {
// //       if (window.innerWidth < 576) {
// //         setVisibleCards(1);
// //       } else if (window.innerWidth < 768) {
// //         setVisibleCards(2);
// //       } else if (window.innerWidth < 992) {
// //         setVisibleCards(2);
// //       } else {
// //         setVisibleCards(3);
// //       }
// //     };

// //     updateCards();

// //     window.addEventListener("resize", updateCards);

// //     return () => {
// //       window.removeEventListener("resize", updateCards);
// //     };
// //   }, []);

// //   /* ================= AUTO SLIDE 5 SECOND ================= */
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentIndex((prevIndex) => {
// //         const maxIndex = events.length - visibleCards;

// //         if (prevIndex >= maxIndex) {
// //           return 0;
// //         }

// //         return prevIndex + 1;
// //       });
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, [visibleCards]);

// //   const maxIndex = events.length - visibleCards;

// //   /* ================= NEXT ================= */
// //   const nextSlide = () => {
// //     setCurrentIndex((prevIndex) => {
// //       if (prevIndex >= maxIndex) {
// //         return 0;
// //       }

// //       return prevIndex + 1;
// //     });
// //   };

// //   /* ================= PREVIOUS ================= */
// //   const previousSlide = () => {
// //     setCurrentIndex((prevIndex) => {
// //       if (prevIndex <= 0) {
// //         return maxIndex;
// //       }

// //       return prevIndex - 1;
// //     });
// //   };

// //   return (
// //     <section className="py-5 bg-light">

// //       <div className="container">

// //         {/* ================= HEADER ================= */}
// //         <div className="row align-items-center g-4 mb-5">

// //           <div className="col-12 col-lg-3 col-md-6">

// //             <div className="border-start border-warning border-4 ps-3">

// //               <h2 className="fw-bold text-dark mb-0">
// //                 Events Photos
// //               </h2>

// //             </div>

// //           </div>

// //           <div className="col-12 col-lg-8 col-md-6">

// //             <p className="text-secondary mb-0 fs-5">
// //               Events & Ceremony of Vanisystems(p) Ltd. Photos
// //             </p>

// //           </div>

// //         </div>

// //         {/* ================= SLIDER ================= */}
// //         <div className="position-relative">

// //           {/* PREVIOUS BUTTON */}
// //           <button
// //             type="button"
// //             onClick={previousSlide}
// //             className="btn btn-warning rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-md-flex align-items-center justify-content-center shadow"
// //             style={{
// //               width: "48px",
// //               height: "48px",
// //               zIndex: 5,
// //             }}
// //           >
// //             <span className="fs-3 text-white">
// //               ‹
// //             </span>
// //           </button>

// //           {/* SLIDER VIEW */}
// //           <div className="overflow-hidden px-0 px-md-5">

// //             <div
// //               className="d-flex"
// //               style={{
// //                 transform: `translateX(-${
// //                   currentIndex * (100 / visibleCards)
// //                 }%)`,
// //                 transition: "transform 0.8s ease-in-out",
// //               }}
// //             >

// //               {events.map((event, index) => (

// //                 <div
// //                   key={index}
// //                   className="flex-shrink-0 px-2"
// //                   style={{
// //                     width: `${100 / visibleCards}%`,
// //                   }}
// //                 >

// //                   {/* PROFESSIONAL CARD */}
// //                   <div
// //                     className="card border-0 shadow-sm overflow-hidden h-100"
// //                     style={{
// //                       borderRadius: "14px",
// //                     }}
// //                   >

// //                     {/* IMAGE */}
// //                     <div
// //                       className="position-relative overflow-hidden"
// //                       style={{
// //                         height: "260px",
// //                       }}
// //                     >

// //                       <img
// //                         src={event.image}
// //                         alt={event.title}
// //                         className="w-100 h-100"
// //                         style={{
// //                           objectFit: "cover",
// //                           transition: "transform 0.5s ease",
// //                         }}
// //                       />

// //                       {/* DARK OVERLAY */}
// //                       <div
// //                         className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
// //                         style={{
// //                           background:
// //                             "rgba(0, 0, 0, 0.25)",
// //                         }}
// //                       >

// //                         <div
// //                           className="rounded-circle bg-warning d-flex align-items-center justify-content-center shadow"
// //                           style={{
// //                             width: "55px",
// //                             height: "55px",
// //                           }}
// //                         >

// //                           <span className="text-white fs-3">
// //                             ↗
// //                           </span>

// //                         </div>

// //                       </div>

// //                     </div>

// //                     {/* CARD FOOTER */}
// //                     <div className="p-3 bg-white">

// //                       <div className="d-flex align-items-center justify-content-between">

// //                         <h5 className="fw-bold mb-0 text-dark">
// //                           {event.title}
// //                         </h5>

// //                         <span className="text-warning fs-4">
// //                           →
// //                         </span>

// //                       </div>

// //                     </div>

// //                   </div>

// //                 </div>

// //               ))}

// //             </div>

// //           </div>

// //           {/* NEXT BUTTON */}
// //           <button
// //             type="button"
// //             onClick={nextSlide}
// //             className="btn btn-warning rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-md-flex align-items-center justify-content-center shadow"
// //             style={{
// //               width: "48px",
// //               height: "48px",
// //               zIndex: 5,
// //             }}
// //           >
// //             <span className="fs-3 text-white">
// //               ›
// //             </span>
// //           </button>

// //         </div>

// //         {/* ================= DOTS ================= */}
// //         <div className="d-flex justify-content-center gap-2 mt-4">

// //           {Array.from({
// //             length: maxIndex + 1,
// //           }).map((_, index) => (

// //             <button
// //               key={index}
// //               type="button"
// //               onClick={() => setCurrentIndex(index)}
// //               className={`rounded-circle border-0 ${
// //                 currentIndex === index
// //                   ? "bg-warning"
// //                   : "bg-secondary"
// //               }`}
// //               style={{
// //                 width: "10px",
// //                 height: "10px",
// //               }}
// //             ></button>

// //           ))}

// //         </div>

// //         {/* ================= READ MORE ================= */}
// //         <div className="text-center mt-4">

// //           <a
// //             href="/photo-gallery"
// //             className="btn btn-warning text-white fw-semibold px-4 py-2"
// //           >
// //             Read More
// //           </a>

// //         </div>

// //       </div>

// //     </section>
// //   );
// // };

// // export default EventsPhotos;
// import React, { useEffect, useState } from "react";
// import {
//   FaImages,
//   FaUpload,
//   FaEdit,
//   FaTrash,
//   FaTimes,
//   FaPlus,
// } from "react-icons/fa";

// const STORAGE_KEY = "vani_events_photos";

// const EventManagement = () => {
//   const [events, setEvents] = useState([]);
//   const [eventTitle, setEventTitle] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   // =====================================================
//   // LOAD EVENTS
//   // =====================================================

//   useEffect(() => {
//     const savedEvents = localStorage.getItem(STORAGE_KEY);

//     if (savedEvents) {
//       try {
//         setEvents(JSON.parse(savedEvents));
//       } catch (error) {
//         console.error("Error loading events:", error);
//         setEvents([]);
//       }
//     }
//   }, []);

//   // =====================================================
//   // SAVE EVENTS
//   // =====================================================

//   const saveEvents = (updatedEvents) => {
//     setEvents(updatedEvents);
//     localStorage.setItem(
//       STORAGE_KEY,
//       JSON.stringify(updatedEvents)
//     );
//   };

//   // =====================================================
//   // SELECT IMAGE
//   // =====================================================

//   const handleImageSelect = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select a valid image.");
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image size must be less than 5MB.");
//       e.target.value = "";
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setSelectedImage({
//         name: file.name,
//         url: reader.result,
//       });
//     };

//     reader.onerror = () => {
//       alert("Unable to read image.");
//     };

//     reader.readAsDataURL(file);
//   };

//   // =====================================================
//   // ADD / UPDATE EVENT
//   // =====================================================

//   const handleSave = (e) => {
//     e.preventDefault();

//     if (!eventTitle.trim()) {
//       alert("Please enter event title.");
//       return;
//     }

//     if (!selectedImage) {
//       alert("Please select an event image.");
//       return;
//     }

//     // UPDATE
//     if (editingId) {
//       const updatedEvents = events.map((event) =>
//         event.id === editingId
//           ? {
//               ...event,
//               title: eventTitle.trim(),
//               image: selectedImage.url,
//               imageName: selectedImage.name,
//             }
//           : event
//       );

//       saveEvents(updatedEvents);

//       alert("Event photo updated successfully.");

//       resetForm();
//       return;
//     }

//     // ADD
//     const newEvent = {
//       id: Date.now(),
//       title: eventTitle.trim(),
//       image: selectedImage.url,
//       imageName: selectedImage.name,
//       createdAt: new Date().toISOString(),
//     };

//     saveEvents([...events, newEvent]);

//     alert("Event photo uploaded successfully.");

//     resetForm();
//   };

//   // =====================================================
//   // EDIT
//   // =====================================================

//   const handleEdit = (event) => {
//     setEditingId(event.id);
//     setEventTitle(event.title);

//     setSelectedImage({
//       name: event.imageName || event.title,
//       url: event.image,
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // =====================================================
//   // DELETE
//   // =====================================================

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this event photo?"
//     );

//     if (!confirmDelete) return;

//     const updatedEvents = events.filter(
//       (event) => event.id !== id
//     );

//     saveEvents(updatedEvents);

//     alert("Event photo deleted successfully.");
//   };

//   // =====================================================
//   // RESET
//   // =====================================================

//   const resetForm = () => {
//     setEventTitle("");
//     setSelectedImage(null);
//     setEditingId(null);

//     const input = document.getElementById(
//       "eventImageInput"
//     );

//     if (input) {
//       input.value = "";
//     }
//   };

//   return (
//     <div>

//       {/* =================================================
//           ADD EVENT
//       ================================================= */}

//       <div className="card border-0 shadow-sm mb-4">

//         <div className="card-body p-3 p-md-4">

//           <div className="d-flex justify-content-between align-items-center mb-4">

//             <div>
//               <h5 className="fw-bold mb-1">
//                 {editingId
//                   ? "Edit Event Photo"
//                   : "Add Event Photo"}
//               </h5>

//               <small className="text-muted">
//                 Upload event photos from admin panel
//               </small>
//             </div>

//             <FaImages
//               className="text-warning"
//               style={{
//                 fontSize: "35px",
//               }}
//             />

//           </div>

//           <form onSubmit={handleSave}>

//             <div className="row g-3">

//               {/* EVENT TITLE */}

//               <div className="col-12 col-md-6">

//                 <label className="form-label fw-semibold">
//                   Event Title
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter event title"
//                   value={eventTitle}
//                   onChange={(e) =>
//                     setEventTitle(e.target.value)
//                   }
//                 />

//               </div>

//               {/* IMAGE */}

//               <div className="col-12 col-md-6">

//                 <label className="form-label fw-semibold">
//                   Select Event Image
//                 </label>

//                 <input
//                   id="eventImageInput"
//                   type="file"
//                   className="form-control"
//                   accept="image/*"
//                   onChange={handleImageSelect}
//                 />

//                 <small className="text-muted">
//                   JPG, JPEG, PNG, WEBP — Maximum 5MB
//                 </small>

//               </div>

//               {/* PREVIEW */}

//               {selectedImage && (

//                 <div className="col-12">

//                   <div className="border rounded p-3 bg-light">

//                     <div className="d-flex justify-content-between align-items-center mb-3">

//                       <strong>
//                         Image Preview
//                       </strong>

//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() =>
//                           setSelectedImage(null)
//                         }
//                       >
//                         <FaTimes />
//                       </button>

//                     </div>

//                     <img
//                       src={selectedImage.url}
//                       alt="Event Preview"
//                       className="img-fluid rounded"
//                       style={{
//                         width: "100%",
//                         maxHeight: "300px",
//                         objectFit: "contain",
//                       }}
//                     />

//                     <p className="small text-muted mt-2 mb-0">
//                       {selectedImage.name}
//                     </p>

//                   </div>

//                 </div>

//               )}

//               {/* BUTTON */}

//               <div className="col-12">

//                 <div className="d-flex gap-2">

//                   <button
//                     type="submit"
//                     className="btn btn-success"
//                   >

//                     {editingId ? (
//                       <>
//                         <FaEdit className="me-2" />
//                         Update Event
//                       </>
//                     ) : (
//                       <>
//                         <FaUpload className="me-2" />
//                         Upload Event
//                       </>
//                     )}

//                   </button>

//                   {editingId && (

//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={resetForm}
//                     >
//                       Cancel
//                     </button>

//                   )}

//                 </div>

//               </div>

//             </div>

//           </form>

//         </div>

//       </div>

//       {/* =================================================
//           EVENT LIST
//       ================================================= */}

//       <div className="card border-0 shadow-sm">

//         <div className="card-body p-3 p-md-4">

//           <div className="d-flex justify-content-between align-items-center mb-4">

//             <div>
//               <h5 className="fw-bold mb-1">
//                 Uploaded Event Photos
//               </h5>

//               <small className="text-muted">
//                 Total Photos: {events.length}
//               </small>
//             </div>

//             <FaImages
//               className="text-warning"
//               style={{
//                 fontSize: "30px",
//               }}
//             />

//           </div>

//           {events.length === 0 ? (

//             <div className="text-center py-5">

//               <FaImages
//                 className="text-muted"
//                 style={{
//                   fontSize: "55px",
//                 }}
//               />

//               <h5 className="mt-3">
//                 No Event Photos
//               </h5>

//               <p className="text-muted">
//                 Upload your first event photo above.
//               </p>

//             </div>

//           ) : (

//             <div className="row g-4">

//               {events.map((event) => (

//                 <div
//                   className="col-12 col-sm-6 col-lg-4 col-xl-3"
//                   key={event.id}
//                 >

//                   <div className="card border-0 shadow-sm h-100">

//                     <img
//                       src={event.image}
//                       alt={event.title}
//                       className="card-img-top"
//                       style={{
//                         height: "220px",
//                         width: "100%",
//                         objectFit: "cover",
//                       }}
//                     />

//                     <div className="card-body">

//                       <h6 className="fw-bold mb-2">
//                         {event.title}
//                       </h6>

//                       <p className="small text-muted text-truncate mb-3">
//                         {event.imageName}
//                       </p>

//                       <div className="d-flex gap-2">

//                         <button
//                           type="button"
//                           className="btn btn-warning btn-sm"
//                           onClick={() =>
//                             handleEdit(event)
//                           }
//                         >
//                           <FaEdit className="me-1" />
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           className="btn btn-danger btn-sm"
//                           onClick={() =>
//                             handleDelete(event.id)
//                           }
//                         >
//                           <FaTrash className="me-1" />
//                           Delete
//                         </button>

//                       </div>

//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default EventManagement;
