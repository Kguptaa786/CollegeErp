import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { EndPointContextProvider } from "./context/EndPointContext";

function App() {
  return (
    <>
      <EndPointContextProvider>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </EndPointContextProvider>
    </>
  );
}

export default App;
