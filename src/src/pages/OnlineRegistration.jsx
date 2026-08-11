import React, {
  useState,
} from "react";

import {
  useCandidateRegistration,
} from "../context/CandidateRegistrationContext";


// ======================================================
// ONLINE REGISTRATION COMPONENT
// ======================================================

const OnlineRegistration = () => {


  // ======================================================
  // CANDIDATE REGISTRATION CONTEXT
  // ======================================================
  //
  // Context se candidate add karne ka function
  // use kiya ja raha hai.
  //
  // ======================================================

  const {
    addCandidate,
  } = useCandidateRegistration();


  // ======================================================
  // FORM INITIAL DATA
  // ======================================================
  //
  // Registration form ke sabhi fields ka default data.
  //
  // ======================================================

  const initialFormData = {

    applyFor: "",

    applicantName: "",

    fatherName: "",

    motherName: "",

    dob: "",

    gender: "",

    caste: "",

    mobile: "",

    aadhar: "",

    email: "",

    country: "India",

    state: "",

    city: "",

    address: "",

    pinCode: "",

    qualification: "",

  };


  // ======================================================
  // FORM DATA STATE
  // ======================================================

  const [
    formData,
    setFormData,
  ] = useState(initialFormData);


  // ======================================================
  // ERROR STATE
  // ======================================================

  const [
    errors,
    setErrors,
  ] = useState({});


  // ======================================================
  // REGISTERED CANDIDATE STATE
  // ======================================================

  const [
    registeredData,
    setRegisteredData,
  ] = useState(null);


  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================
  //
  // Form input ke andar value change hone par
  // ye function call hota hai.
  //
  // ======================================================

  const handleChange = (e) => {


    const {
      name,
      value,
    } = e.target;


    // --------------------------------------------------
    // Mobile aur Aadhaar me sirf numbers allow
    // --------------------------------------------------

    if (

      name === "mobile" ||

      name === "aadhar" ||

      name === "pinCode"

    ) {


      const onlyNumbers =
        value.replace(/\D/g, "");


      setFormData(

        (previousData) => ({

          ...previousData,

          [name]: onlyNumbers,

        })

      );


    } else {


      // --------------------------------------------------
      // Normal input value update
      // --------------------------------------------------

      setFormData(

        (previousData) => ({

          ...previousData,

          [name]: value,

        })

      );

    }


    // --------------------------------------------------
    // Field ka error remove
    // --------------------------------------------------

    setErrors(

      (previousErrors) => ({

        ...previousErrors,

        [name]: "",

      })

    );

  };


  // ======================================================
  // VALIDATE FORM
  // ======================================================
  //
  // Form ke required fields aur formats check karta hai.
  //
  // ======================================================

  const validateForm = () => {


    const newErrors = {};


    // --------------------------------------------------
    // Required fields check
    // --------------------------------------------------

    Object.keys(formData).forEach(

      (field) => {


        // Country ko required validation se exclude
        // kiya gaya hai kyunki default India hai.

        if (

          field !== "country" &&

          !String(formData[field]).trim()

        ) {


          newErrors[field] = "Required";

        }

      }

    );


    // --------------------------------------------------
    // Mobile Number Validation
    // --------------------------------------------------

    if (

      formData.mobile &&

      !/^[0-9]{10}$/.test(

        formData.mobile

      )

    ) {


      newErrors.mobile =
        "Enter valid 10 digit mobile number";

    }


    // --------------------------------------------------
    // Aadhaar Number Validation
    // --------------------------------------------------

    if (

      formData.aadhar &&

      !/^[0-9]{12}$/.test(

        formData.aadhar

      )

    ) {


      newErrors.aadhar =
        "Enter valid 12 digit Aadhaar number";

    }


    // --------------------------------------------------
    // Pin Code Validation
    // --------------------------------------------------

    if (

      formData.pinCode &&

      !/^[0-9]{6}$/.test(

        formData.pinCode

      )

    ) {


      newErrors.pinCode =
        "Enter valid 6 digit Pin Code";

    }


    // --------------------------------------------------
    // Email Validation
    // --------------------------------------------------

    if (

      formData.email &&

      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(

        formData.email

      )

    ) {


      newErrors.email =
        "Enter valid email address";

    }


    // --------------------------------------------------
    // Error State Update
    // --------------------------------------------------

    setErrors(newErrors);


    // --------------------------------------------------
    // Validation Result
    // --------------------------------------------------

    return (

      Object.keys(newErrors).length === 0

    );

  };


  // ======================================================
  // GENERATE REGISTRATION NUMBER
  // ======================================================
  //
  // Har candidate ke liye unique registration number
  // generate karta hai.
  //
  // Format:
  //
  // DCPU/2026/0001
  //
  // ======================================================

  const generateRegistrationNumber = () => {


    // --------------------------------------------------
    // Current Year
    // --------------------------------------------------

    const currentYear =
      new Date().getFullYear();


    // --------------------------------------------------
    // LocalStorage se last registration number
    // --------------------------------------------------

    const lastNumber =
      Number(

        localStorage.getItem(

          "lastCandidateRegistrationNumber"

        )

      ) || 0;


    // --------------------------------------------------
    // Next Number
    // --------------------------------------------------

    const nextNumber =
      lastNumber + 1;


    // --------------------------------------------------
    // Next Number ko LocalStorage me save
    // --------------------------------------------------

    localStorage.setItem(

      "lastCandidateRegistrationNumber",

      String(nextNumber)

    );


    // --------------------------------------------------
    // 4 Digit Number Format
    // --------------------------------------------------

    const paddedNumber =
      String(nextNumber).padStart(

        4,

        "0"

      );


    // --------------------------------------------------
    // Final Registration Number
    // --------------------------------------------------

    return `DCPU/${currentYear}/${paddedNumber}`;

  };


  // ======================================================
  // GENERATE CANDIDATE ID
  // ======================================================
  //
  // Candidate ke liye unique ID generate karta hai.
  //
  // ======================================================

  const generateCandidateId = () => {


    return (

      `CAND-${Date.now()}`

    );

  };


  // ======================================================
  // SAVE REGISTRATION
  // ======================================================
  //
  // Form submit hone par candidate data save karta hai.
  //
  // ======================================================

  const handleSubmit = async (e) => {


    // --------------------------------------------------
    // Browser ka default submit stop
    // --------------------------------------------------

    e.preventDefault();


    // --------------------------------------------------
    // Form Validation
    // --------------------------------------------------

    const isValid =
      validateForm();


    if (!isValid) {


      alert(

        "Please fill all required fields correctly."

      );


      return;

    }


    // ==================================================
    // REGISTRATION NUMBER GENERATE
    // ==================================================

    const registrationNumber =
      generateRegistrationNumber();


    // ==================================================
    // CANDIDATE ID GENERATE
    // ==================================================

    const candidateId =
      generateCandidateId();


    // ==================================================
    // COMPLETE CANDIDATE DATA
    // ==================================================

    const candidateData = {


      // --------------------------------------------------
      // Existing Form Data
      // --------------------------------------------------

      ...formData,


      // --------------------------------------------------
      // Unique Candidate ID
      // --------------------------------------------------

      id: candidateId,

      candidateId: candidateId,


      // --------------------------------------------------
      // Registration Number
      // --------------------------------------------------

      registrationNumber:

        registrationNumber,


      // Compatibility ke liye registrationNo bhi
      // same registration number rakha gaya hai.

      registrationNo:

        registrationNumber,


      // --------------------------------------------------
      // Payment Status
      // --------------------------------------------------

      paymentStatus: "Pending",


      // --------------------------------------------------
      // Candidate Status
      // --------------------------------------------------

      status: "Registered",


      // --------------------------------------------------
      // Registration Date
      // --------------------------------------------------

      registrationDate:

        new Date().toISOString(),

    };


    // ==================================================
    // CONTEXT ME SAVE
    // ==================================================

    let savedCandidate;

    try {
      savedCandidate = await addCandidate(candidateData);
    } catch (error) {
      console.error("Candidate registration failed:", error);
      alert(error.message || "Failed to submit registration.");
      return;
    }


    // ==================================================
    // REGISTERED DATA SHOW
    // ==================================================

    setRegisteredData(

      savedCandidate || candidateData

    );


    // ==================================================
    // PAGE TOP PAR SCROLL
    // ==================================================

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };


  // ======================================================
  // RESET FORM
  // ======================================================
  //
  // Form ko completely reset karta hai.
  //
  // ======================================================

  const handleReset = () => {


    setFormData(

      initialFormData

    );


    setErrors({});


    setRegisteredData(null);

  };


  // ======================================================
  // PRINT FUNCTION
  // ======================================================
  //
  // Candidate registration details ko print karta hai.
  //
  // ======================================================

  const handlePrint = () => {


    window.print();

  };


  // ======================================================
  // INPUT CLASS FUNCTION
  // ======================================================
  //
  // Error hone par input me is-invalid class add karta hai.
  //
  // ======================================================

  const inputClass = (field) => {


    return `form-control ${errors[field]

        ? "is-invalid"

        : ""

      }`;

  };


  // ======================================================
  // COMPONENT UI
  // ======================================================

  return (


    <div className="online-registration-page">


      {/* ==================================================
          ONLINE REGISTRATION FORM
      ================================================== */}

      {!registeredData && (


        <div className="container-fluid px-4 py-3">


          <h1 className="registration-title">

            Online Registration Form

          </h1>


          <p className="department-text">

            <strong>Department:</strong>{" "}

            Child Helpline Unit at District Child
            Protection Unit (DCPU)-Lakhimpur(Khiri)

          </p>


          {/* ==================================================
              REGISTRATION FORM
          ================================================== */}

          <form

            onSubmit={handleSubmit}

          >


            {/* ==================================================
                APPLY FOR
            ================================================== */}

            <div className="row mb-3">


              <div className="col-lg-6 col-md-8 col-12">


                <label className="form-label">


                  <strong>

                    Apply For:

                  </strong>


                </label>


                <select

                  name="applyFor"

                  value={formData.applyFor}

                  onChange={handleChange}

                  className={inputClass(

                    "applyFor"

                  )}

                >


                  <option value="">

                    ---Select Apply For Post---

                  </option>


                  <option value="Case Worker">

                    Case Worker

                  </option>


                  <option value="Child Helpline">

                    Child Helpline

                  </option>


                  <option value="Counsellor">

                    Counsellor

                  </option>


                  <option value="Social Worker">

                    Social Worker

                  </option>


                </select>


                {errors.applyFor && (


                  <small className="text-danger">

                    {errors.applyFor}

                  </small>

                )}


              </div>


            </div>


            {/* ==================================================
                ROW 1
            ================================================== */}

            <div className="row g-4 mb-3">


              <FormField

                label="Applicant Name*"

                name="applicantName"

                placeholder="Applicant Name*"

                value={formData.applicantName}

                onChange={handleChange}

                error={errors.applicantName}

              />


              <FormField

                label="Father Name*"

                name="fatherName"

                placeholder="Father Name*"

                value={formData.fatherName}

                onChange={handleChange}

                error={errors.fatherName}

              />


              <FormField

                label="Mother Name*"

                name="motherName"

                placeholder="Mother Name*"

                value={formData.motherName}

                onChange={handleChange}

                error={errors.motherName}

              />


            </div>


            {/* ==================================================
                ROW 2
            ================================================== */}

            <div className="row g-4 mb-4">


              <FormField

                label="DOB(dd/MM/yyyy)*"

                name="dob"

                type="date"

                value={formData.dob}

                onChange={handleChange}

                error={errors.dob}

              />


              <SelectField

                label="Gender*"

                name="gender"

                value={formData.gender}

                onChange={handleChange}

                error={errors.gender}

                options={[

                  "Male",

                  "Female",

                  "Other",

                ]}

              />


              <SelectField

                label="Caste*"

                name="caste"

                value={formData.caste}

                onChange={handleChange}

                error={errors.caste}

                options={[

                  "General",

                  "OBC",

                  "SC",

                  "ST",

                ]}

              />


            </div>


            {/* ==================================================
                ROW 3
            ================================================== */}

            <div className="row g-4 mb-4">


              <FormField

                label="Mobile No.*"

                name="mobile"

                placeholder="Mobile No.*"

                value={formData.mobile}

                onChange={handleChange}

                error={errors.mobile}

                maxLength="10"

              />


              <FormField

                label="Aadhar No.*"

                name="aadhar"

                placeholder="Aadhar"

                value={formData.aadhar}

                onChange={handleChange}

                error={errors.aadhar}

                maxLength="12"

              />


              <FormField

                label="Email Id*"

                name="email"

                type="email"

                placeholder="Email Id*"

                value={formData.email}

                onChange={handleChange}

                error={errors.email}

              />


            </div>


            {/* ==================================================
                ROW 4
            ================================================== */}

            <div className="row g-4 mb-4">


              <div className="col-lg-4 col-md-6 col-12">


                <label className="form-label">


                  <strong>

                    Country:*

                  </strong>


                </label>


                <select

                  name="country"

                  value={formData.country}

                  onChange={handleChange}

                  className="form-control"

                >


                  <option value="India">

                    India

                  </option>


                </select>


              </div>


              <SelectField

                label="State:*"

                name="state"

                value={formData.state}

                onChange={handleChange}

                error={errors.state}

                options={[

                  "Uttar Pradesh",

                  "Madhya Pradesh",

                  "Rajasthan",

                  "Bihar",

                  "Delhi",

                ]}

                placeholder="-----Select State-----"

              />


              <SelectField

                label="City:*"

                name="city"

                value={formData.city}

                onChange={handleChange}

                error={errors.city}

                options={[

                  "Lakhimpur Kheri",

                  "Lucknow",

                  "Kanpur",

                  "Varanasi",

                  "Agra",

                ]}

              />


            </div>


            {/* ==================================================
                ROW 5
            ================================================== */}

            <div className="row g-4 mb-4">


              <div className="col-lg-4 col-md-6 col-12">


                <label className="form-label">


                  <strong>

                    Address:*

                  </strong>


                </label>


                <textarea

                  name="address"

                  placeholder="Address*"

                  value={formData.address}

                  onChange={handleChange}

                  className={inputClass(

                    "address"

                  )}

                  rows="2"

                />


                {errors.address && (


                  <small className="text-danger">

                    {errors.address}

                  </small>

                )}


              </div>


              <FormField

                label="Pin Code*"

                name="pinCode"

                placeholder="Pin Code*"

                value={formData.pinCode}

                onChange={handleChange}

                error={errors.pinCode}

                maxLength="6"

              />


              <FormField

                label="Highest Qualification*"

                name="qualification"

                placeholder="Highest Qualification*"

                value={formData.qualification}

                onChange={handleChange}

                error={errors.qualification}

              />


            </div>


            {/* ==================================================
                FORM BUTTONS
            ================================================== */}

            <div className="d-flex justify-content-center gap-5">


              <button

                type="submit"

                className="btn btn-light border px-3 py-1"

              >

                Save

              </button>


              <button

                type="button"

                onClick={handleReset}

                className="btn btn-light border px-3 py-1"

              >

                Reset

              </button>


            </div>


          </form>


        </div>

      )}


      {/* ==================================================
          CANDIDATE DETAILS
      ================================================== */}

      {registeredData && (


        <CandidateDetails

          candidate={registeredData}

          onPrint={handlePrint}

        />

      )}


      {/* ==================================================
          RESPONSIVE CSS
      ================================================== */}

      <style>{`


        .online-registration-page {

          width: 100%;

          color: #111;

          font-family: Arial, sans-serif;

        }


        .registration-title {

          font-size: 24px;

          font-weight: 400;

          margin-bottom: 8px;

        }


        .department-text {

          font-size: 13px;

        }


        .form-label {

          font-size: 13px;

          margin-bottom: 6px;

        }


        .form-control {

          font-size: 13px;

        }


        .candidate-details-page {

          min-height: 530px;

          padding: 16px 42px 20px;

          border-top: 3px solid #18334c;

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

          background: #d6d6d6;

          padding: 2px 4px;

          font-weight: bold;

        }


        .candidate-grid {

          margin-top: 25px;

        }


        .candidate-buttons {

          display: flex;

          justify-content: center;

          gap: 3px;

          margin-top: 20px;

        }


        @media (max-width: 768px) {


          .candidate-details-page {

            padding: 16px;

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

            border-top: none;

            padding: 20px 42px;

          }


          .candidate-buttons {

            display: none;

          }


        }


      `}</style>


    </div>

  );

};


