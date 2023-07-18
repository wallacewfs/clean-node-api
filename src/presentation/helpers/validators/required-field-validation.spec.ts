import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required field Validation', () => {
  test('Should return a MissingParamError if Validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
