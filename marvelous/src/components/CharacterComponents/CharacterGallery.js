import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterGallery = (props) => {


    if (!props.characters) {
        return (
            <div className="ui active medium text loader">
                Loading...
            </div>
        )
    }

    var characters = props.characters

    if (!characters.length) {
        return (
            <p>No Results Found</p>
        )
    }

    return (
        <div className="ui stackable three column grid">

            {characters.map((character, index) => {

                return (
                    <div key={index} className="column ">
                        <CharacterCard character={character} />
                    </div>
                )
            })}
        </div>
    )
}

export default CharacterGallery;