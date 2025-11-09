export enum Rating {
  LIVRE = "LIVRE",
  DEZ_ANOS = "DEZ_ANOS",
  DOZE_ANOS = "DOZE_ANOS",
  QUATORZE_ANOS = "QUATORZE_ANOS",
  DEZESSEIS_ANOS = "DEZESSEIS_ANOS",
  DEZOITO_ANOS = "DEZOITO_ANOS"
}

export type RatingData = {
  label: string,
  value: Rating
}