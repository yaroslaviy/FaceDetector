import React from 'react';


const ImageLinkForm = () => {
    return ( 
        <div>
            <p className='f3'>
                {'This will detect faces in your picture'}
            </p>
            <div className='center'>
                <input className=' f4 pa2 w-70 center' type='text' />
                <button className=' f4 link w-30 grow ph3 pv2 dib white bg-purple'>Detect</button>
            </div>
        </div>
     );
}
 
export default ImageLinkForm;