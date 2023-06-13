import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import Footer from "./components/Footer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./context/CartContext";
import Categoria from "./components/Categoria";
import Checkout from "./components/Checkout";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <CartProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<ItemListContainer />} />
                        <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
                        <Route path="/categoria/" element={<Categoria/>}/>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/detalle/:detalleId" element={<ItemDetailContainer />} />
                        <Route path="/checkout/" element={<Checkout />} />
                        <Route path="*" element={<PaginaNoEncontrada />} />
                    </Routes>
                </CartProvider>
                <Footer />
                <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;
