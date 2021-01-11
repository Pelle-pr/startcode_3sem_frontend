import { URL } from "../utils/settings";
import apiFacade, { handleHttpErrors } from "./apiFacade";

const exampleFacade = () => {
  const exampleMethod1 = () => {
    return fetch(URL + "/api/example", apiFacade.makeOptions("GET", true)).then(
      handleHttpErrors
    );
  };

  const getStudents = () => {
    return fetch(
      URL + "/api/example/students",
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  return { exampleMethod1, getStudents };
};

const facade = exampleFacade();
export default facade;
