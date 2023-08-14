import {
  loginPath,
  surveyPath,
  signUpPath,
  saveSurveyResultPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': saveSurveyResultPath
}
