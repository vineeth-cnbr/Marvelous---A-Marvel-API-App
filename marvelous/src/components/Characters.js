import React, { useEffect, useState } from 'react';
import './App.css'
import CharacterGallery from './CharacterComponents/CharacterGallery';
import marvel from '../apis/marvel'

const Characters = () => {

    const [characters, setCharacters] = useState();

    useEffect(() => {
        getCharacters();
    }, [])

    const getCharacters = async () => {
        setCharacters((await marvel.get('characters')).data)
    }

    return (
        <div>
            <h1 className="ui header app-secondary-color app-header"  >
                <i><b> CHARACTERS</b></i>
            </h1>
            <br></br>
            <CharacterGallery characters={characters} />
        </div>
    )
}

export default Characters;