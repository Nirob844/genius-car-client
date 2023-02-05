import React from 'react';

const ServiceCard = ({ service }) => {
    const { img, price, title } = service;

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-2xl text-orange-600 font-semibold'>Price: ${price}</p>
            </div>
        </div>
    );
};

export default ServiceCard;