import { compare } from 'bcrypt'

import { UserService } from './user.service'

interface AttemptParams {
  email: string
  password: string
}

export class AuthService {
  public static async attempt({ email, password }: AttemptParams) {
    const user = await UserService.findByEmail(email)
    
    return user && await compare(password, user.password)
  }
}
