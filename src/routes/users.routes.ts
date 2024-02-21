import express, { Router } from 'express'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { Request, Response, NextFunction } from "express"
import { loginController, registerController } from '~/controllers/users.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter