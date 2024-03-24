import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import './index.css'
import Deck from "./Deck.tsx"
import { RouterProvider, createBrowserRouter,Route } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "decks/:deckId",
    element: <Deck></Deck>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
