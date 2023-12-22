export type Id = string

export type UseCase<Result> = {
  readonly execute: () => Promise<Result>
}

export type UseCaseWithParams<Result, Params> = {
  readonly execute: (params: Params) => Promise<Result>
}
