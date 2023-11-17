import React from 'react';
import imageDefault from '../../assets/images/default-image.jpeg'
import './ImageIlustrator.css'

const ImageIllustrator = ({alteText,imageRender=imageDefault,addClass=''}) => {
    return (
     <figure className='illustrator-box'>
        <img src={imageRender}
         alt={alteText}
         className={`illustrator-box__image${addClass}`} />
     </figure>
    );
};

export default ImageIllustrator;