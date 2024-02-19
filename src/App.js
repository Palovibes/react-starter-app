import './App.css';
import { useState } from 'react';
import tinycolor from 'tinycolor2';
import { SketchPicker } from 'react-color';

// 1. use setter function and create a button that will add a new element to the state and when rendered the new value is created on the DOM

export default function App() {

  const [colors, setNewColor] = useState(['yellow', 'blue', 'red']);
  const [userInput, setInput] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [rgbColor, setRgbColor] = useState({ r: 255, g: 0, b: 0 }); // Initial color (red)
  const [displayTimeout, setDisplayTimeout] = useState(null); // Initialize



  // update state variable '[colors]', based on changes to input field 
  const captureInput = (input) => {
    console.log(`Received input: ${input}`)
    setInput(input); //update userInput state to input
    // Clear any pending timeout to avoid unnecessary updates
    setDisplayColor(input); // try to display color

    // Delay the displayColor update briefly 
    displayTimeout = setTimeout(() => setDisplayColor(input), 300); // 300ms delay
    clearTimeout(displayTimeout); //  clear previous timeout
    setDisplayTimeout(displayTimeout);
  }


  // DOM handler event 
  const captureEvent = (e) => {
    captureInput(e.target.value)
  }

  const newColorHandler = () => {
    console.log(displayColor)
    const adjustedColor = displayColor; // use displayColor
    setNewColor(colors.concat([adjustedColor]));
    setDisplayColor(adjustedColor); // update userInput state to display color changed 
    setInput('');
  };

  // manipulate colors array and update state variable
  const handleDelete = (index) => {
    const updatedColors = [...colors] // copy the aray for immutability
    updatedColors.splice(index, 1)  // use splice to remove item at the given index
    setNewColor(updatedColors) // trigger re-render
  };

  return (
    <>
      <ul >
        {colors.map((color, index) =>
          <li key={index}>
            <span style={{ color: color }}> {color} </span>
            <button className='delete-btn' onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        )}
      </ul>

      <input type='text' className='submit-btn'
        value={rgbColor ? `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})` : userInput} // Conditional Value
        placeholder='type a color'
        onChange={captureEvent}>
      </input>

      <div style={{ backgroundColor: displayColor, width: '50px', height: '50px' }}></div>

      <button className='submit-btn' onClick={() => { newColorHandler() }}>Add</button>

      <SketchPicker
        color={rgbColor}
        onChange={(newColor) => {
          setRgbColor(newColor.rgb);
          setDisplayColor(`rgb(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b})`);
        }}
      />

    </>


    // 2. Create a piece of state called count.
    // Create buttons that will increase and decrease the count based off which is clicked.
    // If the count gets below -10 or above 10, it resets to 0
  )
}