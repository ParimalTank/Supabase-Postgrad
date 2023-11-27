import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import supabase from '../../../libs/SupabaseClient';

const Index = () => {

    const router = useRouter()
    const id = router?.query?.id;

    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [rating, setRating] = useState('');
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchSmoothie = async () => {
            setLoader(true)
            const { data, error } = await supabase
                .from('smoothies')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                router.push('/')
            }
            if (data) {
                setLoader(false)
                setTitle(data.title)
                setMethod(data.method)
                setRating(data.rating)
            }
        }

        fetchSmoothie()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly.')
            return
        }

        // Data Update
        const { data, error } = await supabase
            .from('smoothies')
            .update({ title, method, rating })
            .eq('id', id)
            .single();

        if (error) {
            setFormError('Please fill in all the fields correctly.')
        }

        setFormError(null)
        router.push('/');
    }

    return (
        <div className="page create">
            {
                loader
                    ?
                    <span className='loader'>Loading.....</span>
                    :
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label htmlFor="method">Method:</label>
                        <textarea
                            id="method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        />

                        <label htmlFor="rating">Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />

                        <button>Update Smoothie Recipe</button>
                        {formError && <p className='error'>{formError}</p>}
                    </form>
            }
        </div>
    )
}

export default Index;
