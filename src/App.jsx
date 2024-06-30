/*

useCallback - 'useCallback' is a React Hook that lets you cache a function definition between re-renders.

What is useCallback?
Think of useCallback as a way to remember a function. In React, when your component updates, it might re-create functions that you define inside it. This can sometimes cause unnecessary work, especially if those functions are passed to other components. useCallback helps React remember your function so it doesn't re-create it every time your component updates.

Why use useCallback?
When a parent component passes a function to a child component, the child component might re-render every time the parent updates, even if the function does the same thing. useCallback helps prevent this by keeping the same function instance unless something it depends on changes.

Simple Example
Imagine you have a parent component that has a counter and a button to increase the counter. You also have a child component that has a button to show an alert. Here's how you use useCallback to prevent the child component from re-rendering unnecessarily.

Without useCallback
jsx

Code ->
 ----------------------------------------  Code starts  --------------------------------------------------
import React, { useState } from 'react';

const ChildComponent = ({ showAlert }) => {
  console.log('Child rendered');
  return <button onClick={showAlert}>Show Alert</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const showAlert = () => {
    alert('Hello!');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <p>Count: {count}</p>
      <ChildComponent showAlert={showAlert} />
    </div>
  );
};

export default ParentComponent;

---------------------------------------------- Code ends ---------------------------------------


Here, every time you click "Increment count", the ParentComponent re-renders, and it creates a new showAlert function. This causes the ChildComponent to re-render too, even though its functionality hasn't changed.

With useCallback
jsx

----------------------------------------  Code starts  --------------------------------------------------

import React, { useState, useCallback } from 'react';

const ChildComponent = ({ showAlert }) => {
  console.log('Child rendered');
  return <button onClick={showAlert}>Show Alert</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const showAlert = useCallback(() => {
    alert('Hello!');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <p>Count: {count}</p>
      <ChildComponent showAlert={showAlert} />
    </div>
  );
};

export default ParentComponent;

-------------------------------------------  Code Ends  -----------------------------------------------------


In this example, useCallback is used to memoize the showAlert function. Now, showAlert will only be recreated if the dependencies inside the array change (in this case, an empty array, so it never changes). This means that when the parent component re-renders, it still uses the same showAlert function, and the ChildComponent won't re-render unnecessarily.

Key Takeaways:

- 'useCallback' helps remember functions to prevent unnecessary re-renders.
- It's useful when you pass functions to child components.
- Always provide a dependency array to tell React when to recreate the function.
- By using 'useCallback', you make sure your components are efficient and only re-render when they really need to.


Note:
When we want to call a method several times repeatedly, we use useCallback() function to optimise repeated
calling of an element.(Uses Memorization Method)



UseCallback() - It is used for optimized run for method when dependencies changes(Put function in cache)
so to avoid unncessary function calls. (But this will not call method but optimize the call )


UseEffect() - It is used to run a method when any dependenices changes (This will call the function itself)


UseRef() Hook - Whenever we want to take reference of something , we use useRef hook







*/




import { useCallback, useEffect, useState , useRef} from 'react'
import './App.css'

function App() {

  const[length,setLength] = useState(15)
const[number,setNumber] = useState(false)
const[character,setCharacter] = useState(false);
const[password,setPassword] = useState("")

// Use Ref hook

const passwordRef = useRef(null);


const createPassword= useCallback(()=>
{
  let pass=""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if (number) {
    str+='1234567890'
    
  }

  if(character)
    {
      str+='!@#$%^&*(){}'
    }

  for (let index = 0; index <length; index++) {
    
    let char = Math.floor((Math.random()*str.length+1));

    pass+=str.charAt(char)
    
  }

  setPassword(pass)

},[length,number,character,setPassword])

const copyPasswordToClipBoard = useCallback(()=>
{
  passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
},[password])



useEffect(()=>
  {
    createPassword()
  },[length,number,character,createPassword])

  return (
<div className="p-2 flex flex-col gap-6">
     <h1 className='text-4xl text-center text-white'>Password Generator</h1>
     <div className='grid grid-cols-2 md:grid-rows-6 gap-2 gap-y-3 lg:grid-cols-4 grid-rows-2'>
      <div className='flex flex-row justify-center  col-span-2 gap-2 p-1 lg:col-span-4'>

      <input id="password-text" name="password" value={password} ref={passwordRef} readOnly className="min-w-0 max-w-2xl flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="" />
      <button onClick={copyPasswordToClipBoard}  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Copy</button>

</div>

      <div className='text-xl flex flex-row justify-center gap-2 p-1 items-center text-white'><input onChange={(event)=>
        {
let currLength = event.target.value;
setLength(currLength)
        }
      }  type="range" min={6} max={15}  /><span id='length'>Length</span></div>
     
     <div className='flex flex-row justify-center items-center text-xl text-center text-white'> <span>Text Length {length} </span></div>

      <div className='flex flex-row justify-center gap-2 p-1 items-center text-white'>

        
{/* Remember 

Input type=range -> to get value, element.value
Input type=chechbox -> to find whether the checkbox is checked or unchecked, use element.checked

*/}

      <label className="inline-flex items-center cursor-pointer">
  <input onChange={()=>
    {
      setNumber((prev)=>!prev); //In set function, we can pass function also
    }
  } id='numbers' type="checkbox" className="sr-only peer" defaultChecked={number} ></input>
  <div className="flex flex-row justify-center items-center relative w-14 h-7 bg-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-xl font-medium text-white dark:text-gray-900">Numbers</span>
</label>
        </div>


  
        <div className='flex flex-row justify-center gap-2 p-1 items-center text-white'>

        
{/* Remember 

Input type=range -> to get value, element.value
Input type=chechbox -> to find whether the checkbox is checked or unchecked, use element.checked

*/}

      <label className="inline-flex items-center cursor-pointer">
  <input onChange={()=>
    {
      setCharacter((prev)=>!prev); //In set function, we can pass function also
    }
  } id='character' type="checkbox" className="sr-only peer"></input>
  <div className="flex flex-row justify-center items-center relative w-14 h-7 bg-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-xl font-medium text-white dark:text-gray-900">Characters</span>
</label>
        </div>







     </div>
     </div>
  )
}

export default App
