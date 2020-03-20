import { Container } from "unstated";
import { SCREEN, NOTE_TYPE } from "../types";

const INITIAL_STATE = {
  screen: SCREEN.SHOW_OPTIONS,
  keyboard: "",
  noteSelected: null
};

class AppContainer extends Container {
  constructor(props) {
    super(props);

    // Initialize ATM
    const notes = [];
    Object.values(NOTE_TYPE).forEach(value => {
      notes.push(0);
    });

    this.state = {
      ...INITIAL_STATE,
      notes
    };
  }

  setScreen = screen => {
    this.setState({ screen, noteSelected: null });
  };

  getTotalAtm = () => {
    let total = 0;
    const { notes } = this.state;

    Object.values(NOTE_TYPE).forEach((value, key) => {
      total += value * notes[key];
    });

    return total;
  };

  clearApp = () => {
    this.setState({
      screen: SCREEN.SHOW_OPTIONS,
      keyboard: "",
      error: "",
      noteSelected: null
    });
  };

  keyboardType = value => {
    this.setState(prevState => ({
      keyboard: prevState.keyboard + value,
      error: ""
    }));
  };

  clearKeyboard = () => {
    this.setState({ keyboard: "" });
  };

  selectNoteType = noteSelected => {
    this.setState({ noteSelected });
  };

  addNotes = () => {
    const { keyboard, noteSelected } = this.state;
    const notes = [...this.state.notes];

    const value = parseInt(keyboard);

    notes[noteSelected] += value;

    this.setState({
      notes,
      noteSelected: null
    });

    this.clearKeyboard();
  };

  withdraw = () => {
    const { keyboard } = this.state;
    const notes = [...this.state.notes];
    const totalMoney = this.getTotalAtm();
    const value = parseInt(keyboard);

    const combinations = [];

    if (value > totalMoney) {
      this.setState({ error: "Could not perform the operation" });
      return;
    }

    let indexCombinations = 0;

    // Notes looping - create list of possibilities
    Object.values(NOTE_TYPE)
      .sort((a, b) => b - a)
      .forEach((noteValue, indexNote) => {
        const divisor = value / noteValue;
        let firstPass = true;
        indexCombinations = 0;

        // Line looping
        for (let i = divisor; i > 0; i--) {
          if (combinations.length <= indexCombinations) {
            combinations.push([]);
          }

          if (
            firstPass &&
            indexNote !==
              Object.values(NOTE_TYPE).reduce((prev, curr) => prev + curr) - 1
          ) {
            const previousNoteValue = Object.values(NOTE_TYPE)[indexNote + 1];

            if (combinations.find(el => el === previousNoteValue) === -1) {
              i = divisor;
              firstPass = false;
            }
          }

          // Last note
          if (indexNote === 0) {
            i = divisor;
          }

          let exit = false;

          // Items looping
          for (let j = i; j > 0; j--) {
            let currentTotalValue = combinations.reduce(
              (prev, curr) => prev + curr
            );
            if (currentTotalValue + noteValue <= value) {
              combinations.push(noteValue);
              currentTotalValue = currentTotalValue + noteValue;
            } else {
              break;
            }
            if (indexNote === 0 && j === 1) {
              exit = true;
            }

            console.log(j, combinations);
          }

          // Last note
          if (exit) {
            break;
          }

          indexCombinations++;
        }
      });

    combinations.forEach((value, key) => {
      console.log(key, value);
    });
  };

  handleEnter = () => {
    switch (this.state.screen) {
      case SCREEN.ADD_NOTES:
        this.addNotes();
        break;

      case SCREEN.WITHDRAW:
        this.withdraw();
        break;
      default:
        break;
    }
  };
}

export default AppContainer;
