import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import LoaderPacman from "./LoaderPacman";
import { useParams } from "react-router-dom";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export const ItemListContainer = () => {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);

    const { categoriaId } = useParams();

    useEffect(() => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "juegos");

        if (categoriaId) {
            const queryFilter = query(
                queryCollection,
                where("categoria", "==", categoriaId)
            );
            getDocs(queryFilter)
                .then((res) =>
                    setData(
                        res.docs.map((juego) => ({
                            id: juego.id,
                            ...juego.data(),
                        }))
                    )
                )
                .finally(() => setCargando(false));
        } else {
            getDocs(queryCollection)
                .then((res) =>
                    setData(
                        res.docs.map((juego) => ({
                            id: juego.id,
                            ...juego.data(),
                        }))
                    )
                )
                .finally(() => setCargando(false));
        }
    }, [categoriaId]);

    return cargando ? (
        <div className="d-flex inline-flex flex-wrap w-full justify-center mt-80">
            <h1 className="text-center text-middle text-white text-3xl h-96">
                <LoaderPacman />
            </h1>
        </div>
    ) : (
        <>
            <div className="d-flex inline-flex flex-wrap w-full justify-center mt-32 min-h-screen">
                <ItemList data={data} />
            </div>
        </>
    );
};
export default ItemListContainer;
