import React from 'react';
import "./ContactSection.css"
import Titulo from '../Titulo/Titulo';
import ContatoMap from '../../assets/images/contato-map.png'
const ContactSection = () => {
    return (
        <section className='contato'>
             <Titulo titleText={"Contato" } />
             <div className="contato__endereco-box">
                <img 
                src={ContatoMap} 
                alt="Imagem Ilustrativa de um mapa"
                className='contato__img-map'
                />

                <p>
                    Rua Niterói, 180 - Centro <br />
                    São Caetano do Sul - SP <br/>
                    <a href="tel:+551246000" className="contato__telefone">
                        (11) 4425-2000
                    </a>
                </p>
             </div>
        </section>
    );
};

export default ContactSection;