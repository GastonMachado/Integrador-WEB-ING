import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import LoaderPacman from "./LoaderPacman";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const ItemDetailContainer = () => {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { detalleId } = useParams();

    useEffect(() => {
        const querydb = getFirestore();
        const queryDoc = doc(querydb, "juegos", detalleId);
        getDoc(queryDoc)
            .then((res) => setData({ id: res.id, ...res.data() }))
            .finally(() => setCargando(false));
    }, [detalleId]);

    return cargando ? (
        <div className="d-flex inline-flex flex-wrap w-full justify-center mt-80">
            <h1 className="text-center text-middle text-white text-3xl h-96">
                <LoaderPacman />
            </h1>
        </div>
    ) : (
        <div className="d-flex inline-flex flex-wrap w-full justify-center mt-32">
            <ItemDetail data={data} />
        </div>
    );
};
export default ItemDetailContainer;
