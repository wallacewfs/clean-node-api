export interface CheckSurveyById {
  checkById (id: string): Promise<CheckSurveyById.Result | null>
}

export namespace CheckSurveyById {
  export type Result = boolean
}
