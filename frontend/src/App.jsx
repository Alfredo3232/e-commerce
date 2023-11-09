import { Container } from "react-bootstrap";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <>
            <Header />

            <main className="py-3">
                <Container>
                    <h1>Welcome to ProShop</h1>
                </Container>
            </main>

            <Footer />
        </>
    );
}

export default App;
