import React, {useEffect} from 'react'
import {Button, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {createProduct, deleteProduct, listProducts} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductsListScreen = ({history, match}) => {
    const dispatch = useDispatch()
    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const {loading, products, error, pages, page} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: productCreated} = productCreate


    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${productCreated._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you confirm?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct())
    }
    return (
        <>
            <Row>
                <Col>
                    <h2 className="my-3">Products</h2>
                </Col>
                <Col className="text-right">
                    <LinkContainer to="/">
                        <Button className="btn" onClick={createProductHandler}>
                            <i className="fas fa-plus"></i>Create Products
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingDelete && <Loader/>}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loadingCreate && <Loader/>}
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                products.length === 0 ? <Message>Product not found</Message> : (
                    <>
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm"
                                                onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin} />
                    </>)
            )}
        </>
    )
}

export default ProductsListScreen
