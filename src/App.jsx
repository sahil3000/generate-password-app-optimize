import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(4);
  const [isNumberAllow, setIsNumberAllow] = useState(false);
  const [isSymbolAllow, setIsSymbolAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const generatePasswordHandler = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if (isNumberAllow) str += "0123456789"

    if (isSymbolAllow) str += "!@#$%%^&*()_-+{}`"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumberAllow, isSymbolAllow, setPassword]);

  useEffect(() => {
    generatePasswordHandler();
  }, [length, isSymbolAllow, isNumberAllow, generatePasswordHandler])

  const copyPasswordToClipboardHandler = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md bg-gray-800 rounded-lg my-8 py-3 text-orange-500'>
      <h1 className='text-center text-white my-3'>Password Genrator App</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          className='outline-none w-full py-1 px-3'
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboardHandler}
        >
          Copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2 justify-evenly '>
        <div className='flex items-center justify-center gap-x-1'>
          <input
            type="range"
            className='cursor-pointer'
            min={4}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center justify-center gap-x-1'>
          <input
            type="checkbox"
            checked={isNumberAllow}
            id="numberInput"
            onChange={() => {
              setIsNumberAllow(prev => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center justify-center gap-x-1'>
          <input
            type="checkbox"
            checked={isSymbolAllow}
            id="symbolInput"
            onChange={() => {
              setIsSymbolAllow(prev => !prev);
            }}
          />
          <label htmlFor="symbolInput">Symbols</label>
        </div>
      </div>
    </div>
  )
}

export default App
