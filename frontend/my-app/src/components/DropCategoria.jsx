import React from "react";
import { NavLink } from "react-router-dom";

const DropCategoria = () => {
    return (
        <div
            className="dropdown dropdown-end tooltip tooltip-bottom"
            data-tip="Filtrar"
        >
            <NavLink to={"/categoria/"}>
                <label className="btn btn-ghost modal-button btn-circle avatar text-white bg-slate-600 hover:bg-red-500 hover:text-black hover:shadow-lg hover:shadow-red-500">
                    <div className="w-9 rounded-full indicator ">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/gamex-store.appspot.com/o/filter.svg?alt=media&token=b478d31e-126c-44d3-8643-fb7430f94260"
                            alt="avatar"
                        />
                    </div>
                </label>
            </NavLink>
        </div>
    );
};

export default DropCategoria;
