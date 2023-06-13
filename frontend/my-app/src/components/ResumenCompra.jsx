import React from "react";
import { useCartContext } from "../context/CartContext";

const ResumenCompra = () => {
    const { totalPrice, totalProducts } = useCartContext();
    return (
        <div>
            <h2 className="text-2xl text-start underline-offset-4 ">
                Resumen de tu compra:
            </h2>
            <ul className="text-lg text-start my-1">
                <li>
                    Cantidad de items:
                    <span className="text-3xl text-orange-400">
                        {" "}
                        {totalProducts()}
                    </span>
                </li>
                <li>
                    Total de la compra:
                    <span className="text-3xl text-orange-400">
                        {" "}
                        $ {totalPrice()}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default ResumenCompra;
