import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyVueInReact } from "veaury";

import RegisterVue from "../pages/RegisterVue.vue";
const RegisterComp = applyVueInReact(RegisterVue);

const Register = () => {
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    navigate("/login");
  }

  return (
    <>
      <RegisterComp onRegistrationSuccess={handleRegistrationSuccess} />
    </>
  );
};

export default Register;
