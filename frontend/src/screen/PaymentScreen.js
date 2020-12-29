import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {Form, Button, Row, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Pay-Pal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select method</Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        name='paymentMethod'
                        value='PayPal'
                        id='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>

                    <Form.Check
                    type='radio'
                    name='paymentMethod'
                    value='Stripe'
                    id='Stripe'
                    label='Stripe'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check>

                </Col>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen