import React from 'react';
import "./VisionSection.css";
import Title from "../Titulo/Titulo"
const VisionSection = () => {
    return (
        <section className='vision'>
        <div className='vision__box'>
            <Title 
            titleText={"Visão"}
            color="white"
            potatoClass="vision__title"
            />

          
            <p className='vision__text'>Lorem ipsum dolor sit amet, adipisicing elit. Corporis, facere, aut officia sunt quibusdam repudiandae possimus impedit ullam amet blanditiis quas expedita iure provident consequatur magnam! Natus et earum voluptas. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quo, reprehenderit, impedit vel in similique pariatur adipisci amet optio exercitationem dolorem saepe esse eius, a voluptatum temporibus veritatis quidem ipsa!</p>
        </div>
        </section>
    );
};

export default VisionSection;