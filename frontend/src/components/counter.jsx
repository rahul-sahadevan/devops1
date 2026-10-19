import react, { useState } from 'react';
import "./counter.css"



const Counter = ()=>{

    const [count,setCount] = useState(0)

    return (
        <div className="counter-container">
            <h2>Counter</h2>

            <h3 className="counter">Count: {count}</h3>

            <div className='button-container'>
                <button className="btn" onClick={()=> setCount(count + 1)}>Increment</button>
                <button className="btn" onClick={()=> setCount(0)}>Make it zero</button>
                <button className="btn" onClick={()=> setCount(count - 1)}>Decrement</button>
            </div>

        </div>
    )
}

export default Counter