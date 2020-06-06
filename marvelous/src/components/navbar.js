import React from 'react';

const Navbar = () => {
    return (
        <div className="ui top fixed inverted segment menu">
            <div className="ui container inverted secondary menu">
                <img src='/img/marvelous-black.png' alt="marvelous app logo" className=" app-logo item"></img>
                <a className="active item" href="/">Characters</a>
                <a className="item" href="/">Movies</a>
                <a className="item right" href="/">Sign-in</a>
            </div>
        </div >
    );
}

export default Navbar;