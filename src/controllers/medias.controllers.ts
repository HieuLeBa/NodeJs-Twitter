import { NextFunction, Request, Response } from 'express'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import fs from 'fs'
import mime from 'mime'
import formidable from 'formidable'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  // const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    res.json({
      message: 'upload image successfully'
    })
  })
}
