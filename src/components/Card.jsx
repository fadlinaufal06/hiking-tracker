import React from 'react'
import { useState, useEffect } from 'react'

function Card() {
    const [health, setHealth] = useState([]);
    useEffect(() => {
    const url = "https://ta-iot.herokuapp.com/";
    
    const fetchData = async () => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const data = await response.json();
            setHealth(data);
            console.log(data);
        } catch (err) {
            console.log("error", err);
        };
    };
    fetchData();
    }, []);



    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">User</div>
                <p className="text-gray-700 text-base">
                    Ini Untuk User Condition
                </p>
                </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Normal</span>
            </div>
    </div>
    )
}

export default Card