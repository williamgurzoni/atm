import React from "react";
import { Subscribe } from "unstated";
import AppContainer from "../containers/AppContainer";

const Withdraw = () => {
  return (
    <Subscribe to={[AppContainer]}>
      {app => {
        return (
          <div className="content">
            <div>Inform amount to withdraw:</div>
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Withdraw;
