import { Encrypter, Decrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) { }

  async encrypt (plaintext: string): Promise<string> {
    const ciphertext = jwt.sign({ id: plaintext }, this.secret)
    return ciphertext
  }

  async decrypt (ciphertext: string): Promise<string> {
    const plaintext: any = jwt.verify(ciphertext, this.secret)
    return plaintext
  }
}
