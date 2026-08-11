import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import apiService from "../services/apiService";

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
  // LOAD CANDIDATES FROM BACKEND API
  // ======================================================

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const result = await apiService.getCandidates();
        if (result.success) {
          setCandidates(result.data || []);
        } else {
          setCandidates([]);
        }
      } catch (error) {
        console.error("Failed to load candidates from backend:", error);
        setCandidates([]);
      }
    };

    fetchCandidates();
  }, []);


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

  const addCandidate = async (candidateData) => {
    const formData = new FormData();
    Object.entries(candidateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const result = await apiService.registerCandidate(formData);
    if (result.success) {
      const savedCandidate = result.data;
      setCandidates((previousCandidates) => [savedCandidate, ...previousCandidates]);
      return savedCandidate;
    }
    throw new Error(result.error || "Failed to save candidate");
  };


  // ======================================================
  // DELETE CANDIDATE
  // ======================================================

  const deleteCandidate = async (id) => {
    try {
      await apiService.deleteCandidate(id);
      setCandidates(
        (previousCandidates) =>
          previousCandidates.filter(
            (candidate) =>
              candidate._id !== id && candidate.id !== id
          )
      );
    } catch (error) {
      console.error("Delete candidate failed:", error);
    }
  };


  // ======================================================
  // UPDATE PAYMENT STATUS
  // ======================================================

  const updatePaymentStatus = async (
    id,
    status
  ) => {
    try {
      const result = await apiService.updateCandidatePaymentStatus(id, status);
      if (result.success) {
        const updatedCandidate = result.data;
        setCandidates(
          (previousCandidates) =>
            previousCandidates.map(
              (candidate) =>
                (candidate._id === id || candidate.id === id)
                  ? updatedCandidate
                  : candidate
            )
        );
      }
    } catch (error) {
      console.error("Update payment status failed:", error);
    }
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
