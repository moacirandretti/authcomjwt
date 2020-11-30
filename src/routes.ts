import { Router } from 'express'

import authMiddleware from './app/middlewares/authMiddleware'

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'

const router = Router()

router.post('/users', UserController.store)
router.post('/auth', AuthController.autheticate)
router.get('/users', authMiddleware, UserController.index)

export default router
