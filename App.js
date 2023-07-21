import React from 'react';
import Die from './Die';
import css from './App.css';
import { nanoid } from 'nanoid';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('You Won!');
    }
  }, [dice]);





  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie()); // Call the function here to get the die object
    }
    return newDice;
  }

  function rollDice() {
    if(!tenzies){
    setDice(oldDice =>
      oldDice.map(die =>
        die.isHeld ? die : generateNewDie() // Call the function here to get the die object
      )
    );
  }
  else{
    setTenzies(false)
    setDice(allNewDice)
  }
}

  function holdDice(id) {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElement = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <main>
      
      {tenzies && <Confetti/>}
      <h1> Tenzies Game</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it as its current value between rolls.
      </p>

      <div className="dice-container">{diceElement}</div>
      <button 
      className="roll-dice" onClick={rollDice}>
        {tenzies ?"NEW GAME" :   "Roll dice"}

      </button>
    </main>
  );
}

export default App;
