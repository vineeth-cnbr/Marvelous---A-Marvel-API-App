import React from 'react';
import './Pagination.css';
import history from '../../history';

const Pagination = (props) => {

    let { currentIndex, lastPage } = props;

    const renderNumbers = () => {
        let pagebuttons = [];
        let currentIndex = Number(props.currentIndex);
        let n = Math.max(5, currentIndex + 2);
        let startIndex = Math.max(1, currentIndex - 2)
        for (let i = startIndex; i <= n; i++) {
            if (i === currentIndex) {
                pagebuttons.push(<button key={i} className="ui button inverted">{currentIndex}</button>)
                if (lastPage) {
                    break;
                }
            }
            else {
                pagebuttons.push(<button key={i} onClick={e => history.push(`${props.baseUrl}?page=${i}`)} className="ui basic button inverted">{i}</button>)
            }
        }
        return pagebuttons;
    }


    return (
        <div className="ui grid center aligned">
            <div className="ui small  icon buttons">

                {currentIndex === 1 ?
                    <React.Fragment /> :
                    <button className="ui basic button inverted" onClick={e => history.push(`${props.baseUrl}?page=${currentIndex - 1}`)}><i className="angle left icon" ></i></button>
                }
                {renderNumbers()}
                {lastPage ?
                    <React.Fragment /> :
                    <button className="ui basic button inverted" onClick={e => history.push(`${props.baseUrl}?page=${currentIndex + 1}`)}><i className="angle right icon"></i></button>
                }

            </div>
        </div>
    )
}

export default Pagination;