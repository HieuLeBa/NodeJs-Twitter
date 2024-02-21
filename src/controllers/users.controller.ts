import { NextFunction, Request, Response } from "express"
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from "~/models/requests/User.requests"
import usersService from "~/services/users.service"

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if(email === 'lebahieu2505@gmail.com' && password === '123456') {
    res.json({
      message: 'Login Success'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async(
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction) => {
  try {
    const result = await usersService.register(req.body)
    return res.json({
      message: 'Register Success',
      result
    })
  } catch (error) {
    next(error)
  }
}