import { createContext } from "react";

const EndPointContext = createContext();
function EndPointContextProvider(props) {
  const ENDPOINT = "http://localhost:4000/";
  return (
    <EndPointContext.Provider value={{ ENDPOINT }}>
      {props.children}
    </EndPointContext.Provider>
  );
}

export default EndPointContext;
export { EndPointContextProvider };
