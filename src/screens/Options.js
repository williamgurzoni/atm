import React from "react";
import { Subscribe } from "unstated";
import AppContainer from "../containers/AppContainer";
import { SCREEN } from "../types";

const Options = () => {
  return (
    <Subscribe to={[AppContainer]}>
      {app => {
        return (
          <div className="content">
            <span>Please choose an option:</span>

            <div
              className="key"
              onClick={() => app.setScreen(SCREEN.ADD_NOTES)}
            >
              Add Notes (admin)
            </div>
            {/*
            <div
              className="key"
              onClick={() => app.setScreen(SCREEN.REMOVE_NOTES)}
            >
              Remove Notes (admin)
            </div>
            */}
            <div
              className="key"
              onClick={() => app.setScreen(SCREEN.SHOW_INFO)}
            >
              Show total available
            </div>
            <div className="key" onClick={() => app.setScreen(SCREEN.WITHDRAW)}>
              Withdraw
            </div>
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Options;
