import React, { useState, useEffect } from "react";
import LoaderPacman from "./LoaderPacman";
import ItemCategoria from "./ItemCategoria";

import { getFirestore, collection, getDocs } from "firebase/firestore";

export const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "categorias");

        getDocs(queryCollection)
            .then((res) =>
                setCategorias(
                    res.docs.map((categoria) => ({
                        ...categoria.data(),
                    }))
                )
            )
            .finally(() => setCargando(false));
    }, []);

    if (cargando === true) {
        return (
            <div className="d-flex inline-flex flex-wrap w-full justify-center mt-96 min-h-screen">
                <LoaderPacman />
            </div>
        );
    } else {
        return (
            <div className="d-flex inline-flex flex-wrap w-full justify-center mt-32 min-h-screen">
                {categorias.map((categoria) => {
                    return (
                        <ItemCategoria
                            categoria={categoria.categoria}
                            ruta={categoria.ruta}
                            imagen={categoria.imagen}
                        />
                    );
                })}
            </div>
        );
    }
};
export default Categoria;
