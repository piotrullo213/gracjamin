import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <div className="glass-panel">
        <h1 className="title">Premium Counter</h1>
        <p className="subtitle">Project crafted with React & Vite</p>

        <div className="counter-body">
          <div className="count-display">
            {count}
          </div>

          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={() => setCount((count) => count + 1)}
            >
              Increment
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setCount(0)}
              disabled={count === 0}
            >
              Reset
            </button>
          </div>
        </div>

        <p className="hint">
          Dynamic gaik and beautiful using <code>useState</code>
        </p>
      </div>
    </div>
  )
}

export default App
