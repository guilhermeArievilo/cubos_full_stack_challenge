import { useAuthStore } from "../features/auth/data/datasource/authStoreDatasource";
import { createContainer } from "./container";

export const staticContainer = createContainer({ authStore: useAuthStore.getState() })