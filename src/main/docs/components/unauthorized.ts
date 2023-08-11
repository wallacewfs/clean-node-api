export const unauthorized = {
  description: 'Credênciais inválidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
