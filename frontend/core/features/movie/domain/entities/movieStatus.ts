export enum MovieStatus {
  ANNOUNCED = "ANNOUNCED",
  PRE_PRODUCTION = "PRE_PRODUCTION",
  FILMING = "FILMING",
  POST_PRODUCTION = "POST_PRODUCTION",
  COMPLETED = "COMPLETED",
  RELEASED = "RELEASED",
  IN_THEATERS = "IN_THEATERS",
  STREAMING = "STREAMING",
  CANCELLED = "CANCELLED",
  DELAYED = "DELAYED",
  ARCHIVED = "ARCHIVED",
}

export const movieStatus = [
  { value: "ANNOUNCED", label: "Anunciado" },
  { value: "PRE_PRODUCTION", label: "Pré-produção" },
  { value: "FILMING", label: "Filmando" },
  { value: "POST_PRODUCTION", label: "Pós-produção" },
  { value: "COMPLETED", label: "Concluído" },
  { value: "RELEASED", label: "Lançado" },
  { value: "IN_THEATERS", label: "Nos cinemas" },
  { value: "STREAMING", label: "Em streaming" },
  { value: "CANCELLED", label: "Cancelado" },
  { value: "DELAYED", label: "Adiado" },
  { value: "ARCHIVED", label: "Arquivado" },
] as const;