import { useAuthStore } from "../features/auth/data/datasource/authStoreDatasource";
import { useUserStore } from "../features/user/data/datasource/userStoreDatasource";
import { createContainer } from "./container";

export const staticContainer = createContainer({ authStore: useAuthStore.getState(), userStore: useUserStore.getState() })