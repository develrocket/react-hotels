import React, {useEffect, useState} from 'react';
import axios from "axios";
import Rate from "../components/Rate";
import {FaLocationPin, FaEnvelope} from "react-icons/fa6";
import {Link} from 'react-router-dom';

function Home() {
    const [hotels, setHotels] = useState([]);
    const [searchStar, setSearchStar] = useState(0);

    useEffect(() => {
        searchHotels();
    }, [])

    const searchHotels = async () => {
        try {
            let res = await axios.get('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG');
            if (searchStar == 0) {
                setHotels(res.data);
            } else {
                let result:any = [];
                for (let i = 0; i < res.data.length; i ++) {
                    let item = res.data[i];
                    if (item.starRating == searchStar) {
                        result.push(item);
                    }
                }
                setHotels(result);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="p-8 border rounded items-center">
                    <label className="text-sm font-medium leading-6 text-gray-900 mr-4">Rate</label>
                    <select name="currency" className="h-full rounded-md bg-transparent p-1 text-gray-500 sm:text-sm border mr-4" value={searchStar} onChange={(e) => {setSearchStar(parseInt(e.target.value))}}>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                        <option value="0">All</option>
                    </select>

                    <button type="button" className="font-small text-indigo-600 bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent rounded p-1" onClick={searchHotels}>
                        Search
                    </button>
                </div>
                <ul role="list" className="divide-y divide-gray-100">
                    {
                        hotels.map((item:any, index) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5">

                                <div className="flex min-w-0 gap-x-4">
                                    <img className="h-24 w-36 flex-none bg-gray-50"
                                         src={item.images[0].url}
                                         alt=""/>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-xl font-semibold leading-6 text-gray-900 text-left">
                                            <Link to={`hotel/${item.id}`}>{item.name}</Link>
                                        </p>

                                        <p className="mt-3 text-sm leading-5 text-gray-500 text-left flex items-center">
                                            <FaEnvelope/>&nbsp; {item.email} &nbsp;&nbsp;&nbsp;&nbsp; <FaLocationPin /> {item.address1} {item.address2}, {item.country}
                                        </p>

                                        <p className="mt-3 text-sm leading-5 text-gray-500 text-left">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <Rate rate={item.starRating} />

                                    <div className="flex items-center">
                                        <div className="border-r pr-3">
                                            <p className="text-sm leading-6 text-gray-900">{item.checkInHours} : {item.checkInMinutes}</p>
                                            <p className="mt-1 text-xs leading-5 text-gray-500"> Check In </p>
                                        </div>
                                        <div className="pl-3">
                                            <p className="text-sm leading-6 text-gray-900">{item.checkOutHours} : {item.checkOutMinutes}</p>
                                            <p className="mt-1 text-xs leading-5 text-gray-500"> Check Out </p>
                                        </div>
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

export default Home;