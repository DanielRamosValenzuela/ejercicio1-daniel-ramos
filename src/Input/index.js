import React, { useEffect, useState } from "react";
import { getFakeData1, getFakeData2 } from "../fakeRequest";

// export default class Input extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValueInComponent: "",
//     };
//   }

//   async componentDidMount() {
//     const firstNameWithId = await getFakeData1();
//     const lastNameWithId = await getFakeData2();

//     console.log({ firstNameWithId, lastNameWithId });
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.inputValue !== this.props.inputValue) {
//       this.setState({
//         inputValueInComponent: this.props.inputValue,
//       });
//     }
//   }

//   render() {
//     const { inputValueInComponent } = this.state;
//     const { onChangeInputValue } = this.props;

//     return (
//       <input
//         onChange={(e) => onChangeInputValue(e.target.value)}
//         value={inputValueInComponent}
//       />
//     );
//   }
// }

// SEPARACION HOOKS

export const Input = ({ onChangeInputValue, inputValue, setNames }) => {
  const [firstNameWithId, setFirstNameWithId] = useState([]);
  const [lastNameWithId, setLastNameWithId] = useState([]);

  const [loading, setLoading] = useState(true);

  const getFakeLastNamee = async () => {
    setLastNameWithId(await getFakeData2());
  };
  const getFakeFirstName = async () => {
    setFirstNameWithId(await getFakeData1());
  };

  useEffect(() => {
    if (loading) {
      getFakeLastNamee();
      getFakeFirstName();
    }
  }, [loading]);

  useEffect(() => {
    if (firstNameWithId.length > 0 && lastNameWithId.length > 0) {
      console.log({ firstNameWithId, lastNameWithId });
      const completeName = firstNameWithId
        .map((first) => {
          const found = lastNameWithId.find((x) => x.id === first.id);
          if (!!found) {
            return {
              id: first.id,
              completeName: first.firstName + " " + found.lastName,
            };
          } else {
            return null;
          }
        })
        .filter((z) => z !== null);
      setNames(completeName);

      setLoading(false);
    }
  }, [firstNameWithId, lastNameWithId, setNames]);

  return (
    <>
      {!loading ? (
        <input
          onChange={(e) => onChangeInputValue(e.target.value)}
          value={inputValue}
        />
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};
