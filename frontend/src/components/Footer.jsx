import {
    Container,
    Row,
    Col
} from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return <footer>
        <Container>
            <Row>
                <Col className="text-center py3">
                    <p>[Your Companies Name Here] &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>;
};

export default Footer;