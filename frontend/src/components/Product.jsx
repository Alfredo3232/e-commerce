import { Card } from "react-bootstrap";

const Product = ({ product }) => (
    <Card className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </a>

        <Card.Body>
            <a href={`product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as="h3">

            </Card.Text>
        </Card.Body>
    </Card>
);

export default Product;