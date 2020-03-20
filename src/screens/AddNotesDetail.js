import React from "react";
import { NOTE_TYPE } from "../types";

const AddNotesDetail = () => {
  return (
    <div className="content">
      <span>Choose note type:</span>
      <ol>
        {Object.values(NOTE_TYPE).map((value, key) => (
          <li className="liNoDecoration" key={key}>
            {key}. {value}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AddNotesDetail;
