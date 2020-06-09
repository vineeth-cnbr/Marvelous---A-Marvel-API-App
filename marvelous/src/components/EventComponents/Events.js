import React, { useEffect, useState } from 'react';
import marvel from '../../apis/marvel'
import EventGallery from './EventGallery'
import Pagination from '../CommonComponents/Pagination'
import qs from 'querystringify';

const Events = (props) => {

    let maximumCEvents = 18;

    const [events, setEvents] = useState();
    let page = qs.parse(props.location.search).page || 1;

    useEffect(() => {
        getEvents()
    }, [page])

    const getEvents = async () => {
        setEvents((await marvel.get('events')).data)
    }

    const renderPagination = () => {
        if (!events) return;
        if (events.length < maximumCEvents)
            return <Pagination baseUrl='/events' currentIndex={page} lastPage />
        return <Pagination baseUrl='/events' currentIndex={page} />
    }

    return (
        <div>
            <h1 className="ui header app-secondary-color app-header"  >
                <i><b>EVENTS</b></i>
            </h1>
            <br></br>
            <EventGallery events={events} />
            {renderPagination()}
            <br /><br /><br />
        </div>
    )
}

export default Events;