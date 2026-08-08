import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


// ======================================================
// CANDIDATE REGISTRATION CONTEXT
// ======================================================

const CandidateRegistrationContext =
  createContext(null);


// ======================================================
// PROVIDER COMPONENT
// ======================================================

export const CandidateRegistrationProvider = ({
  children,
}) => {


  // ======================================================
  // CANDIDATES STATE
  // ======================================================

  const [candidates, setCandidates] =
    useState([]);


  // ======================================================
  // LOAD CANDIDATES FROM LOCAL STORAGE
  // ======================================================

  useEffect(() => {

    try {

      const savedCandidates =
        localStorage.getItem(
          "candidateRegistrations"
        );


      if (savedCandidates) {

        setCandidates(
          JSON.parse(savedCandidates)
        );

      } else {

        setCandidates([]);

      }

    } catch (error) {

      console.error(
        "Candidate data load error:",
        error
      );

      setCandidates([]);

    }

  }, []);


  // ======================================================
  // SAVE CANDIDATES TO LOCAL STORAGE
  // ======================================================

  useEffect(() => {

    localStorage.setItem(

      "candidateRegistrations",

      JSON.stringify(candidates)

    );

  }, [candidates]);


  // ======================================================
  // GENERATE UNIQUE CANDIDATE ID
  // ======================================================

  const generateUniqueId = () => {

    let id;


    do {

      id =
        Math.floor(
          10000 +
          Math.random() * 90000
        ).toString();


    } while (

      candidates.some(

        (candidate) =>
          candidate.id === id

      )

    );


    return id;

  };


  // ======================================================
  // GENERATE UNIQUE REGISTRATION NUMBER
  // ======================================================

  const generateRegistrationNumber = () => {

    let registrationNumber;


    do {

      registrationNumber =

        "VSPL" +

        Math.floor(

          10000 +

          Math.random() * 90000

        ).toString();


    } while (

      candidates.some(

        (candidate) =>

          candidate.registrationNumber ===
          registrationNumber

      )

    );


    return registrationNumber;

  };


  // ======================================================
  // ADD NEW CANDIDATE
  // ======================================================

  const addCandidate = (candidateData) => {

    const uniqueId =
      generateUniqueId();


    const uniqueRegistrationNumber =
      generateRegistrationNumber();


    const newCandidate = {

      // Unique candidate ID
      id: uniqueId,


      // Registration number
      registrationNumber:
        uniqueRegistrationNumber,


      // Candidate form data
      ...candidateData,


      // Default payment status
      paymentStatus: "Unpaid",


      // Registration date
      registrationDate:

        new Date().toLocaleDateString(
          "en-IN"
        ),


      // Exact creation time
      createdAt:
        new Date().toISOString(),

    };


    setCandidates(

      (previousCandidates) => [

        ...previousCandidates,

        newCandidate,

      ]

    );


    return newCandidate;

  };


  // ======================================================
  // DELETE CANDIDATE
  // ======================================================

  const deleteCandidate = (id) => {

    setCandidates(

      (previousCandidates) =>

        previousCandidates.filter(

          (candidate) =>

            candidate.id !== id

        )

    );

  };


  // ======================================================
  // UPDATE PAYMENT STATUS
  // ======================================================

  const updatePaymentStatus = (

    id,

    status

  ) => {

    setCandidates(

      (previousCandidates) =>

        previousCandidates.map(

          (candidate) =>

            candidate.id === id

              ? {

                ...candidate,

                paymentStatus:
                  status,

              }

              : candidate

        )

    );

  };


  // ======================================================
  // UPDATE CANDIDATE
  // ======================================================

  const updateCandidate = (

    id,

    updatedData

  ) => {

    setCandidates(

      (previousCandidates) =>

        previousCandidates.map(

          (candidate) =>

            candidate.id === id

              ? {

                ...candidate,

                ...updatedData,

              }

              : candidate

        )

    );

  };


  // ======================================================
  // CLEAR ALL CANDIDATES
  // ======================================================

  const clearCandidates = () => {

    setCandidates([]);

    localStorage.removeItem(
      "candidateRegistrations"
    );

  };


  // ======================================================
  // CONTEXT VALUE
  // ======================================================

  const contextValue = {

    candidates,

    addCandidate,

    deleteCandidate,

    updatePaymentStatus,

    updateCandidate,

    clearCandidates,

  };


  // ======================================================
  // RETURN PROVIDER
  // ======================================================

  return (

    <CandidateRegistrationContext.Provider

      value={contextValue}

    >

      {children}

    </CandidateRegistrationContext.Provider>

  );

};


// ======================================================
// CUSTOM HOOK
// ======================================================

export const useCandidateRegistration = () => {

  const context = useContext(

    CandidateRegistrationContext

  );


  if (!context) {

    throw new Error(

      "useCandidateRegistration must be used inside CandidateRegistrationProvider"

    );

  }


  return context;

};