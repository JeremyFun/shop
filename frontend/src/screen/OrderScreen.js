import React, { useEffect, useState } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import {Link} from "react-router-dom";
import {addDecimals} from "./utils";
import {PAY_ORDER_RESET} from "../constants/orderConstants";
import {PayPalButton} from "react-paypal-button-v2";

const OrderScreen = ({match}) => {
    const dispatch = useDispatch()
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const detailsOrder = useSelector(state => state.detailsOrder)
    const {error, order, loading} = detailsOrder

    const payOrder = useSelector(state => state.payOrder)
    const { loading: loadingPay, success: successPay } = payOrder

    if(!loading && order) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }
    useEffect(() => {
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch({type: PAY_ORDER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.isPaid) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }
    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
        order ? <>
            <Row>
                <h2>Order {order._id}</h2>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">{order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message> }

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                Method: {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">{order.paidAt}</Message> : <Message variant="danger">Not Paid</Message> }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0
                                ? <Message>Your order is empty</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x {item.price} = ${addDecimals(item.qty * item.price)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Shipping</strong>
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Tax</strong>
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Total</strong>
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice}
                                    onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </> : <Message variant="info">Order not empty</Message>

}

export default OrderScreen