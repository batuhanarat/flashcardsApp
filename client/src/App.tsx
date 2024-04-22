import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createDeck } from './api/createDeck';
import { getDecks,TDeck } from './api/getDecks';
import {deleteDeck} from './api/deleteDeck';
import "./App.css";

export default function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");



  async function handleCreateDeck(e:React.FormEvent) {
      e.preventDefault();
      const deck = await createDeck(title);
      setDecks([... decks,deck]);
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
async function handleDeleteDeck(deckId:string) {
      await deleteDeck(deckId);
      setDecks(decks.filter((deck)=> deck._id !== deckId));
}
  useEffect( () => {
    async function fetchDecks() {
        const newDecks = await getDecks();
        setDecks(newDecks);
    }
    fetchDecks();
  }, []);


  return (
  <div className='container'>
    <div className="App">
      <h1>Your Decks</h1>
    <ul className='decks'>
      {decks.map((deck) => (
        <li key={deck._id}>
        <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
        <Link to={`decks/${deck._id}`}>{deck.title}</Link>
        </li>

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


  </div>
  );
}



