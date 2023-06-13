import React from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import TablaCarrito from "./TablaCarrito";
import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import FinalCompra from "./FinalCompra";

const Checkout = () => {
    const { carrito, totalPrice, totalProducts, clear } = useCartContext();
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const [orderId, setOrderId] = useState();
    const [correo, setCorreo] = useState("");
    const [verifCorreo, setVerifCorreo] = useState("");
    const [mensajeVerifCorreo, setMensajeVerifCorreo] = useState("");
    const [styleBtnPagar, setStyleBtnPagar] = useState(
        "btn mx-1 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary btn-disabled"
    );
    const [styleInputVerifCorreo, setStyleInputVerifCorreo] = useState(
        "form-control hidden"
    );

    const order = {
        buyer: {
            name: name,
            email: correo,
            numero_tarjeta: number,
            expiracion_tarjeta: expiry,
            cvc_tarjeta: cvc,
            fecha_hora: serverTimestamp(),
        },
        total: totalPrice(),
        cantidad_productos: totalProducts(),
        items: carrito.map((juego) => ({
            id: juego.id,
            nombre: juego.nombre,
            precio: juego.precio,
            cantidad: juego.cantidad,
        })),
    };

    const expr =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const esCorreo = () => {
        if (expr.test(correo)) setStyleInputVerifCorreo("form-control");
        else setStyleInputVerifCorreo("form-control hidden");
        return expr.test(correo);
    };

    const correoValido = () => {
        if (correo !== verifCorreo)
            setMensajeVerifCorreo("correo mal ingresado");
        else setMensajeVerifCorreo("");
    };

    const camposValidos = () => {
        if (
            esCorreo() &&
            correo === verifCorreo &&
            name !== "" &&
            correo !== ""
        )
            setStyleBtnPagar("btn btn-primary btn-accent");
        else setStyleBtnPagar("btn btn-primary btn-disabled");
    };

    const enviarCompra = () => {
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");
        addDoc(ordersCollection, order).then(({ id }) => {
            setOrderId(id);
            clear(); // se vacía el carrito
        });
    };

    if (carrito.length === 0 && orderId == null) {
        return (
            <div className="h-screen">
                <div className="border-4 mt-32 rounded-lg p-3 bg-slate-900">
                    <h2 className="text-2xl underline-offset-4 text-center">
                        El carrito se encuentra vacio, por favor visita nuestro
                        catalogo para elegir un producto.
                    </h2>
                    <div className="d-flex text-center my-2">
                        <Link className="h-1/3" to={"/"}>
                            <button className="btn mx-1 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary">
                                {" "}
                                Seguir eligiendo
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                {orderId != null ? (
                    <div className="self-auto w-full mt-32 text-3xl text-center h-screen">
                        <FinalCompra
                            name={name}
                            correo={correo}
                            orderId={orderId}
                        />
                    </div>
                ) : (
                    <div className="border-4 mt-32 rounded-lg bg-slate-900 mb-6">
                        <div className="d-flex text-center my-2 w-full">
                            <Link className="h-1/3" to={"/cart/"}>
                                <button className="btn mx-1 btn-outline rounded-full circle hover:bg-primary bg-slate-900 text-white hover:text-white hover:shadow-lg hover:shadow-primary">
                                    {" "}
                                    atras
                                </button>
                            </Link>
                        </div>

                        <div className="shadow-2xl justify-center w-full">
                            <div className=" hero-content flex-col flex lg:flex-row-reverse">
                                <div className="text-center ">
                                    <div className="my-4">
                                        <TablaCarrito productos={carrito} />
                                    </div>
                                    <Cards
                                        number={number}
                                        name={name}
                                        expiry={expiry}
                                        cvc={cvc}
                                        focused={focus}
                                    />
                                </div>
                                <div className="text-center flex w-3/5">
                                    <div className="card w-full">
                                        <form className="form-control">
                                            <input
                                                className="input input-bordered  bg-slate-800 text-white"
                                                type="tel"
                                                name="number"
                                                placeholder="Numero de la Tarjeta"
                                                value={number}
                                                onChange={(e) =>
                                                    setNumber(e.target.value)
                                                }
                                                onFocus={(e) =>
                                                    setFocus(e.target.name)
                                                }
                                            />
                                            <input
                                                className="input input-bordered bg-slate-800 text-white"
                                                type="text"
                                                name="name"
                                                placeholder="Nombre y Apellido (impreso en tarjeta)"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                onFocus={(e) =>
                                                    setFocus(e.target.name)
                                                }
                                            />
                                            <input
                                                className="input input-bordered bg-slate-800 text-white"
                                                type="text"
                                                name="expiry"
                                                placeholder="MM/YY Vencimiento"
                                                value={expiry}
                                                onChange={(e) =>
                                                    setExpiry(e.target.value)
                                                }
                                                onFocus={(e) =>
                                                    setFocus(e.target.name)
                                                }
                                            />
                                            <input
                                                className="input input-bordered bg-slate-800 text-white"
                                                type="tel"
                                                name="cvc"
                                                placeholder="CVC"
                                                value={cvc}
                                                onChange={(e) =>
                                                    setCvc(e.target.value)
                                                }
                                                onFocus={(e) =>
                                                    setFocus(e.target.name)
                                                }
                                            />
                                        </form>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    Correo
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Correo electrónico"
                                                className="input input-bordered  bg-slate-800 text-white"
                                                onChange={(event) => {
                                                    setCorreo(
                                                        event.target.value
                                                    );
                                                    camposValidos();
                                                }}
                                            />
                                        </div>
                                        {expr.test(correo) ? (
                                            <div
                                                className={
                                                    styleInputVerifCorreo
                                                }
                                            >
                                                <label className="label">
                                                    <span className="label-text">
                                                        Verificar Correo
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Ingrese nuevamente el correo electrónico"
                                                    className="input input-bordered  bg-slate-800 text-white"
                                                    onChange={(event) => {
                                                        setVerifCorreo(
                                                            event.target.value
                                                        );
                                                        correoValido();
                                                        camposValidos();
                                                    }}
                                                    onBlur={(event) => {
                                                        setVerifCorreo(
                                                            event.target.value
                                                        );
                                                        correoValido();
                                                        camposValidos();
                                                    }}
                                                    onFocus={(event) => {
                                                        setVerifCorreo(
                                                            event.target.value
                                                        );
                                                        correoValido();
                                                        camposValidos();
                                                    }}
                                                    onClick={(event) => {
                                                        setVerifCorreo(
                                                            event.target.value
                                                        );
                                                        correoValido();
                                                        camposValidos();
                                                    }}
                                                />
                                                <div className="text-left text-red">
                                                    {mensajeVerifCorreo}
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        <div className="form-control mt-6">
                                            <button
                                                className={styleBtnPagar}
                                                onClick={enviarCompra}
                                            >
                                                pagar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default Checkout;
