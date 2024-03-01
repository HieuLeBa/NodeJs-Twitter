import { NextFunction, Request, Response } from 'express'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import fs from 'fs'
import mime from 'mime'
import formidable from 'formidable'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import mediasService from '~/services/medias.services'

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

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadVideo(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}

export const serveVideoStreamController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}
