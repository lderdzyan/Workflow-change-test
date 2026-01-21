import { Person } from "@repo/gui-sdk";
import * as O from "fp-ts/Option";

const PendoAPIKey = "ce0f5c6b-82a3-4ea8-7f4b-e5678797f2bd";

type InitializePendo = () => void;
export const initializePendo: InitializePendo = () => {
  const existingScript = document.getElementById("pendoScript");
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "pendoScript";
  script.async = true;
  script.innerHTML = `(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('${PendoAPIKey}');`;

  document.head.appendChild(script);
};

type InitializePendoUser = (person: Person) => void;
export const initializePendoUser: InitializePendoUser = (person) => {
  const returnUserData = (person: Person) => {
    if (O.isSome(person.user)) {
      const user = person.user.value;
      return {
        email: user.identity,
        first_name: user.firstName,
        last_name: user.lastName,
        user_type: user.userTypes ? user.userTypes.join(", ") : "",
      };
    }
    return {};
  };
  window.pendo.initialize({
    visitor: {
      id: person.pid,
      ...returnUserData(person),
    },
  });
};
