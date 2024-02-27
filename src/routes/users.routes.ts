import express, { Router } from 'express'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { Request, Response, NextFunction } from 'express'
import {
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  // filterMiddleware<UpdateMeReqBody>([
  //   'name',
  //   'date_of_birth',
  //   'bio',
  //   'location',
  //   'website',
  //   'username',
  //   'avatar',
  //   'cover_photo'
  // ]),
  wrapRequestHandler(updateMeController)
)

// usersRouter.get('/:username', wrapRequestHandler(getProfileController))

// usersRouter.post(
//   '/follow',
//   accessTokenValidator,
//   verifiedUserValidator,
//   followValidator,
//   wrapRequestHandler(followController)
// )

// usersRouter.delete(
//   '/follow/:user_id',
//   accessTokenValidator,
//   verifiedUserValidator,
//   unfollowValidator,
//   wrapRequestHandler(unfollowController)
// )

// usersRouter.put(
//   '/change-password',
//   accessTokenValidator,
//   verifiedUserValidator,
//   changePasswordValidator,
//   wrapRequestHandler(changePasswordController)
// )

export default usersRouter
