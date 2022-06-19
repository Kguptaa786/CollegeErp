import { createContext } from "react";

const EndPointContext = createContext();
function EndPointContextProvider(props) {
  const ENDPOINT = "";
  return (
    <EndPointContext.Provider value={{ ENDPOINT }}>
      {props.children}
    </EndPointContext.Provider>
  );
}

export default EndPointContext;
export { EndPointContextProvider };
