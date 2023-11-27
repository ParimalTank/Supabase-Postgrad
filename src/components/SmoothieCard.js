import { useRouter } from 'next/router';
import React from 'react';
import supabase from '../../libs/SupabaseClient';

const SmoothieCard = ({ smoothies, onDelete }) => {

    const router = useRouter();

    const handleDelete = async () => {

        console.log("method called");
        console.log("here is the delete id", smoothies.id);

        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothies.id)
            .select()

        if (error) {
            console.log(error)
            console.log("Errors in delete");
        }

        if (data) {
            console.log("Successfully Deleted");
            console.log(data);
            onDelete(smoothies.id);
        }
    }

    return (
        <div className="smoothie-card">
            <h3>{smoothies.title}</h3>
            <p>{smoothies.method}</p>
            <div className="rating">{smoothies.rating}</div>
            <div className='buttons-main'>
                <span className='buttons' onClick={() => { router.push(`/${smoothies.id}`) }}>Edit</span>
                <span className='deleteButton' onClick={handleDelete}>Delete</span>
            </div>
        </div>
    )
}

export default SmoothieCard;
