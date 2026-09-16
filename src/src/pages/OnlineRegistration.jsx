import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCandidateRegistration } from "../context/CandidateRegistrationContext";

const OnlineRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCandidate } = useCandidateRegistration();

  // ======================================================
  // ADMIN FEES FROM NOTIFICATIONS PAGE
  // ======================================================
  const [applicationFees, setApplicationFees] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // ======================================================
  // FORM DATA
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

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);
  const [copied, setCopied] = useState(false);

  // ======================================================
  // LOAD FEES + DEPARTMENT (strong + reliable)
  // ======================================================
  const loadApplicationFees = () => {
    try {
      const params = new URLSearchParams(location.search || window.location.search);

      const feeFromUrl = params.get("fees");
      const departmentFromUrl = params.get("department");
      const notificationId =
        params.get("notificationId") ||
        localStorage.getItem("selectedNotificationId");

      const storedFees = localStorage.getItem("selectedApplicationFees");
      const storedDepartment = localStorage.getItem("selectedDepartment");
      const storedApplyFor = localStorage.getItem("selectedApplyFor");

      let finalFees = feeFromUrl || storedFees || "";
      let finalDepartment = departmentFromUrl || storedDepartment || "";
      let finalApplyFor = departmentFromUrl || storedApplyFor || storedDepartment || "";

      // 1. Try to find exact vacancy by notificationId
      const vacancies =
        JSON.parse(localStorage.getItem("vani_vacancies")) || [];

      if (notificationId && vacancies.length > 0) {
        const selectedVacancy = vacancies.find(
          (item) => String(item.id) === String(notificationId)
        );

        if (selectedVacancy) {
          if (
            selectedVacancy.fees !== undefined &&
            selectedVacancy.fees !== null &&
            String(selectedVacancy.fees).trim() !== ""
          ) {
            finalFees = selectedVacancy.fees;
          }
          if (selectedVacancy.department) {
            finalDepartment = selectedVacancy.department;
            finalApplyFor = selectedVacancy.department;
          }
        }
      }

      // 2. Fallback → last uploaded vacancy (most recent)
      if (
        (!finalFees || String(finalFees).trim() === "") &&
        vacancies.length > 0
      ) {
        const latest = vacancies[vacancies.length - 1];
        if (latest && latest.fees !== undefined && latest.fees !== null) {
          finalFees = latest.fees;
          if (latest.department) {
            finalDepartment = latest.department;
            finalApplyFor = latest.department;
          }
          localStorage.setItem("selectedApplicationFees", String(latest.fees));
          if (latest.id) {
            localStorage.setItem("selectedNotificationId", String(latest.id));
          }
        }
      }

      // 3. Set the fees
      if (finalFees !== null && finalFees !== undefined && String(finalFees).trim() !== "") {
        setApplicationFees(String(finalFees).trim());
        localStorage.setItem("selectedApplicationFees", String(finalFees).trim());
      }

      if (finalDepartment) {
        setSelectedDepartment(finalDepartment);
      }

      // Pre-fill Apply For field so user does not need to select
      if (finalApplyFor) {
        setFormData((prev) => ({
          ...prev,
          applyFor: finalApplyFor,
        }));
      }
    } catch (error) {
      console.error("Failed to load application fees:", error);
    }
  };

  // Run on mount + when URL changes
  useEffect(() => {
    loadApplicationFees();
  }, [location.search]);

  // Also keep checking (for same-tab updates from Admin)
  useEffect(() => {
    const interval = setInterval(() => {
      loadApplicationFees();
    }, 1500);

    window.addEventListener("storage", loadApplicationFees);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadApplicationFees);
    };
  }, []);

  // ======================================================
  // HANDLE INPUT
  // ======================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "mobile" || name === "aadhar" || name === "pinCode") {
      newValue = value.replace(/\D/g, "");
    }

    setFormData((previous) => ({
      ...previous,
      [name]: newValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // ======================================================
  // VALIDATE
  // ======================================================
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (field !== "country" && !String(formData[field]).trim()) {
        newErrors[field] = "Required";
      }
    });

    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    if (formData.aadhar && !/^[0-9]{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = "Enter valid 12 digit Aadhaar number";
    }

    if (formData.pinCode && !/^[0-9]{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Enter valid 6 digit Pin Code";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // GENERATE REGISTRATION NUMBER
  // ======================================================
  const generateRegistrationNumber = () => {
    let number;
    do {
      number = `VSPL${Math.floor(10000 + Math.random() * 90000)}`;
    } while (localStorage.getItem(`registration_${number}`));
    return number;
  };

  // ======================================================
  // GENERATE CANDIDATE ID
  // ======================================================
  const generateCandidateId = () => {
    return `CAND-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // ======================================================
  // SUBMIT REGISTRATION
  // ======================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateForm()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    if (!applicationFees || applicationFees === "") {
      alert(
        "Application fees not available. Please go to Notifications page and click Apply."
      );
      return;
    }

    const registrationNumber = generateRegistrationNumber();
    const candidateId = generateCandidateId();

    const candidateData = {
      ...formData,
      id: candidateId,
      candidateId,
      registrationNumber,
      registrationNo: registrationNumber,
      fees: applicationFees,
      amount: applicationFees,
      paymentAmount: applicationFees,
      paymentStatus: "Pending",
      status: "Registered",
      registrationDate: new Date().toISOString(),
      department: selectedDepartment || formData.applyFor || "",
    };

    try {
      setLoading(true);

      const savedCandidate = await addCandidate(candidateData);
      const serverCandidate = savedCandidate || candidateData;

      const finalRegistrationNumber =
        serverCandidate.registrationNumber ||
        serverCandidate.registrationNo ||
        registrationNumber;

      const finalAmount =
        serverCandidate.fees ??
        serverCandidate.amount ??
        serverCandidate.paymentAmount ??
        applicationFees;

      const completeCandidate = {
        ...serverCandidate,
        registrationNumber: finalRegistrationNumber,
        registrationNo: finalRegistrationNumber,
        fees: String(finalAmount),
        amount: String(finalAmount),
        paymentAmount: String(finalAmount),
        paymentStatus: serverCandidate.paymentStatus || "Pending",
        status: serverCandidate.status || "Registered",
      };

      localStorage.setItem(
        `registration_${finalRegistrationNumber}`,
        JSON.stringify(completeCandidate)
      );
      localStorage.setItem("lastRegistrationNumber", finalRegistrationNumber);
      localStorage.setItem("paymentRegistrationNumber", finalRegistrationNumber);
      localStorage.setItem("paymentAmount", String(finalAmount));
      localStorage.setItem("selectedApplicationFees", String(finalAmount));

      setRegisteredData(completeCandidate);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Candidate registration failed:", error);
      alert(error?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RESET
  // ======================================================
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setRegisteredData(null);
    setCopied(false);
  };

  // ======================================================
  // COPY REGISTRATION NUMBER
  // ======================================================
  const handleCopy = async () => {
    const number =
      registeredData?.registrationNumber ||
      registeredData?.registrationNo;

    if (!number) return;

    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = number;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ======================================================
  // OPEN PAYMENT
  // ======================================================
  const handlePayFees = () => {
    if (!registeredData) return;

    const registrationNumber =
      registeredData.registrationNumber ||
      registeredData.registrationNo;

    const amount =
      registeredData.fees ||
      registeredData.amount ||
      registeredData.paymentAmount ||
      applicationFees;

    if (!registrationNumber) {
      alert("Registration number not found.");
      return;
    }

    localStorage.setItem("paymentRegistrationNumber", registrationNumber);
    localStorage.setItem("paymentAmount", String(amount));

    navigate(
      `/fee-payment?registrationNumber=${encodeURIComponent(
        registrationNumber
      )}&amount=${encodeURIComponent(amount)}`
    );
  };

  // ======================================================
  // PRINT
  // ======================================================
  const handlePrint = () => {
    window.print();
  };

  // ======================================================
  // SUCCESS PAGE
  // ======================================================
  if (registeredData) {
    const registrationNumber =
      registeredData.registrationNumber ||
      registeredData.registrationNo;

    const amount =
      registeredData.fees ||
      registeredData.amount ||
      registeredData.paymentAmount;

    return (
      <section className="candidate-details-page">
        <div className="container">
          <h1>Candidate Registration Details</h1>

          <div className="alert alert-success">
            Registration completed successfully.
          </div>

          <div className="registration-box">
            <h5>Registration Number</h5>
            <div className="registration-number">
              {registrationNumber}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-3"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="details-card">
            <div className="row">
              <Detail label="Applicant Name" value={registeredData.applicantName} />
              <Detail label="Father Name" value={registeredData.fatherName} />
              <Detail label="Mother Name" value={registeredData.motherName} />
              <Detail label="DOB" value={registeredData.dob} />
              <Detail label="Gender" value={registeredData.gender} />
              <Detail label="Caste" value={registeredData.caste} />
              <Detail label="Mobile" value={registeredData.mobile} />
              <Detail label="Aadhar" value={registeredData.aadhar} />
              <Detail label="Email" value={registeredData.email} />
              <Detail label="Country" value={registeredData.country} />
              <Detail label="State" value={registeredData.state} />
              <Detail label="City" value={registeredData.city} />
              <Detail label="Address" value={registeredData.address} />
              <Detail label="Pin Code" value={registeredData.pinCode} />
              <Detail label="Qualification" value={registeredData.qualification} />
              <Detail label="Apply For" value={registeredData.applyFor || registeredData.department} />
            </div>
          </div>

          <div className="payment-box">
            <h5>Application Fees</h5>
            <div className="fee-amount">₹{amount}</div>
            <p>
              Registration Number: <strong>{registrationNumber}</strong>
            </p>
            <p>
              Payment Status:{" "}
              <strong className="text-warning">Pending</strong>
            </p>
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={handlePayFees}
            >
              Pay Fees ₹{amount}
            </button>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePrint}
            >
              Print Registration
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              New Registration
            </button>
          </div>
        </div>

        <style>{`
          .candidate-details-page {
            min-height: 600px;
            padding: 40px 20px;
            background: #fff;
          }
          .registration-box {
            margin-top: 25px;
            padding: 20px;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            background: #f8f9fa;
          }
          .registration-number {
            margin-top: 10px;
            display: inline-flex;
            align-items: center;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #0d2744;
          }
          .details-card {
            margin-top: 20px;
            padding: 25px;
            border: 1px solid #dee2e6;
            border-radius: 8px;
          }
          .payment-box {
            margin-top: 25px;
            padding: 25px;
            border-radius: 8px;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
          }
          .fee-amount {
            font-size: 30px;
            font-weight: 700;
            margin: 10px 0 15px;
            color: #198754;
          }
          @media print {
            body * { visibility: hidden; }
            .candidate-details-page,
            .candidate-details-page * { visibility: visible; }
            .candidate-details-page {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            button { display: none !important; }
          }
        `}</style>
      </section>
    );
  }

  // ======================================================
  // REGISTRATION FORM
  // ======================================================
  return (
    <section className="online-registration-page">
      <div className="container-fluid px-4 py-4">
        <h1 className="registration-title">Online Registration Form</h1>

        <p>
          <strong>Department:</strong>{" "}
          {selectedDepartment
            ? selectedDepartment
            : "Child Helpline Unit at District Child Protection Unit (DCPU)-Lakhimpur(Khiri)"}
        </p>

        {/* ==================================================
            APPLICATION FEES BOX
        ================================================== */}
        <div className="alert alert-info d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <strong>Application Fees:</strong>{" "}
            {applicationFees ? (
              <span className="fw-bold text-success fs-5">
                ₹{applicationFees}
              </span>
            ) : (
              <span className="text-danger">
                Not Available – Please click Apply from Notifications page
              </span>
            )}
          </div>
          <small>
            Fees admin ke Notifications page se automatically aayi hai.
          </small>
        </div>

        <form onSubmit={handleSubmit}>
          {/* APPLY FOR – pre-filled when coming from Apply button */}
          <div className="row mb-4">
            <div className="col-lg-4 col-md-6 col-12">
              <label className="form-label">
                <strong>Apply For:*</strong>
              </label>
              <select
                name="applyFor"
                value={formData.applyFor}
                onChange={handleChange}
                className={`form-control ${errors.applyFor ? "is-invalid" : ""}`}
              >
                <option value="">---Select Apply For Post---</option>
                
                {/* Also show the exact department name if it came from vacancy */}
                {selectedDepartment &&
                  ![
                    "Case Worker",
                    "Child Helpline",
                    "Counsellor",
                    "Social Worker",
                  ].includes(selectedDepartment) && (
                    <option value={selectedDepartment}>
                      {selectedDepartment}
                    </option>
                  )}
              </select>
              {errors.applyFor && (
                <small className="text-danger">{errors.applyFor}</small>
              )}
              {formData.applyFor && (
                <small className="text-success d-block mt-1">
                  Selected Post: {formData.applyFor}
                </small>
              )}
            </div>
          </div>

          {/* ROW 1 */}
          <div className="row g-4 mb-4">
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

          {/* ROW 2 */}
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
              options={["Male", "Female", "Other"]}
            />
            <SelectField
              label="Caste*"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              error={errors.caste}
              options={["General", "OBC", "SC", "ST"]}
            />
          </div>

          {/* ROW 3 */}
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
              placeholder="Aadhar No.*"
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

          {/* ROW 4 */}
          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-md-6 col-12">
              <label className="form-label">
                <strong>Country:*</strong>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
              >
                <option value="India">India</option>
              </select>
            </div>

            <SelectField
              label="State:*"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              placeholder="-----Select State-----"
             options={[
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
]}
            />

            <SelectField
              label="City:*"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
             options={[
  "Agra",
  "Aligarh",
  "Ambedkar Nagar",
  "Amethi",
  "Amroha",
  "Auraiya",
  "Ayodhya",
  "Azamgarh",
  "Baghpat",
  "Bahraich",
  "Ballia",
  "Balrampur",
  "Banda",
  "Barabanki",
  "Bareilly",
  "Basti",
  "Bhadohi",
  "Bijnor",
  "Budaun",
  "Bulandshahr",
  "Chandauli",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Etawah",
  "Farrukhabad",
  "Fatehpur",
  "Firozabad",
  "Gautam Buddha Nagar",
  "Ghaziabad",
  "Ghazipur",
  "Gonda",
  "Gorakhpur",
  "Hamirpur",
  "Hapur",
  "Hardoi",
  "Hathras",
  "Jalaun",
  "Jaunpur",
  "Jhansi",
  "Kannauj",
  "Kanpur Dehat",
  "Kanpur Nagar",
  "Kasganj",
  "Kaushambi",
  "Kheri",
  "Kushinagar",
  "Lakhimpur Kheri",
  "Lalitpur",
  "Lucknow",
  "Maharajganj",
  "Mahoba",
  "Mainpuri",
  "Mathura",
  "Mau",
  "Meerut",
  "Mirzapur",
  "Moradabad",
  "Muzaffarnagar",
  "Pilibhit",
  "Pratapgarh",
  "Prayagraj",
  "Raebareli",
  "Rampur",
  "Saharanpur",
  "Sambhal",
  "Sant Kabir Nagar",
  "Shahjahanpur",
  "Shamli",
  "Shravasti",
  "Siddharthnagar",
  "Sitapur",
  "Sonbhadra",
  "Sultanpur",
  "Unnao",
  "Varanasi"
]}
            />
          </div>

          {/* ROW 5 */}
          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-md-6 col-12">
              <label className="form-label">
                <strong>Address:*</strong>
              </label>
              <textarea
                name="address"
                placeholder="Address*"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
              />
              {errors.address && (
                <small className="text-danger">{errors.address}</small>
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
              FEES PAYABLE (BOTTOM)
          ================================================== */}
          <div className="alert alert-warning">
            <strong>Fees Payable:</strong>{" "}
            {applicationFees ? (
              <span className="fw-bold text-success fs-5">
                ₹{applicationFees}
              </span>
            ) : (
              <span className="text-danger">Not Available</span>
            )}
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-center gap-4">
            <button
              type="submit"
              className="btn btn-primary px-5"
              disabled={loading || !applicationFees}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>

            <button
              type="button"
              className="btn btn-light border px-5"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .online-registration-page {
          width: 100%;
          background: #fff;
          min-height: 600px;
        }
        .registration-title {
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 8px;
        }
        .form-label {
          font-size: 13px;
          margin-bottom: 6px;
        }
        .form-control {
          font-size: 13px;
        }
        @media print {
          .online-registration-page {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

// ======================================================
// FORM FIELD
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
        <strong>{label}</strong>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

// ======================================================
// SELECT FIELD
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
        <strong>{label}</strong>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

// ======================================================
// DETAIL
// ======================================================
const Detail = ({ label, value }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12 mb-3">
      <strong>{label}:</strong> <span>{value || "N/A"}</span>
    </div>
  );
};

export default OnlineRegistration;
