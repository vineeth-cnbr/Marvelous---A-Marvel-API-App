import React from 'react';
import { Link } from 'react-router-dom';
import useActiveMenu from './useActiveMenu';

const Navbar = (props) => {
    let path = ''
    if (props.location && props.location.pathname)
        path = props.location.pathname.split('/')[1];
    const [, setActiveMenu, isActiveMenu] = useActiveMenu(path)

    return (
        <div className="ui top fixed inverted segment menu">
            <div className="ui container inverted secondary menu">
                <img src='/img/marvelous-black.png' alt="marvelous app logo" className="app-logo item"></img>

                <Link
                    className={`item ${isActiveMenu('characters')}`}
                    to="/characters"
                    onClick={e => setActiveMenu('characters')}>Characters</Link>
                <Link
                    className={`item ${isActiveMenu('events')}`}
                    to="/events"
                    onClick={e => setActiveMenu('events')}>Events</Link>
                {/* <Link className={`item right`} to="/">Sign-in</Link> */}
            </div>
        </div >
    );
}

export default Navbar;