// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";


// import servicesData from "../data/servicesData";


// // ======================================================
// // SERVICE CONTEXT
// // ======================================================

// const ServiceContext = createContext();


// // ======================================================
// // SERVICE PROVIDER
// // ======================================================

// export const ServiceProvider = ({
//   children,
// }) => {


//   // ======================================================
//   // SERVICES STATE
//   // ======================================================

//   const [services, setServices] = useState(() => {


//     const savedServices =
//       localStorage.getItem(
//         "services"
//       );


//     return savedServices
//       ? JSON.parse(savedServices)
//       : servicesData;


//   });



//   // ======================================================
//   // SAVE SERVICES TO LOCAL STORAGE
//   // ======================================================

//   useEffect(() => {


//     localStorage.setItem(

//       "services",

//       JSON.stringify(
//         services
//       )

//     );


//   }, [
//     services
//   ]);





//   // ======================================================
//   // ADD SERVICE FROM ADMIN PANEL
//   // ======================================================

//   const addService = (
//     service
//   ) => {


//     setServices(

//       (previousServices) => [

//         ...previousServices,

//         service,

//       ]

//     );


//   };





//   // ======================================================
//   // DELETE SERVICE
//   // ======================================================

//   const deleteService = (
//     id
//   ) => {


//     setServices(

//       (previousServices) =>

//         previousServices.filter(

//           (service) =>
//             service.id !== id

//         )

//     );


//   };





//   // ======================================================
//   // UPDATE SERVICE
//   // ======================================================

//   const updateService = (
//     updatedService
//   ) => {


//     setServices(

//       (previousServices) =>

//         previousServices.map(

//           (service) =>

//             service.id === updatedService.id

//               ? updatedService

//               : service

//         )

//     );


//   };





//   return (


//     <ServiceContext.Provider

//       value={{

//         services,

//         addService,

//         deleteService,

//         updateService,

//       }}

//     >


//       {children}


//     </ServiceContext.Provider>


//   );


// };




// // ======================================================
// // CUSTOM HOOK
// // ======================================================

// export const useService = () => {


//   const context =
//     useContext(
//       ServiceContext
//     );



//   if (!context) {


//     throw new Error(

//       "useService must be used inside ServiceProvider"

//     );


//   }



//   return context;


// };