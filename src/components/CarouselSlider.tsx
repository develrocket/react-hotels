import React from "react";
import {Carousel} from "flowbite-react";

function CarouselSlider(props: any) {
    return (
        <Carousel className="h-96">
            {props.images.map((item: any, index: any) => (
                <img
                    key={index}
                    alt="..."
                    src={item}
                />
            ))}
        </Carousel>
    )
}

export default CarouselSlider;