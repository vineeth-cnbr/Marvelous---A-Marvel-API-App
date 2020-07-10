import React from 'react';

const CharacterCard = ({ character }) => {

    if (!character) return null;

    let imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
    imageUrl = imageUrl.replace('http', 'https'); //Should remove this in future
    let wikiUrl = character.urls.filter(url => url.type === "wiki")[0];
    wikiUrl = wikiUrl ? wikiUrl.url : character.urls[0].url;

    return (
        <div className="ui fluid card animate__animated animate__fadeIn">
            <div className="ui fluid image " >
                <img src={imageUrl} style={{ width: '357px', height: '357px' }} alt={character.name} />
            </div>
            <div className="content app-background-color" >
                <a className="header app-secondary-color" href={wikiUrl}>{character.name}</a>
            </div>
        </div>
    )
}

export default CharacterCard;