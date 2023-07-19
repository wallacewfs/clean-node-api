import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter {
  private readonly scret: string

  constructor (secret: string) {
    this.scret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.scret)
    return null
  }
}
