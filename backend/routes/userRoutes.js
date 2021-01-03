import express from "express"
import {
    authUser, getAllUsers, getUserProfile,
    registerUser, updateUserProfile
} from '../controllers/usersControllers.js'
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router