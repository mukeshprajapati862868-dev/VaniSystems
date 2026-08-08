import React, { useState } from "react";

const FeePayment = () => {
  // ======================================================
  // REGISTRATION NUMBER INPUT
  // ======================================================

  const [registrationNumber, setRegistrationNumber] = useState("");

  // ======================================================
  // CANDIDATE DATA
  // ======================================================

  const [candidateData, setCandidateData] = useState(null);

  // ======================================================
  // ERROR MESSAGE
  // ======================================================

  const [error, setError] = useState("");

  // ======================================================
  // SUBMIT REGISTRATION NUMBER
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    setCandidateData(null);

    // User entered registration number ko clean karta hai

    const enteredNumber = registrationNumber.trim().toUpperCase();

    // VSPL prefix remove karta hai

    const numberOnly = enteredNumber.replace("VSPL", "");

    // Registration localStorage se data search karta hai

    const savedData = localStorage.getItem(`registration_${numberOnly}`);

    // Agar registration mil gaya

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setCandidateData(parsedData);

      return;
    }

    // Agar registration nahi mila

    setError("Invalid Applicant Registration No.");
  };

  // ======================================================
  // PRINT FUNCTION
  // ======================================================

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fee-payment-page">
      {/* ==================================================
          PAYMENT SEARCH PAGE
      ================================================== */}

      {!candidateData && (
        <section className="fee-payment-section">
          {/* PAGE TITLE */}

          <h1 className="fee-title">Fees Payment</h1>

          {/* YELLOW LINE */}

          <div className="fee-line"></div>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="fee-form">
            {/* REGISTRATION INPUT */}

            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter Applicant Registration No."
              className="form-control registration-input"
              required
            />

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="btn btn-light border submit-button"
            >
              Submit
            </button>

            {/* ERROR */}

            {error && <div className="text-danger mt-2">{error}</div>}
          </form>

          {/* PAYMENT LOGOS */}

          <div className="payment-logos">
            <span className="paypal-logo">PayPal</span>

            <span className="visa-logo">VISA</span>

            <span className="master-logo">
              <b>◯</b>
              <b>◯</b>
              <small>mastercard</small>
            </span>

            <span className="discover-logo">DISCOVER</span>
          </div>
        </section>
      )}

      {/* ==================================================
          CANDIDATE REGISTRATION DETAILS
      ================================================== */}

      {candidateData && (
        <section className="candidate-details-page">
          {/* TITLE */}

          <h1 className="candidate-title">Candidate Registration Details</h1>

          {/* FEES */}

          <p>
            <strong>Fees:-</strong> 118.00
          </p>

          {/* ID */}

          <p className="candidate-id">
            <strong>ID:-</strong> {candidateData.registrationNumber}
          </p>

          {/* REGISTRATION NUMBER */}

          <p className="registration-number">
            <strong>Registration No.:</strong>{" "}
            <span className="registration-code">
              VSPL{candidateData.registrationNumber}
            </span>
          </p>

          {/* DEPARTMENT */}

          <p>
            <strong>Department:</strong> Child Helpline Unit at District Child
            Protection Unit (DCPU)-Lakhimpur(Khiri)
          </p>

          {/* APPLY FOR */}

          <p>
            <strong>Apply For:</strong> {candidateData.applyFor}
          </p>

          {/* DETAILS GRID */}

          <div className="row candidate-grid">
            {/* APPLICANT */}

            <Detail
              label="Applicant Name"
              value={candidateData.applicantName}
            />

            {/* FATHER */}

            <Detail label="Father Name" value={candidateData.fatherName} />

            {/* MOTHER */}

            <Detail label="Mother Name" value={candidateData.motherName} />

            {/* DOB */}

            <Detail label="DOB(dd/MM/yyyy)" value={candidateData.dob} />

            {/* GENDER */}

            <Detail label="Gender" value={candidateData.gender} />

            {/* CASTE */}

            <Detail label="Caste" value={candidateData.caste} />

            {/* MOBILE */}

            <Detail label="Mobile No." value={candidateData.mobile} />

            {/* AADHAAR */}

            <Detail label="Aadhar No." value={candidateData.aadhar} />

            {/* EMAIL */}

            <Detail label="Email Id" value={candidateData.email} />

            {/* COUNTRY */}

            <Detail label="Country" value={candidateData.country} />

            {/* STATE */}

            <Detail label="State" value={candidateData.state} />

            {/* CITY */}

            <Detail label="City" value={candidateData.city} />

            {/* ADDRESS */}

            <Detail label="Address" value={candidateData.address} />

            {/* PIN CODE */}

            <Detail label="Pin Code" value={candidateData.pinCode} />

            {/* QUALIFICATION */}

            <Detail
              label="Highest Qualification"
              value={candidateData.qualification}
            />
          </div>

          {/* PAYMENT STATUS */}

          <p className="payment-status">
            <strong>Payment Status:</strong> Unpaid
          </p>

          {/* BUTTONS */}

          <div className="candidate-buttons">
            {/* PRINT */}

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
            >
              Print
            </button>

            {/* PAYMENT */}

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                alert("Payment & Confirm process started.");
              }}
            >
              Payment &amp; Confirm
            </button>
          </div>

          {/* PAYMENT LOGOS */}

          <div className="payment-logos candidate-payment-logos">
            <span className="paytm-logo">paytm</span>

            <span className="visa-logo">VISA</span>

            <span className="master-logo">
              <b>◯</b>
              <b>◯</b>
              <small>mastercard</small>
            </span>

            <span className="discover-logo">DISCOVER</span>
          </div>
        </section>
      )}

      {/* ==================================================
          RESPONSIVE CSS
      ================================================== */}

      <style>{`

        .fee-payment-page {

          width: 100%;

          font-family: Arial, sans-serif;

          color: #111;

        }


        .fee-payment-section {

          padding: 5px 27px 15px;

          min-height: 225px;

        }


        .fee-title {

          font-size: 29px;

          font-weight: 400;

          margin: 0;

        }


        .fee-line {

          width: 48px;

          height: 1px;

          background: #f4b400;

          margin-top: 11px;

          margin-bottom: 28px;

        }


        .fee-form {

          width: 100%;

        }


        .registration-input {

          height: 23px;

          border: 2px solid #222;

          border-radius: 0;

          padding: 1px 3px;

          font-size: 13px;

        }


        .submit-button {

          padding: 2px 6px;

          border-radius: 0;

          font-size: 13px;

          line-height: 18px;

        }


        .payment-logos {

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 10px;

          margin-top: 55px;

        }


        .payment-logos span {

          height: 35px;

          min-width: 52px;

          background: #000;

          color: #fff;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 3px;

          font-weight: bold;

        }


        .paypal-logo {

          font-style: italic;

          font-size: 13px;

        }


        .visa-logo {

          font-size: 20px;

          font-style: italic;

        }


        .master-logo {

          position: relative;

          gap: 0;

          font-size: 18px;

        }


        .master-logo small {

          position: absolute;

          bottom: 1px;

          font-size: 6px;

        }


        .discover-logo {

          font-size: 9px;

        }


        .candidate-details-page {

          min-height: 530px;

          padding: 5px 19px 10px;

          border-bottom: 10px solid #102d4a;

        }


        .candidate-title {

          font-size: 24px;

          font-weight: 400;

          margin: 0 0 8px;

        }


        .candidate-details-page p {

          font-size: 13px;

          margin-bottom: 18px;

          line-height: 1.5;

        }


        .candidate-id {

          margin-top: 22px;

        }


        .registration-number {

          margin-top: 18px;

        }


        .registration-code {

          background: transparent;

          padding: 2px 4px;

        }


        .candidate-grid {

          margin-top: 25px;

        }


        .candidate-grid p {

          margin-bottom: 18px;

        }


        .payment-status {

          margin-top: 2px;

        }


        .candidate-buttons {

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 3px;

          margin-top: 20px;

        }


        .candidate-payment-logos {

          margin-top: 17px;

        }


        .paytm-logo {

          font-size: 18px;

          background: transparent !important;

          color: #1477bd !important;

          font-weight: bold;

        }


        @media (max-width: 768px) {

          .fee-payment-section {

            padding: 15px;

          }


          .candidate-details-page {

            padding: 15px;

          }


          .candidate-title {

            font-size: 22px;

          }

        }


        @media print {

          body * {

            visibility: hidden;

          }


          .candidate-details-page,

          .candidate-details-page * {

            visibility: visible;

          }


          .candidate-details-page {

            position: absolute;

            left: 0;

            top: 0;

            width: 100%;

            border-bottom: none;

          }


          .candidate-buttons,

          .candidate-payment-logos {

            display: none;

          }

        }

      `}</style>
    </div>
  );
};

// ======================================================
// DETAILS COMPONENT
// ======================================================

const Detail = ({ label, value }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <p>
        <strong>{label}:</strong> {value}
      </p>
    </div>
  );
};

export default FeePayment;
