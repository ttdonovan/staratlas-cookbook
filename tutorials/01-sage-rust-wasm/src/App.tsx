import { useState } from 'react'
import './App.css'

import init, { run_bevy_app } from '../rust-wasm-lib/pkg/rust-wasm-lib.js';

function App() {
  const [count, setCount] = useState(0)

  const runBevyApp = async () => {
    setCount((count) => count + 1);

    await init('../rust-wasm-lib/pkg/rust-wasm-lib_bg.wasm');
    run_bevy_app();
  }

  return (
    <>
      <h1>Let's Play!</h1>
      <div className="card">
        <button onClick={runBevyApp}>
          Run Bevy App {count}
        </button>
      </div>
    </>
  )
}

export default App
