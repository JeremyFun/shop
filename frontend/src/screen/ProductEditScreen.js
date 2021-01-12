import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {listProductsDetails, updateProduct} from "../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";
import axios from "axios";

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (e) {
            console.error(e)
            setUploading(false)

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        debugger
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            description,
            brand,
            category,
            countInStock
        }))
    }

    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }
        if (!product.name || product._id !== productId) {
            dispatch(listProductsDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
        }
    }, [dispatch, history, productId, product, successUpdate])

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                                {uploading && <Loader />}
                            </Form.File>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Count In Stock'
                                value={countInStock}
                                onChange={e => setCountInStock(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen