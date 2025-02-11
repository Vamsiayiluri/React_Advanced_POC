import React from "react";
import BuggyComponent from "./BuggyComponent";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const ErrorBoundaryFunctionalComp: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BuggyComponent />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryFunctionalComp;
