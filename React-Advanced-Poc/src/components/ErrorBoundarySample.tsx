import React from "react";
import ErrorBoundaryComp from "./ErrorBoundaryComp";
import BuggyComponent from "./BuggyComponent";

const ErrorBoundarySample: React.FC = () => {
  return (
    <ErrorBoundaryComp>
      <h1>Welcome to the App</h1>
      <BuggyComponent />
    </ErrorBoundaryComp>
  );
};

export default ErrorBoundarySample;
