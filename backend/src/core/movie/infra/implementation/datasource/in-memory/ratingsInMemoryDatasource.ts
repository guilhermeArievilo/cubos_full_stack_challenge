import { Rating, RatingData } from "@/core/movie/domain/entities/rating";

export const allRatingsData: RatingData[] = [
  {
    label: 'Livre',
    value: Rating.LIVRE
  },
  {
    label: '10 anos',
    value: Rating.DEZ_ANOS
  },
  {
    label: '12 anos',
    value: Rating.DOZE_ANOS
  },
  {
    label: '14 anos',
    value: Rating.QUATORZE_ANOS
  },
  {
    label: '16 anos',
    value: Rating.DEZESSEIS_ANOS
  },
  {
    label: '18 anos',
    value: Rating.DEZOITO_ANOS
  }
]
