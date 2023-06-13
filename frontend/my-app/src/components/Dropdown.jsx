import React from "react";

const Dropdown = () => {
    return (
        <div tabIndex="0" className="dropdown dropdown-end bg-slate-900">
            <label className="btn btn-ghost btn-circle avatar text-black bg-slate-600 hover:bg-red-500 hover:text-black hover:shadow-lg hover:shadow-red-500">
                <div className="w-10 rounded-full">
                    <img
                        src="https://api.lorem.space/image/face?hash=33791"
                        alt="avatar"
                    />
                </div>
            </label>
            <ul className="mt-3 p-2 text-black shadow menu menu-compact dropdown-content bg-slate-600 rounded-box w-52">
                <li>
                    <a
                        className="justify-between hover:bg-red-500 hover:text-black hover:shadow-lg "
                        href="http://"
                    >
                        Perfil
                    </a>
                </li>
                <li>
                    <a
                        className="hover:bg-red-500 hover:text-black hover:shadow-lg "
                        href="http://"
                    >
                        Cerrar Sesion
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Dropdown;
