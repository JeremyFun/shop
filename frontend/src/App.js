import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screen/HomeScreen"
import ProductScreen from "./screen/ProductScreen"
import CartScreen from "./screen/CartScreen"
import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
import './App.css'
import ProfileScreen from "./screen/ProfileScreen";


function App() {
    return (
        <>
            <Router>
                <Header/>
                <main className="py-3">
                    <Container>
                        <Route path="/register" component={RegisterScreen} />
                        <Route path="/login" component={LoginScreen} />
                        <Route path="/" component={HomeScreen} exact />
                        <Route path="/product/:id" component={ProductScreen} exact />
                        <Route path="/cart/:id?" component={CartScreen} exact />
                        <Route path="/profile" component={ProfileScreen} exact />
                    </Container>
                </main>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
