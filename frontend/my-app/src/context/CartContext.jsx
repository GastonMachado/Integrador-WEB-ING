import { useLocalStorage } from "../components/useLocalStorage";
import React, { useContext } from "react";
const CartContext = React.createContext([]);
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useLocalStorage("carrito", []);

    const clear = () => setCarrito([]);

    const isInCart = (id) =>
        carrito.find((juego) => juego.id === id) ? true : false;

    const removeItem = (id) =>
        setCarrito(carrito.filter((juego) => juego.id !== id));

    const addItem = (item, cantidad) => {
        if (isInCart(item.id)) {
            setCarrito(
                carrito.map((juego) => {
                    return juego.id === item.id
                        ? { ...juego, cantidad: juego.cantidad + cantidad }
                        : juego;
                })
            );
        } else {
            setCarrito([...carrito, { ...item, cantidad }]);
        }
    };

    const plusProduct = (id) => {
        const nuevoCarrito = carrito.map((juego) => {
            return juego.id === id
                ? { ...juego, cantidad: juego.cantidad + 1 }
                : juego;
        });
        setCarrito(nuevoCarrito);
    };

    const sustProduct = (id) => {
        const nuevoCarrito = carrito.map((juego) => {
            return juego.id === id
                ? { ...juego, cantidad: juego.cantidad - 1 }
                : juego;
        });
        setCarrito(nuevoCarrito);
    };

    const totalPrice = () => {
        return carrito.reduce(
            (acumulador, act) => acumulador + act.cantidad * act.precio,
            0
        );
    };

    const totalProducts = () =>
        carrito.reduce((acumulador, juego) => acumulador + juego.cantidad, 0);

    const subTotal = () => {
        return carrito.reduce(
            (subtotal, current) =>
                subtotal + current.item.precio * current.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                clear,
                isInCart,
                removeItem,
                addItem,
                totalPrice,
                totalProducts,
                plusProduct,
                sustProduct,
                carrito,
                subTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
