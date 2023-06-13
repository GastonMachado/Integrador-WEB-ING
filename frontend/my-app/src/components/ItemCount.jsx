import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
    const [cuenta, setCuenta] = useState(initial);
    const handlerSuma = () => {
        if (cuenta < stock) {
            setCuenta(cuenta + 1);
        }
    };

    const handlerResta = () => {
        if (cuenta > initial) {
            setCuenta(cuenta - 1);
        }
    };

    useEffect(() => {
        setCuenta(parseInt(initial));
    }, [initial]);

    return (
        <div className="m-0">
            <button
                onClick={handlerResta}
                disabled={cuenta <= 1 || stock <= 0}
                className="btn w-12 btn-outline rounded-full circle hover:bg-red-600 bg-slate-900 text-white hover:text-black hover:shadow-lg hover:shadow-red-500"
            >
                {" "}
                -
            </button>
            <span className="p-1 text-white text-2xl">{cuenta}</span>
            <button
                onClick={handlerSuma}
                className="btn w-12 btn-outline rounded-full circle hover:bg-green-500 bg-slate-900 text-white hover:text-black hover:shadow-lg hover:shadow-green-500"
                disabled={cuenta === stock ? true : null || stock <= 0}
            >
                {" "}
                +
            </button>
            <button
                disabled={stock <= 0}
                onClick={() => onAdd(cuenta)}
                className="btn mx-0.5 w-20 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary"
            >
                {" "}
                agregar
            </button>
        </div>
    );
};

export default ItemCount;
