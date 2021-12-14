import { writable } from "svelte/store";

export interface User {
    id: number;
    username : string;
    logged_in?: boolean;
    token?: string;
}

export const getToken = (): string => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem("token");
    }
    return undefined;
};
export const user = writable<User>({
    id: 0,
    username: "",
    token: getToken()
});

export const setToken = (token: string) :void=> {
    localStorage.setItem("token", token);
    user.update((u) => ({ ...u, token }));
};
export const logout = () :void=> {
    localStorage.removeItem("token");
    user.update((u) => ({ ...u, token: undefined }));
};
