import React from 'react'
import { Input } from "../index"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function Search({ className = "" }) {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const search = (data) => {
        const query = data?.query;
        navigate(`/search/${query}`);
    };

    return (
        <>
            <form onSubmit={handleSubmit(search)}>
                <Input
                    placeholder="Search"
                    className={className}
                    {...register("query", { required: true })}
                />
            </form>
        </>
    );
}