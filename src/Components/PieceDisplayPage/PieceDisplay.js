import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import QueryString from 'query-string';
import { isMobile } from '../../misc/DeviceCheck';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.scss';
import ImageLoader from '../ImageLoader/ImageLoader';

const PieceDisplay = props => {
    const pieceData = props.pieceData;
    const gallery = pieceData.urls;
    const [index, setIndex] = useState(0);

    const carouselRef = React.createRef();
    const handleTouch = e => {
        console.log(e);
    };

    useEffect(() => {
        const urlParams = QueryString.parse(window.location.search);
        const paramIndex = urlParams.illustration;

        if (paramIndex && paramIndex !== index) setIndex(paramIndex - 1);
        else if (!paramIndex) {
            window.history.replaceState(
                null,
                null,
                window.location.pathname + `?illustration=${index + 1}`
            );
        }

        if (carouselRef.current) {
            console.log(carouselRef.current);
            carouselRef.current.onSwipeMove(handleTouch);
        }

        return () => carouselRef.removeEventListener('touchmove', handleTouch);
    }, []);

    useEffect(() => {
        const urlParams = QueryString.parse(window.location.search);

        if (urlParams.illustration !== index + 1) {
            window.history.replaceState(
                null,
                null,
                window.location.pathname + `?illustration=${index + 1}`
            );
        }
    }, [index]);

    return (
        <div id='piece-display'>
            <Carousel
                infiniteLoop={gallery.length > 1}
                showThumbs={false}
                showStatus={false}
                showArrows={!isMobile()}
                useKeyboardArrows
                showIndicators={gallery.length > 1}
                onChange={newIndex => setIndex(newIndex)}
                selectedItem={+index}
                ref={carouselRef}
            >
                {gallery.map((url, index) => {
                    return (
                        <ImageLoader
                            key={`slide-image-${index}`}
                            src={`/${url}`}
                        />
                    );
                })}
            </Carousel>
        </div>
    );
};

export default PieceDisplay;
