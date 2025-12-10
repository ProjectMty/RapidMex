// FUNCIONES DE LOCALHOST
export const LS = {
    get(key: string) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(...keys: string[]) {
        keys.forEach(k => localStorage.removeItem(k));
    }
};
