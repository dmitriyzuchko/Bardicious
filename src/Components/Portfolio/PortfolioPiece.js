import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageLoader from '../LazyLoad/ImageLoader';

const PortfolioPiece = props => {
    const link = `/portfolio-piece/${props.name}`;
    const imgSrc = `${window.location.origin}/${props.imageSrc}`;
    const gallerySize = props.gallerySize;
    let wrapperClasses = 'portfolio-piece';

    wrapperClasses += props.sharesSpaceInRow ? ' two-column' : ' one-column';

    return (
        <Link
            className={wrapperClasses}
            to={{
                pathname: link,
                state: { modal: true }
            }}
        >
            <div className='piece-wrapper'>
                <ImageLoader src={imgSrc} alt={props.name} />
                {gallerySize > 1 && (
                    <div className='gallery-size-indicator'>
                        <p>{`+${gallerySize}`}</p>
                    </div>
                )}
            </div>
        </Link>
    );
};

PortfolioPiece.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    sharesSpaceInRow: PropTypes.bool.isRequired,
    gallerySize: PropTypes.number
};

export default PortfolioPiece;