// ======================================================
// CANDIDATE DETAILS COMPONENT
// ======================================================
//
// Registration ke baad candidate ka complete data show karta hai.
//
// ======================================================

const CandidateDetails = ({

  candidate,

  onPrint,

}) => {


  // ==================================================
  // SAFE REGISTRATION NUMBER
  // ==================================================

  const registrationNumber =

    candidate.registrationNumber ||

    candidate.registrationNo ||

    "Not Generated";


  return (


    <div className="candidate-details-page">


      <h1 className="candidate-title">

        Candidate Registration Details

      </h1>


      <p>

        <strong>Fees:-</strong>{" "}

        118.00

      </p>


      <p className="candidate-id">


        <strong>ID:-</strong>{" "}


        {candidate.id ||

          candidate.candidateId ||

          "Not Available"}


      </p>


      <p className="registration-number">


        <strong>

          Registration No.:

        </strong>{" "}


        <span className="registration-code">


          {registrationNumber}


        </span>


      </p>


      <p>


        <strong>Department:</strong>{" "}


        Child Helpline Unit at District Child

        Protection Unit (DCPU)-Lakhimpur(Khiri)


      </p>


      <p>


        <strong>Apply For:</strong>{" "}


        {candidate.applyFor}


      </p>


      <div className="row candidate-grid">


        <Detail

          label="Applicant Name"

          value={candidate.applicantName}

        />


        <Detail

          label="Father Name"

          value={candidate.fatherName}

        />


        <Detail

          label="Mother Name"

          value={candidate.motherName}

        />


        <Detail

          label="DOB(dd/MM/yyyy)"

          value={candidate.dob}

        />


        <Detail

          label="Gender"

          value={candidate.gender}

        />


        <Detail

          label="Caste"

          value={candidate.caste}

        />


        <Detail

          label="Mobile No."

          value={candidate.mobile}

        />


        <Detail

          label="Aadhar No."

          value={candidate.aadhar}

        />


        <Detail

          label="Email Id"

          value={candidate.email}

        />


        <Detail

          label="Country"

          value={candidate.country}

        />


        <Detail

          label="State"

          value={candidate.state}

        />


        <Detail

          label="City"

          value={candidate.city}

        />


        <Detail

          label="Address"

          value={candidate.address}

        />


        <Detail

          label="Pin Code"

          value={candidate.pinCode}

        />


        <Detail

          label="Highest Qualification"

          value={candidate.qualification}

        />


      </div>


      <p>


        <strong>

          Payment Status:

        </strong>{" "}


        {candidate.paymentStatus || "Pending"}


      </p>


      <div className="candidate-buttons">


        <button

          type="button"

          className="btn btn-primary btn-sm"

          onClick={onPrint}

        >


          Print


        </button>


      </div>


    </div>

  );

};


