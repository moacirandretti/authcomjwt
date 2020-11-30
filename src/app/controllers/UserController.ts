import { Request, Response } from 'express'

class UserController {
  store(request: Request, response: Response) {
    return response.send('hello')
  }
}

export default new UserController()
