import React, { useState } from "react";
import { Input } from "../Input/index";
import logo from "../resources/logo512.png";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: "",
//     };
//   }

//   onChangeInputValue = (value) => this.setState({ inputValue: value });

//   render() {
//     const { inputValue } = this.state;

//     return (
//       <>
//         <div>
//           <Input
//             inputValue={inputValue}
//             onChangeInputValue={this.onChangeInputValue}
//           />
//         </div>
//         <img src={logo} alt={"logo"} />
//       </>
//     );
//   }
// }

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);
  const [search, setSearch] = useState([]);

  const onChangeInputValue = (value) => {
    setInputValue(value);

    if (value !== "") {
      setSearch(
        names.filter((x) => {
          return x.completeName.toLowerCase().includes(value.toLowerCase());
        })
      );
    } else {
      setSearch([]);
    }
  };
  return (
    <>
      <div>
        <Input
          inputValue={inputValue}
          onChangeInputValue={onChangeInputValue}
          setNames={setNames}
        />
      </div>
      {!!search && search.map((s) => <div key={s.id}>{s.completeName}</div>)}
      <img
        src={logo}
        alt={"logo"}
        style={{ position: "absolute", zIndex: "-1", top: "10px" }}
      />
    </>
  );
};
