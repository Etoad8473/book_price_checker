import React, { useState } from 'react';
import Webcam from 'react-webcam';




const PictureToText = () => {

    const [snapshot, setSnapshot] = useState(null);
    const [finalText, setFinalText] = useState('');

    const cleanText = (badText) => {
        return badText.replace(/\W/g," ");
    }

  return (
    <div>
        
      {/* <video id="vidArea" autoplay srcObject = {returnWebcamStream}></video> */}
      <Webcam/>
      <canvas id="snapshot"></canvas>
      <button id="capture">Capture!</button>
      <p id="cleanText">{finalText}</p>

    </div>
  )
}

export default PictureToText
