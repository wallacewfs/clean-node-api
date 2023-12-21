export interface LoadAnswersBySurvey {
  loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result | null>
}

export namespace LoadAnswersBySurvey {
  export type Result = string[]
}
