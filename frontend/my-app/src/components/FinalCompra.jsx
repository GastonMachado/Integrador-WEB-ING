import React from "react";
import { Link } from "react-router-dom";

const FinalCompra = ({ name, correo, orderId }) => {
    const imprimir = () => {
        let imprimirContenido =
            document.getElementById("comprobante").innerHTML;
        document.body.innerHTML = imprimirContenido;
        window.print();
    };

    return (
        <div className="self-auto w-full mt-32 text-3xl text-center h-screen">
            <div id="comprobante">
                <h3 className="font-bold text-center text-orange-400">
                    ¡Muchas gracias por tu compra!
                </h3>
                <p className="text-center m-4 text-orange">
                    te compartimos tus datos de compra para consultas o
                    reclamos:
                </p>
                <p className="text-center m-10 bg-slate-900 rounded-xl py-4">
                    <ul>
                        <li>
                            <span className="text-orange-600 underline">
                                nombre del comprador:
                            </span>
                            <br></br>
                            {name}
                        </li>
                        <li>
                            {" "}
                            <span className="text-orange-600 underline">
                                Email del comprador:
                            </span>
                            <br></br>
                            {correo}
                        </li>
                        <li>
                            {" "}
                            <span className="text-orange-600 underline">
                                ID de la compra:
                            </span>
                            <br></br>
                            {orderId}
                        </li>
                    </ul>
                </p>
            </div>

            <Link to={"/"}>
                <button className="btn mx-1 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary">
                    {" "}
                    Volver al catalogo
                </button>
            </Link>

            <button
                onClick={imprimir}
                className="btn mx-1 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary"
            >
                {" "}
                Imprimir
            </button>
        </div>
    );
};

export default FinalCompra;
