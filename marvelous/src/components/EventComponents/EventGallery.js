import React from 'react';

const EventGallery = (props) => {


    if (!props.events) {
        return (
            <div className="ui active medium text loader">
                Loading...
            </div>
        )
    }

    var events = props.events

    return (
        <div className="ui three column grid">

            {events.map((event, index) => {

                let imageUrl = `${event.thumbnail.path}.${event.thumbnail.extension}`
                imageUrl = imageUrl.replace('http', 'https'); //Should remove this in future
                return (
                    <div key={index} className="column">
                        <div className="ui fluid card">
                            <div className="ui fluid image" >
                                <img src={imageUrl} style={{ width: '357px', height: '357px' }} alt={event.title} />
                            </div>
                            <div className="content app-background-color" >
                                <div className="header app-secondary-color">{event.title}</div>
                            </div>
                        </div>
                    </div>
                )
            })
            }

            {/* <div class="column">
                <div class="ui fluid card">
                    <div class="image">
                        <img src="/images/avatar/large/helen.jpg" />
                    </div>
                    <div class="content">
                        <a class="header">Helen Troy</a>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="ui fluid card">
                    <div class="image">
                        <img src="/images/avatar/large/elliot.jpg" />
                    </div>
                    <div class="content">
                        <a class="header">Elliot Fu</a>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default EventGallery;