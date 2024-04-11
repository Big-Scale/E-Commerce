import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@mui/material';

export default function CarouselCpn() {
    var items = [
        {
            img: "/img/banner.png",
            description: "Buy groceries and feed yourself, even on the road."
        },
        {
            img: "/img/iphone.png",
            description: " material ui icons, indicator icons Hello World!"
        },
        {
            img: "/img/nikon.png",
            description: "Another random swipe boolean true defines thing!"
        }
    ];

    return (
        <Carousel animation="slide">
            {
                items.map((item, i) =>
                    <div className='carousel-container' key={i}>
                        <img src={item.img} alt="banner" className='banner' />
                        <div style={{ margin: '30px' }}>
                            <h1>{item.description}</h1>
                            <Button className='custom-btn' variant="contained">Shop now</Button>
                        </div>
                    </div>
                )
            }
        </Carousel>
    );
}