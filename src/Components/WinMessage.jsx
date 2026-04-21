import React from 'react'

const WinMessage = ({ score, moves, onReset }) => {
  return (
    <div className="win-message">
        <h2>Congratulations! You won!</h2>
        <p>Score: {score}</p>
        <br/>
        <p>Moves: {moves}</p>
        <br/>
        <button className='win-btn' onClick={onReset}>Play Again</button>
        
    </div>
  )
}

export default WinMessage