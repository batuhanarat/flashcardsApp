import React,{useState,useEffect } from 'react';
import {useParams } from 'react-router-dom';
import "./Deck.css";
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { TDeck } from './api/getDecks';
import { deleteCard } from './api/deleteCard';
import { API_URL } from "./api/config";


export default function Deck() {
    const [deck, setDeck] = useState<TDeck | undefined>();
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState("");
    const {deckId} = useParams();

    const [image,setImage] = useState<any>();
    const [allImages, setAllImages] = useState<{ image: string }[]>([]);


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: " +error);
        };
    }
  }
  const  handleUploadImage = async () => {
    try{

        const response = await fetch(`${API_URL}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
             base64: image
            })
    });
    if (!response.ok) {
        throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log(data);
    }
    catch(error){
        console.error("Error uploading image: ", error);
    }
}
const fetchDeckAndImages = async () => {
    try {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);

      const response = await fetch(`${API_URL}/images`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const imageData = await response.json();
      console.log(imageData);
      setAllImages(imageData.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

    async function handleCreateDeck(e:React.FormEvent) {
        e.preventDefault();
        const {cards: serverCards} = await createCard(deckId!,text);
        setCards(serverCards);
        setText("");
    }

  async function handleDeleteCard(index:number) {
    if(!deckId) {return;}
        const newDeck =  await deleteCard(deckId,index);
        setCards(newDeck.cards);
       // setDecks(decks.filter((deck)=> deck._id !== deckId));
  }

// Use Effect has second variable called dependancy array
// when we put something, it runs the useEffect's function whenever deckId changes
    useEffect( () => {
        fetchDeckAndImages();
    }, [deckId]);


    return (<div className="Deck">
        <h1> {deck?.title}  </h1>
    <ul className='cards'>
        {cards.map((card,index) => (
        <li key= {index}>
        { <button onClick={() => handleDeleteCard(index)}>X</button> }
            {card}
        </li>

        ))}
        </ul>

        <form onSubmit={handleCreateDeck}>
            <label htmlFor='card-text'>Plant ID </label>
            <input id= "card-text"
            value={text}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
            }}
            />
            <button> Create Plant </button>
        </form>
        <div className='image-container'>
      <form>
        <input type ="file" accept = "image/*" onChange={onInputChange}></input>
        <button onClick={handleUploadImage}> Upload </button>
        {image == "" || image == null? "": <img width={100} height={100} src={image}/>}

      </form>
      <div className = 'images' >
      {allImages.length > 0 &&
  allImages.map((data,index) => (
    <img key={index} width={100} height={100} src={data.image} />
  ))}
  </div>

    </div>
    </div>

    );

}


