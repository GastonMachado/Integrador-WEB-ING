import React from "react";
import Item from "./Item";

const ItemList = ({ data = [] }) => {
    return data.map((games) => <Item key={games.id} games={games} />);
};

export default ItemList;
