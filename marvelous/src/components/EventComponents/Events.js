import React, { useEffect, useState } from 'react';
import marvel from '../../apis/marvel'
import EventGallery from './EventGallery'
import Pagination from '../CommonComponents/Pagination'
import qs from 'querystringify';

const Events = (props) => {

    let maximumCEvents = 18;

    const [events, setEvents] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    let page = qs.parse(props.location.search).page || 1; // page number

    useEffect(() => {
        setEvents(null)
        const getEvents = async () => {
            try {
                let response = await marvel.get('events', { params: { page } })
                setEvents(response.data)
            } catch (error) {
                setErrorMessage('Something\'s wrong. Sorry about that :(')
            };
        }
        getEvents()
    }, [page])

    const renderPagination = () => {
        if (!events) return;
        if (events.length < maximumCEvents)
            return <Pagination baseUrl='/events' currentIndex={page} lastPage />
        return <Pagination baseUrl='/events' currentIndex={page} />
    }

    const renderEventGallery = () => {
        if (errorMessage) {
            return (
                <p>{errorMessage}</p>
            )
        } else {
            return (
                <EventGallery events={events} />
            )
        }
    }

    return (
        <div>
            <h1 className="ui header app-secondary-color app-header"  >
                <i><b>EVENTS</b></i>
            </h1>
            <p>These are a list of major events or multi-book stories published by Marvel. </p>
            <br></br>
            {renderEventGallery()}
            {renderPagination()}
            <br /><br /><br />
        </div>
    )
}

export default Events;