import React from "react";
import { Link } from "react-router-dom";

const ItemCategoria = ({ categoria, imagen, ruta }) => {
    console.log("mensaje desde itemCategoria");
    return (
        <Link to={ruta}>
            <div class="card m-2 w-80 bg-base-100 shadow-2xl image-full hover:shadow-red-600 ">
                <figure className="h-48">
                    <img src={imagen} alt="fondo_categoria" />
                </figure>
                <div class="card-body text-center d-flex justify-center align-middle">
                    <h2 className="text-5xl text-white">{categoria}</h2>
                </div>
            </div>
        </Link>
    );
};

export default ItemCategoria;
