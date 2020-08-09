import React from 'react';
import EventCard from './EventCard';

const EventGallery = (props) => {

    if (!props.events) {
        return (
            <div className="ui active medium text loader">
                Loading...
            </div>
        )
    }

    var events = props.events

    if (!events.length) {
        return (
            <p>No Results Found</p>
        )
    }

    return (
        <div className="ui stackable three column grid">
            {events.map((event, index) => {
                return (
                    <div key={index} className="column">
                        <EventCard event={event} />
                    </div>
                )
            })}
        </div>
    )
}

export default EventGallery;