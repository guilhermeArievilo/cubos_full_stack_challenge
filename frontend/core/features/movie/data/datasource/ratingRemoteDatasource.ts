import api from "@/infra/http/axios/api";
import { RatingData } from "../../domain/entities/rating";

export default class RatingRemoteDatasource {
  public async listRatings(): Promise<RatingData[]> {
    const res = await api.get<RatingData[]>('/rating/list');

    if (!res.data) {
      return []
    }

    return res.data;
  }
}