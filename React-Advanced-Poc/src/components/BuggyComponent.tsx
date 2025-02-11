import React from "react";

const BuggyComponent: React.FC = () => {
  throw new Error("I crashed!");
};

export default BuggyComponent;
