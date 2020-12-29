import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from "../components/Rating"
import { useDispatch, useSelector } from "react-redux"
import { listProductsDetails } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductScreen = ({ match, history }) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    useEffect(() => {
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match])
    const {loading, product, error} = useSelector(state => state.productDetails)

    const addCartHandler = () => {
        return history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return <>
        <Link className="btn btn-light my-3" to="/">
            Go back
        </Link>
        {
            loading
                ? <Loader/>
                : error
                ? <Message variant={"danger"}>{error}</Message>
                : (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: ${product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={e => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map((x, index) => (
                                                            <option key={index} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                    onClick={() => addCartHandler()}
                                >
                                    Add To Cart
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                )
        }
    </>
}

export default ProductScreen