import { create } from "zustand";

interface UserState {
	user: null | { username: string };
	login: (userData: { username: string }) => void;
	logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	login: (userData) => set({ user: userData }),
	logout: () => set({ user: null }),
}));

const savedUser = localStorage.getItem("user");
if (savedUser) {
	const userData = JSON.parse(savedUser);
	useUserStore.getState().login(userData);
}