// ======================================================
// FORM FIELD COMPONENT
// ======================================================
//
// Reusable input field component.
//
// ======================================================

const FormField = ({

  label,

  name,

  type = "text",

  placeholder,

  value,

  onChange,

  error,

  maxLength,

}) => {


  return (


    <div className="col-lg-4 col-md-6 col-12">


      <label className="form-label">


        <strong>

          {label}

        </strong>


      </label>


      <input

        type={type}

        name={name}

        placeholder={placeholder}

        value={value}

        onChange={onChange}

        maxLength={maxLength}

        className={`form-control ${error

            ? "is-invalid"

            : ""

          }`}

      />


      {error && (


        <small className="text-danger">


          {error}


        </small>


      )}


    </div>

  );

};


// ======================================================
// SELECT FIELD COMPONENT
// ======================================================
//
// Reusable select dropdown component.
//
// ======================================================

const SelectField = ({

  label,

  name,

  value,

  onChange,

  error,

  options,

  placeholder = "--Select--",

}) => {


  return (


    <div className="col-lg-4 col-md-6 col-12">


      <label className="form-label">


        <strong>

          {label}

        </strong>


      </label>


      <select

        name={name}

        value={value}

        onChange={onChange}

        className={`form-control ${error

            ? "is-invalid"

            : ""

          }`}

      >


        <option value="">


          {placeholder}


        </option>


        {options.map((option) => (


          <option

            key={option}

            value={option}

          >


            {option}


          </option>


        ))}


      </select>


      {error && (


        <small className="text-danger">


          {error}


        </small>


      )}


    </div>

  );

};


// ======================================================
// DETAIL COMPONENT
// ======================================================
//
// Candidate details ke liye reusable component.
//
// ======================================================

const Detail = ({

  label,

  value,

}) => {


  return (


    <div className="col-lg-4 col-md-6 col-12">


      <p>


        <strong>

          {label}:

        </strong>{" "}


        {value || "N/A"}


      </p>


    </div>

  );

};


// ======================================================
// EXPORT COMPONENT
// ======================================================

export default OnlineRegistration;
