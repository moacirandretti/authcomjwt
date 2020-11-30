import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'

// Tipando as informações do Token
// COnhecido também como payload
interface InformacoesDoToken {
  id: string
  iat: number
  exp: number
}

export default function authMiddware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.sendStatus(401)
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, 'chaveSecretaDoToken')
    const { id } = data as InformacoesDoToken

    request.userId = id

    return next()

    console.log(data)
  } catch {
    return response.sendStatus(401)
  }
}
