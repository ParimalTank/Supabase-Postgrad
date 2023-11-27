"use client"
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import supabase from '../../libs/SupabaseClient';

const create = () => {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [rating, setRating] = useState('');
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly');
            return;
        }

        const { data, error } = await supabase
            .from('smoothies')
            .insert([{ title, method, rating }]);

        if (error) {
            console.log('smoothies from error');
            setFormError('Please fill in all the fields correctly');
        }

        setFormError(null);
        router.push('/');
    }

    return (
        <div className='page create'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='title'>Title:</label>
                <input
                    type='text'
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor='method'>Method:</label>
                <input
                    type='text'
                    id="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                />

                <label htmlFor='method'>Rating:</label>
                <input
                    type='number'
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />

                <button>Update Smoothie Recipe</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default create;
