import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import { useGetTopProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";


const ProductCarousel = () => {
    const {
        data: products,
        isLoading,
        error
    } = useGetTopProductsQuery();

    return isLoading ? <Loader /> : error ? (
        <Message variant="danger">
            {error}
        </Message>
    ) : (
        <Carousel pause="hover" className="bg-primary mb-4">
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />

                        <Carousel.Caption className="carousel-caption">
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;