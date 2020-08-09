import React from 'react';

const EventCard = ({ event }) => {

    if (!event) return null;

    let imageUrl = `${event.thumbnail.path}.${event.thumbnail.extension}`
    imageUrl = imageUrl.replace('http', 'https'); //Should remove this in future

    return (
        <div className="ui card">
            <div className="ui fluid image" >
                <img src={imageUrl} style={{ width: '357px', height: '357px' }} alt={event.title} />
            </div>
            <div className="content app-background-color" >
                <div className="header app-secondary-color">{event.title}</div>
            </div>
        </div>
    )
}

export default EventCard;