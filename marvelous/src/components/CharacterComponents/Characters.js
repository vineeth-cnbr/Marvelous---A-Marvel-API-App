import React, { useEffect, useState } from 'react';
import '../App.css'
import CharacterGallery from './CharacterGallery';
import marvel from '../../apis/marvel'
import Pagination from '../CommonComponents/Pagination';
import qs from 'querystringify';

const Characters = (props) => {

    let maximumCharacters = 18;

    const [characters, setCharacters] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    let page = qs.parse(props.location.search).page || 1; // page number

    useEffect(() => {
        setCharacters(null)
        const getCharacters = async () => {
            try {
                let response = await marvel.get('characters', { params: { page } })
                setCharacters(response.data)
            } catch (error) {
                setErrorMessage('Something\'s wrong. Sorry about that :(')
            };
        }
        getCharacters()
    }, [page])



    const renderPagination = () => {
        if (!characters) return;

        if (characters.length < maximumCharacters)
            return <Pagination baseUrl='/characters' currentIndex={page} lastPage />
        return <Pagination baseUrl='/characters' currentIndex={page} />
    }

    const renderCharacterGallery = () => {
        if (errorMessage) {
            return (
                <p>{errorMessage}</p>
            )
        } else {
            return (
                <CharacterGallery characters={characters} />
            )
        }
    }

    return (
        <div>
            <h1 className="ui header app-secondary-color app-header"  >
                <i><b> CHARACTERS</b></i>
            </h1>
            <p>These are a list of some of the charcaters appeared in comics published by Marvel.</p>
            <br></br>
            {renderCharacterGallery()}
            <br /><br /><br />
            {renderPagination()}
            <br /><br /><br />
        </div>
    )
}

export default Characters;