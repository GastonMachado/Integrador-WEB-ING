import React from "react";

const Search = () => {
    return (
        <div className="form-control">
            <input
                type="text"
                placeholder="Buscar"
                className="input w-32 input-bordered bg-slate-600 hover:bg-red-500 hover:text-black hover:shadow-lg hover:shadow-red-500"
            />
        </div>
    );
};

export default Search;
