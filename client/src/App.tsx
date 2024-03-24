import { useEffect, useState } from 'react';
import './App.css';

type TDeck = {
  title: string,
  _id: string
}
function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e:React.FormEvent) {
      e.preventDefault();
      await fetch("http://localhost:5001/decks", {
        method: "POST",
        body: JSON.stringify( {
          title,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      setTitle("");
  }
/*
  useEffect(() => {
    console.log("we are here"); // runs when it first mounts

    return () => {
      console.log("cleanup"); // return statement runs when your route changes and go to another page
    };
  } , []);// in strict mode it can run twice you wil see we are here, cleanup and we are here again
*/

  useEffect( () => {
    async function fetchDecks() {
        const response = await fetch("http://localhost:5001/decks");
        const newDecks = await response.json();
        setDecks(newDecks);
    }
    fetchDecks();
  }, []);


  return (<div className="App">
    <ul className='decks'>
      {decks.map((deck) => (
        <li key={deck._id}> {deck.title}</li>

      ))} </ul>

      <form onSubmit={handleCreateDeck}>
          <label htmlFor='deck-title'>Deck Title </label>
          <input id= "deck-title"
          value={title}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          />
          <button>
            Create Deck
          </button>
      </form>
    </div>
  );
}

export default App;
