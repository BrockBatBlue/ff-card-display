import { useState, useEffect } from "react";
import axios from "axios";
import CardsContainer from "./components/CardsContainer";
import Title from "./components/Title";

const getRandomIntegerSet = (max, num) => {
  const randomIntSet = new Set();
  while (randomIntSet.size < num) {
    const newRandomNum = Math.floor(Math.random() * max);
    if (!randomIntSet.has(newRandomNum)) {
      randomIntSet.add(newRandomNum);
    }
  }
  return randomIntSet;
};

function App() {
  const apiUrl = "https://www.moogleapi.com/api/v1/characters";

  //store fetched data in a useState
  const [characters, setCharacters] = useState([]);

  //fetch data using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const randomIntSet = getRandomIntegerSet(response.data.length - 1, 24);
      setCharacters(
        response.data.filter((char, index) => {
          return randomIntSet.has(index);
        })
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //call fetched data on component
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Title />
      <CardsContainer characters={characters} />
    </div>
  );
}

export default App;
