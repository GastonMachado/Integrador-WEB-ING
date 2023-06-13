import React from "react";
import FilaTabla from "./FilaTabla";

const TablaCarrito = ({ productos }) => {
    const totalProductos = () =>
        productos.reduce((acumulador, juego) => acumulador + juego.cantidad, 0);

    const totalPrecio = () => {
        return productos.reduce(
            (acumulador, act) => acumulador + act.cantidad * act.precio,
            0
        );
    };

    return (
        <div class="">
            <table class="table-auto w-full overflow-hidden">
                <thead>
                    <tr>
                        <th className="text-center  bg-slate-800 text-white p-1">
                            CANT.
                        </th>
                        <th className="text-center  bg-slate-800 text-white p-1">
                            DETALLE
                        </th>
                        <th className="text-center  bg-slate-800 text-white p-1">
                            PRECIO
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((product) => (
                        <FilaTabla key={product.id} product={product} />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th className="text-orange-600 text-xl  text-center  bg-slate-800 p-1">
                            {totalProductos()}
                        </th>
                        <th className="text-orange-600 text-xl  text-center  bg-slate-800 p-1"></th>
                        <th className="text-green-600 text-xl text-center  bg-slate-800 p-1">
                            $ {totalPrecio()}
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default TablaCarrito;
