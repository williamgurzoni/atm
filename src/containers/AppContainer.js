import { Container } from "unstated";
import { SCREEN, NOTE_TYPE } from "../types";
import { sumArrayItems } from "../Utils";

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

    let combinations = [];

    if (value > totalMoney) {
      this.setState({ error: "Could not perform the operation" });
      return;
    }

    let indexCombinations = 0;

    // Notes looping - create list of possibilities
    for (
      let indexNote = Object.values(NOTE_TYPE).length - 1;
      indexNote >= 0;
      indexNote--
    ) {
      const noteValue = Object.values(NOTE_TYPE).find(
        (value, key) => key === indexNote
      );
      const divisor = parseInt(value / noteValue);
      let firstPass = true;
      indexCombinations = 0;

      // Line looping
      for (let i = divisor; i > 0; i--) {
        if (combinations.length <= indexCombinations) {
          combinations.push([]);
        }

        if (firstPass && indexNote !== Object.values(NOTE_TYPE).length - 1) {
          const previousNoteValue = Object.values(NOTE_TYPE)[indexNote + 1];

          if (
            combinations[indexCombinations].indexOf(previousNoteValue) === -1
          ) {
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
          let currentTotalValue = sumArrayItems(
            combinations[indexCombinations]
          );
          if (currentTotalValue + noteValue <= value) {
            combinations[indexCombinations].push(noteValue);
            currentTotalValue += noteValue;
          } else {
            break;
          }
          if (indexNote === 0 && j === 1) {
            exit = true;
          }
        }

        // Last note
        if (exit) {
          break;
        }

        indexCombinations++;
      }
    }

    console.log("All combinations");
    combinations.forEach((value, key) => {
      console.log(key, value);
    });

    combinations = combinations.filter(el => sumArrayItems(el) === value);

    const filterElement = el => {
      let ret = true;
      for (let i = 1; i < el.length; i++) {
        const noteKeyAvailability = Object.values(NOTE_TYPE).indexOf(el[i]);
        const noteQuantityNeeded = el.reduce((prev, curr, currIdx, arr) =>
          arr[currIdx] === el[i] ? prev + 1 : prev
        );
        const isAvailable = notes[noteKeyAvailability] >= noteQuantityNeeded;
        if (!isAvailable) {
          ret = false;
          break;
        }
      }
      return ret;
    };

    // Remove invalid note combinations by availability
    let validCombinations = combinations.filter(filterElement);

    // for (let i = 0; i < combinations.length; i++) {
    //   for (let j = 0; j < notes.length; j++) {
    //     const noteValue = Object.values(NOTE_TYPE).find(
    //       (value, key) => key === j
    //     );
    //     const noteAvailability = notes[j];
    //     // Arrumar esse if é o contrario
    //     if (
    //       validCombinations[i].filter(el => el === noteValue).length <=
    //       noteAvailability
    //     ) {
    //       validCombinations.push(combinations[i]);
    //       break;
    //     }
    //   }
    // }

    console.log("Valid combinations");
    validCombinations.forEach((value, key) => {
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
