import React from "react";
import Product from "./Product";

const Products = ({ data }: any) => {
    return (
        <div className="flex" style={{"justifyContent": "space-between"}}>
            <Product data-products={data} />
        </div>
    );
};

export default Products;
