import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Visiting /logout clears all stored auth data and redirects to login
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/emp-login", { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;
