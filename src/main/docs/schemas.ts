import {
  accountSchema,
  errorSchema,
  loginParamstSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  signUpParamstSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamstSchema,
  signUpParams: signUpParamstSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema
}
