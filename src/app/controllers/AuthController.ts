import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user'
class AuthController {
  async autheticate(request: Request, response: Response) {
    const repository = getRepository(User)
    const { email, password } = request.body

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      'chaveSecretaDoToken',
      { expiresIn: '1d' }
    )

    return response.status(201).json({
      user,
      token
    })
  }
}

export default new AuthController()
