import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository with correct value', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const accountId = faker.string.uuid()
    await sut.load(accountId)
    expect(loadSurveysRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return a list surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const surveys = await sut.load(faker.string.uuid())
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.string.uuid())
    await expect(promise).rejects.toThrow()
  })
})
