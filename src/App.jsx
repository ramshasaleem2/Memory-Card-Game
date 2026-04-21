
import GameHeader from './Components/GameHeader'
import Card from './Components/Card'
import { useState,useEffect } from 'react'
import WinMessage from './Components/WinMessage'


const cardValues=["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍍", "🍊", "🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍍", "🍊"];

const App = () => {
  const [cards,setCards]=useState([])
  const [flippedCards,setFlippedCards]=useState([])
  const [matchedCards,setMatchedCards]=useState([])
  const [score, setScore]=useState(0)
  const [moves, setMoves]=useState(0)
  const [isLocked, setIsLocked] = useState(false)

  const shuffleArray=(array)=> {
    const shuffled = [...array];
    for (let i=shuffled.length-1; i>0; i--){
      const j=Math.floor(Math.random()*(i+1));
      [shuffled[i], shuffled[j]]=[shuffled[j], shuffled[i]];
    }
    return shuffled
  }

  const initializeGame=()=>{
    //shuffle the cards

    const shuffled=shuffleArray(cardValues)

    const finalCards = shuffled.map((value, index)=>(
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,

      }))

      setCards(finalCards)
      setIsLocked(false)
      setMoves(0)
      setScore(0)
      setFlippedCards([])
      setMatchedCards([])
  }

  useEffect(()=>{
    initializeGame()
  },[])

  const handleCardClick=(card)=>{
    //dont allow clicking if card is already flipped, matched or game is locked
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2){
      return;
    }
// Update card flipped state
    const newCards = cards.map((c)=>{
      if (c.id === card.id){
        return {...c, isFlipped: true}
      } else{
      return c
      }
    })
    setCards(newCards)

    const newFlippedCards=[...flippedCards, card.id]
    setFlippedCards(newFlippedCards)

    // check for match if two cards are flipped

    if(flippedCards.length === 1){
      setIsLocked(true)
      const firstCard = cards[flippedCards[0]]
       
      if (firstCard.value === card.value){
        setTimeout(()=>{
        setMatchedCards((prev)=> [...prev, firstCard.id, card.id])
        setScore((prev)=>prev+1)
        setCards((prev)=>
      prev.map((c)=>{
      if (c.id === card.id || c.id === firstCard.id){
        return {...c, isMatched: true}
      } else{
      return c
      }
    }))
    setFlippedCards([])
    setIsLocked(false)
  }, 500)
      } else{

        // flip back card 1, card2


        setTimeout(()=>{
          const flippedBackCards = newCards.map((c)=>{
         if (newFlippedCards.includes(c.id) || c.id===card.id) {
        return{...c, isFlipped:false}
         } else{
          return c;
         }
        })
        setCards(flippedBackCards)
        setIsLocked(false)
        setFlippedCards([])
        }, 1000)
        
      }

      setMoves((prev)=>prev+1)
    }
    
  }
  const isGameComplete = matchedCards.length === cardValues.length;
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame}/>

      {isGameComplete && <WinMessage score={score} moves={moves} onReset={initializeGame}/>}

      <div className="cards-grid">
        {cards.map((card)=>(
          <Card card={card} key={card.id} onClick={handleCardClick}/>
 
      ))}
      </div>
    </div>
  )
}

export default App