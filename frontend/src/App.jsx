import { Outlet } from "react-router-dom";

import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";


import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "react-toastify/dist/ReactToastify.css";


const App = () => <>
    <Header />

    <main className="py-3">
        <Container>
            <Outlet />
        </Container>
    </main>

    <Footer />

    <ToastContainer />
</>;

export default App;