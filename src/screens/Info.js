import React from "react";
import { NOTE_TYPE } from "../types";
import { Subscribe } from "unstated";
import AppContainer from "../containers/AppContainer";

const Info = () => {
  return (
    <Subscribe to={[AppContainer]}>
      {app => {
        const { notes } = app.state;

        return (
          <div className="content">
            {Object.values(NOTE_TYPE).map((value, key) => (
              <div key={key}>
                $ {value} : {notes[key]}
              </div>
            ))}
            Total: {app.getTotalAtm()}
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Info;
