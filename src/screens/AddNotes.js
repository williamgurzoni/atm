import React from "react";
import { NOTE_TYPE } from "../types";
import { Subscribe } from "unstated";
import AppContainer from "../containers/AppContainer";

const AddNotes = () => {
  return (
    <Subscribe to={[AppContainer]}>
      {app => {
        const { noteSelected } = app.state;

        return (
          <div className="content">
            <span>Choose note type:</span>
            {Object.values(NOTE_TYPE).map((value, key) => (
              <div
                className={`key ${noteSelected === key ? "active" : null}`}
                key={key}
                onClick={() => app.selectNoteType(key)}
              >
                $ {value}
              </div>
            ))}
            {noteSelected !== null ? (
              <span>
                How many notes notes of{" $"}
                {Object.values(NOTE_TYPE).find(
                  (value, key) => key === noteSelected
                )}
                ?
              </span>
            ) : null}
          </div>
        );
      }}
    </Subscribe>
  );
};

export default AddNotes;
