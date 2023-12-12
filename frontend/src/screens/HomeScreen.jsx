import { Row, Col } from "react-bootstrap";

import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomeScreen = () => {
    const {
        data: products,
        isLoading,
        error
    } = useGetProductsQuery();

    return <>
        {isLoading ? (<Loader />) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
            <>
                <h1>Latest Products</h1>
                <Row>
                    {
                        products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                        ))
                    }
                </Row>
            </>
        )}
    </>;
};

export default HomeScreen;