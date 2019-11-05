import React from 'react';


const ImageLinkForm = ({ onInputChange , onSubmitPicture }) => {
    return ( 
        <div>
            <p className='f3'>
                {'This tool will detect faces in your picture. Give it a try'}
            </p>
            <div className='center w-75 w-50-ns pa4 br3 shadow-5 flex-column db-ns'>
                <input className='f4 pa2 w-100 w-70-ns' type='text' onChange={onInputChange} placeholder={'Your image URL'} />
                <button className='f4 link w-100 w-30-ns grow ph3 pv2 dib white bg-light-purple bn' onClick={onSubmitPicture}>Detect</button>
            </div>
        </div>
     );
}
 
export default ImageLinkForm;