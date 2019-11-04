import React from 'react';
import './facerecognition.css';

const FaceRecognition = ({ imageURL ,  box}) => {
    return ( 
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageURL} width='500px' height='auto' alt='' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.botRow}}> </div>
            </div>
            
        </div>
     );
}
 
export default FaceRecognition;