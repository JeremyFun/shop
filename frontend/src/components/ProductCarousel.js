import React, {useEffect} from 'react'
import {Carousel, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import {listProductTop} from "../actions/productActions";
import {Link} from "react-router-dom";

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTop = useSelector(state => state.productTop)
    const {loading, error, products} = productTop

    useEffect(() => {
        dispatch(listProductTop())
    }, [dispatch])
    return (
        <>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : products ? (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(p => (
                        <Carousel.Item key={p._id} className="bg-dark">
                            <Link to={`/product/${p._id}`}>
                                <Image
                                    className="custom-radio"
                                    src={p.image}
                                    alt={p.name}
                                    fluid
                                />
                                <Carousel.Caption className="carousel-caption">
                                    <h4>{p.name} (${p.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : <Loader/>}
        </>
    )
}

export default ProductCarousel
