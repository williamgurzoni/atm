import React, { Component } from "react";
import "./App.css";
import { SCREEN } from "./types";
import Options from "./screens/Options";
import AddNotes from "./screens/AddNotes";
import { Subscribe } from "unstated";
import AppContainer from "./containers/AppContainer";
import Info from "./screens/Info";
import Withdraw from "./screens/Withdraw";

class App extends Component {
  componentDidMount = () => {};

  renderContent = () => {
    switch (this.app.state.screen) {
      case SCREEN.SHOW_OPTIONS:
        return <Options />;
      case SCREEN.ADD_NOTES:
        return <AddNotes />;
      case SCREEN.SHOW_INFO:
        return <Info />;
      case SCREEN.WITHDRAW:
        return <Withdraw />;
      default:
        break;
    }
  };

  renderKeyboard = keyboard => <span>: {keyboard}</span>;

  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {app => {
          this.app = app;
          const { error, keyboard } = app.state;

          return (
            <div className="app">
              <div className="atm">
                <div className="screen">
                  <div>{this.renderContent()}</div>
                  <div>{this.renderKeyboard(keyboard)}</div>
                  <div>{error}</div>
                </div>
                <div className="keyboard">
                  <div className="principal">
                    <div className="key" onClick={() => app.keyboardType("1")}>
                      1
                    </div>
                    <div className="key" onClick={() => app.keyboardType("2")}>
                      2
                    </div>
                    <div className="key" onClick={() => app.keyboardType("3")}>
                      3
                    </div>
                    <div className="key" onClick={() => app.keyboardType("4")}>
                      4
                    </div>
                    <div className="key" onClick={() => app.keyboardType("5")}>
                      5
                    </div>
                    <div className="key" onClick={() => app.keyboardType("6")}>
                      6
                    </div>
                    <div className="key" onClick={() => app.keyboardType("7")}>
                      7
                    </div>
                    <div className="key" onClick={() => app.keyboardType("8")}>
                      8
                    </div>
                    <div className="key" onClick={() => app.keyboardType("9")}>
                      9
                    </div>
                    <div className="key" onClick={() => app.keyboardType("0")}>
                      0
                    </div>
                  </div>
                  <div className="actions">
                    <div className="key" onClick={app.handleEnter}>
                      Enter
                    </div>
                    <div className="key" onClick={app.clearKeyboard}>
                      Clear
                    </div>
                    <div className="key" onClick={app.clearApp}>
                      Cancel
                    </div>
                    <div className="key" onClick={app.clearApp}>
                      Back
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}

export default App;
