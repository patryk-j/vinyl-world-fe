import React from "react";
import { applyVueInReact } from "veaury";

import Basic from "../components/Basic.vue";
const BasicComponent = applyVueInReact(Basic);

const Home = () => {
  return (
    <>
      <BasicComponent />
    </>
  );
};

export default Home;
