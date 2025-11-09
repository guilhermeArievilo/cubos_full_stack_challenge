import api from "@/infra/http/axios/api";
import { Language } from "../../domain/entities/language";

export default class LanguageRemoteDatasource {
  public async listLanguages(): Promise<Language[]> {
    const res = await api.get<Language[]>('/language/list');

    if (!res.data) {
      return []
    }

    return res.data;
  }
}