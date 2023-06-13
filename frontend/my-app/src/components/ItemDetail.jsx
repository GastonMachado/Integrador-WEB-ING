import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import ItemCount from "./ItemCount";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const ItemDetail = ({ data }) => {
    const [agregado, setAgregado] = useState(false);
    const { addItem } = useCartContext();
    const onAdd = (qty) => {
        toast(`Agregaste ${qty} unidad/es de ${data.nombre} al carrito!`, {
            theme: "dark",
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: "linear-gradient(to right, #28344d, #9a1a23)",
            },
        });
        setAgregado(true);
        addItem(data, qty);
    };
    return (
        <>
            <div class="text-left text-lg text-amber-400 breadcrumbs w-full mx-20">
                <ul>
                    <li>
                        <Link to={"/"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="w-4 h-4 mr-2 stroke-current"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                ></path>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-4 h-4 mr-2 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                        </svg>
                        Detalle
                    </li>
                </ul>
            </div>
            <div class="hero">
                <div class="hero-content flex-col lg:flex-row">
                    <img
                        className="bg-slate-900 m-1 rounded-md text-center"
                        alt="imagen portada"
                        src={data.imagen}
                    />
                    <span className="w-1/2">
                        <div>Clasificación: {data.esrb} </div>
                        <div>Duración: {data.tiempo} horas </div>
                        <div>Creador: {data.creador} </div>
                    </span>
                    <div className="w-full">
                        <h1 class="text-5xl font-bold bg-slate-900 m-1 rounded-md text-center py-2">
                            {data.nombre}
                        </h1>
                        <p className="px-6">{data.detalles}</p>
                        <div className="text-center py-2 text-3xl bg-slate-900 m-1 rounded-md">
                            Puntuacion:{" "}
                            <progress
                                class="progress progress-primary w-56"
                                value={data.puntuacion}
                                max="100"
                            ></progress>
                            {data.puntuacion}
                        </div>
                        <div className="text-center py-2 text-3xl">
                            Disponibles: {data.stock}
                        </div>
                        <div className="text-center py-2 text-5xl">
                            Precio: $ {data.precio}
                        </div>
                        <div className="text-center py-2 text-3xl bg-slate-900 m-1 rounded-md">
                            {agregado ? (
                                <Link to={"/cart"}>
                                    <button className="btn mx-0.5 w-30 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary">
                                        {" "}
                                        Ir al Carrito{" "}
                                    </button>
                                </Link>
                            ) : (
                                <ItemCount
                                    stock={data.stock}
                                    initial={1}
                                    onAdd={onAdd}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4 w-full d-flex inline-flex flex-wrap justify-center">
                <ReactPlayer controls="true" url={data.video} width="100%" />
            </div>
        </>
    );
};

export default ItemDetail;
