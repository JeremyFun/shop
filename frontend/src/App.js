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
import ShippingScreen from "./screen/ShippingScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import UsersListScreen from "./screen/UsersListScreen";
import UserEditScreen from "./screen/UserEditScreen";


function App() {
    return (
        <>
            <Router>
                <Header/>
                <main className="py-3">
                    <Container>
                        <Route path="/order/:id" component={OrderScreen} exact />
                        <Route path="/register" component={RegisterScreen} exact/>
                        <Route path="/login" component={LoginScreen} exact/>
                        <Route path="/" component={HomeScreen} exact />
                        <Route path="/product/:id" component={ProductScreen} exact />
                        <Route path="/cart/:id?" component={CartScreen} exact />
                        <Route path="/profile" component={ProfileScreen} exact />
                        <Route path="/shipping" component={ShippingScreen} exact />
                        <Route path="/payment" component={PaymentScreen} exact />
                        <Route path="/placeorder" component={PlaceOrderScreen} exact />
                        <Route path="/admin/userlist" component={UsersListScreen} exact />
                        <Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
                    </Container>
                </main>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
