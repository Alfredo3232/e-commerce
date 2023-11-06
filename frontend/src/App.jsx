import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header.jsx";

function App() {
    return (
        <>
            <Header />
            <main className="py-3">
                <h1>Welcome to ProShop</h1>
            </main>
        </>
    );
}

export default App;
