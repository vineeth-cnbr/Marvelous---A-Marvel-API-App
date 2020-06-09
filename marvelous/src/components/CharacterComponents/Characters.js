import React, { useEffect, useState } from 'react';
import '../App.css'
import CharacterGallery from './CharacterGallery';
import marvel from '../../apis/marvel'
import Pagination from '../CommonComponents/Pagination';
import qs from 'querystringify';

const Characters = (props) => {

    let maximumCharacters = 18;

    const [characters, setCharacters] = useState();
    let page = qs.parse(props.location.search).page || 1;

    useEffect(() => {
        setCharacters(null)
        const getCharacters = async () => {
            setCharacters((await marvel.get('characters', { params: { page } })).data)
        }
        getCharacters()
    }, [page])



    const renderPagination = () => {
        if (!characters) return;

        if (characters.length < maximumCharacters)
            return <Pagination baseUrl='/characters' currentIndex={page} lastPage />
        return <Pagination baseUrl='/characters' currentIndex={page} />
    }

    return (
        <div>
            <h1 className="ui header app-secondary-color app-header"  >
                <i><b> CHARACTERS</b></i>
            </h1>
            <br></br>
            <CharacterGallery characters={characters} />
            <br /><br /><br />
            {renderPagination()}
            <br /><br /><br />
        </div>
    )
}

export default Characters;