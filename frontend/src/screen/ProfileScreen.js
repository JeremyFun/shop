import React, { useState, useEffect } from "react"
import {Form, Button, Row, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserProfile, updateUserProfile } from "../actions/userActions"

const ProfileScreen = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password is not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserProfile('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, dispatch, userInfo, user])

    return (
        <>
            <Row>
                <Col md={3}>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Profile Updated</Message> }
                    {loading ? <Loader/> :
                        (
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

                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='confirmPassword'>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter confirmPassword'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    UPDATE
                                </Button>
                            </Form>
                        )}
                </Col>
                <Col md={9}>
                    <h2>Here will your order</h2>
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen