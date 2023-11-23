import React from 'react';
import { dateFormatDbToView } from '../../Utils/stringFunctions';
import { Tooltip } from 'react-tooltip';
import "./NextEvent.css"
const NextEvent = ({title,description, eventDate, idEvent}) => {
    function conectar(idEvent) {
        alert(`Chamar o recurso para conectar: ${idEvent}`)
    }
    return (

    <article className="event-card">

        <h2 className="event-card__title">{title}</h2>

        <p

        className='event-card__description'

        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"

        >
            <Tooltip id={idEvent} className='tooltip' />
            {description.substr(0,15)}

        </p>

        <p className='event-card__description'>{dateFormatDbToView(new Date(eventDate).toLocaleDateString())}</p>

        <a onClick={()=> {conectar(idEvent)}} className='event-card__connect-link'>Conectar</a>

    </article>
    );
};

export default NextEvent;