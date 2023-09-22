import React, {useEffect, useState} from "react";
import {Link, useLoaderData} from 'react-router-dom';
import axios from "axios";
import CarouselSlider from "../components/CarouselSlider";
import Rate from "../components/Rate";
import {FaEnvelope, FaLocationPin, FaMobileScreenButton, FaPerson, FaChildren} from "react-icons/fa6";

// @ts-ignore
export async function loader({params}) {
    try {

        let res = await axios.get(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${params.hotelId}`);
        let rooms = res.data.rooms;

        res = await axios.get('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG');
        let hotel = {};
        for (let i =0; i < res.data.length; i ++) {
            if (res.data[i].id == params.hotelId) {
                hotel = res.data[i];
                break;
            }
        }
        hotel = {...hotel, rooms};
        return {hotel};
    } catch (e) {
        return {hotel: {}}
    }
}


function HotelDetail() {
    // @ts-ignore
    const { hotel } = useLoaderData();
    const [hotelImages, setHotelImages] = useState([]);
    const [person, setPerson] = useState(0);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        console.log(hotel);
        if (hotel && hotel.images) {
            let images = [];
            for (let i = 0; i < hotel.images.length; i ++) {
                images.push(hotel.images[i].url);
            }
            // @ts-ignore
            setHotelImages(images);
            setRooms(hotel.rooms);
        }
    }, [hotel])

    const searchRooms = () => {
        if (!person && !children) {
            setRooms(hotel.rooms);
        } else {
            let result: any = [];
            for (let i = 0; i < hotel.rooms.length; i ++) {
                let item = hotel.rooms[i];
                if (person && item.occupancy.maxAdults != person) continue;
                if (children && item.occupancy.maxChildren != children) continue;
                result.push(item);
            }
            setRooms(result);
        }
    }

    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {hotelImages.length > 0 && (<CarouselSlider images={hotelImages}/>)}

                <div className="mt-3 text-left text-3xl">
                    {hotel.name}
                    <Rate rate={hotel.starRating} />
                </div>

                <p className="text-gray-700 text-left">
                    {hotel.description}
                </p>

                <p className="text-sm leading-5 text-gray-500 text-left flex items-center mt-3">
                    <FaEnvelope/>&nbsp; {hotel.email} &nbsp;&nbsp;&nbsp; <FaMobileScreenButton /> &nbsp; {hotel.telephone}  &nbsp;&nbsp;&nbsp; <FaLocationPin />&nbsp; {hotel.address1} {hotel.address2}, {hotel.country}
                </p>

                <div className="text-2xl text-left mt-10 border-b p-1 flex items-center justify-between">
                    Rooms

                    <div>
                        <label className="text-sm font-medium leading-6 text-gray-900 mr-4">Max Adults</label>
                        <input className="h-full rounded-md bg-transparent p-1 text-gray-500 sm:text-sm border mr-4" value={person} onChange={(e) => {setPerson(parseInt(e.target.value))}} type="number"/>
                        <label className="text-sm font-medium leading-6 text-gray-900 mr-4">Max Children</label>
                        <input className="h-full rounded-md bg-transparent p-1 text-gray-500 sm:text-sm border mr-4"  value={children} onChange={(e) => {setChildren(parseInt(e.target.value))}} type="number"/>
                        <button type="button" className="text-sm text-indigo-600 bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent rounded p-1" onClick={searchRooms}>
                            Search
                        </button>
                    </div>
                </div>

                <ul role="list" className="divide-y divide-gray-100">
                    {
                        rooms.map((item:any, index:any) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5">

                                <div className="flex min-w-0 gap-x-4">
                                    {item.images.length > 0 && (
                                        <img className="h-24 w-36 flex-none bg-gray-50"
                                             src={item.images[0].url}
                                             alt=""/>
                                    )}
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-xl font-semibold leading-6 text-gray-900 text-left">
                                            {item.name}
                                        </p>

                                        <p className="mt-3 text-sm leading-5 text-gray-500 text-left flex items-center">
                                            <FaPerson /> {item.occupancy.maxAdults} &nbsp;&nbsp;&nbsp; {item.occupancy.maxChildren > 0 && (<><FaChildren/> {item.occupancy.maxChildren }</>)}
                                        </p>

                                        <p className="mt-3 text-sm leading-5 text-gray-500 text-left">
                                            {item.longDescription}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </main>
    )
}

export default HotelDetail;