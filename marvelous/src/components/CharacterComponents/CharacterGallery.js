import React from 'react';

const CharacterGallery = (props) => {

    if (!props.characters) {
        return (
            <div className="ui inline ">
                <div class="ui active center dimmer">
                    <div class="ui text loader">Loading</div>
                </div>
            </div>
        )
    }

    var characters = props.characters
    console.log(characters)

    return (
        <div class="ui three column grid">

            {characters.map(character => {

                let imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
                return (
                    <div className="column">
                        <div className="ui fluid card">
                            <div className="ui fluid image" >
                                <img src={imageUrl} style={{ width: '357px', height: '357px' }} width="357px" height="357" alt={character.name} />
                            </div>
                            <div class="content app-background-color" >
                                <div class="header app-secondary-color">{character.name}</div>
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

export default CharacterGallery;