import { Provider } from "react-redux";
import "./App.css";
import ErrorBoundaryFunctionalComp from "./components/ErrorBoundaryFunctionalComp";
import ErrorBoundarySample from "./components/ErrorBoundarySample";
import FirebaseSample from "./components/FirebaseSample";

import React, { Suspense } from "react";
import PostComponent from "./components/PostComponent";
import { store } from "./appStore/store";
import Counter from "./components/TestingComponents/Counter";
import TodoList from "./components/TestingComponents/TodoList";
const TransitionComponent = React.lazy(
  () => import("./components/TransitionComponent")
);
function App() {
  return (
    <>
      <h1>Welcome to My App</h1>
      {/* Axios interceptors sample */}
      <>
        <FirebaseSample></FirebaseSample>
      </>
      {/* Error boundaries and error handling sample */}
      <>
        <ErrorBoundarySample></ErrorBoundarySample>
        <ErrorBoundaryFunctionalComp></ErrorBoundaryFunctionalComp>
      </>
      {/* Redux middleware saga sample */}
      <>
        <Provider store={store}>
          <PostComponent />
        </Provider>
      </>
      {/* React 18 features */}
      <>
        <Suspense fallback={<p>Loading...</p>}>
          <TransitionComponent></TransitionComponent>
        </Suspense>
      </>
      <>
        {/* Sample components for testing  */}
        {/* Test cases in tests folder */}

        <Counter></Counter>
        <TodoList></TodoList>
      </>
    </>
  );
}

export default App;
