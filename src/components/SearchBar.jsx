import React, { useRef } from 'react';

export default function SearchBar(props){
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value;
        props.handleSubmit(value);
    };

    return(
        <form onSubmit={handleSubmit}>
            <input ref={inputRef} placeholder="search here" style={{color: 'green', lineHeight: 1}} />
            <button style={{color: "red", backgroundColor: "white", width:70}}>Submit</button>
        </form>
    )
};
