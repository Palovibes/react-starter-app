import './App.css';
import { useState } from 'react';
import tinycolor from 'tinycolor2';
import { SketchPicker } from 'react-color';

// 1. use setter function and create a button that will add a new element to the state and when rendered the new value is created on the DOM

export default function App() {

  const [colors, setNewColor] = useState(['yellow', 'blue', 'red']);
  const [userInput, setInput] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [brightness, setBrightness] = useState(100)
  const [rgbColor, setRgbColor] = useState({ r: 255, g: 0, b: 0 }); // Initial color (red)


  // update state variable '[colors]', based on changes to input field 
  const captureInput = (input) => {
    console.log(`Received input: ${input}`)
    setInput(input); //update userInput state to input
    setDisplayColor(input); // try to display color
  }

  // DOM handler event 
  const captureEvent = (e) => {
    captureInput(e.target.value)
  }

  const newColorHandler = () => {
    const adjustedColor = getAdjustedColor(displayColor, brightness); //  calculate adjusted color
    setNewColor(colors.concat([adjustedColor]));
    setDisplayColor(adjustedColor); // update userInput state to display color changed 
    setInput('');
    setBrightness(100) // reset brightness
  };

  const getAdjustedColor = (color, brightness) => {
    const adjusted = tinycolor(color).brighten(brightness - 100);
    return adjusted.toRgbString();
  }

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
      <input type='text' className='submit-btn' value={userInput} placeholder='type a color' onChange={captureEvent}></input>
      <div style={{ backgroundColor: displayColor, width: '50px', height: '50px' }}></div>
      <button onClick={() => setBrightness(prevBrightness => Math.min(prevBrightness + 10, 150))}>Lighter</button>
      <button onClick={() => setBrightness(prevBrightness => Math.max(prevBrightness - 10, 50))}>Darker</button>
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