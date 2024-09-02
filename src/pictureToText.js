import React, { useState } from 'react'

const pictureToText = () => {

    const [finalText, setFinalText] = useState('');

    const cleanText = (badText) => {
        return badText.replace(/\W/g," ");
    }

  return (
    <div>
        
      {image ? image : <video id="vidArea" autoplay></video>}
      <canvas id="snapshot"></canvas>
      <button id="capture">Capture!</button>
      <p id="cleanText">{finalText}</p>

    </div>
  )
}

export default pictureToText
