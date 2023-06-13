import React from "react";

const ItemCart = ({ product }) => {
    return (
        <tr>
            <td className="text-center bg-slate-500 text-black text-lg overflow-hidden">
                {product.cantidad}
            </td>
            <td className="text-center bg-slate-500 text-black text-lg overflow-hidden">
                {product.nombre}
            </td>
            <td className="text-center bg-slate-500 text-black text-lg overflow-hidden">
                $ {product.cantidad * product.precio}
            </td>
        </tr>
    );
};

export default ItemCart;
