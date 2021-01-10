import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserProfile, updateUser} from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import {USER_UPDATE_RESET} from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
        console.log('submit', isAdmin)
    }

    const userDetails = useSelector(state => state.userDetails)
    const {user, loading, error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }
        if (!user.name || user._id !== userId) {
            dispatch(getUserProfile(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, history, userId, user, successUpdate])

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message> }
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='isAdmin'
                                value={isAdmin}
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                ) }
            </FormContainer>
        </>
    )
}

export default UserEditScreen