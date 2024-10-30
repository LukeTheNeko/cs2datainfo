declare module 'js-cookie' {
    interface CookiesStatic {
        set(name: string, value: string | object, options?: { expires?: number; path?: string; }) : string;
        get(name: string): string | undefined;
        remove(name: string, options?: { path?: string; }): void;
    }
    
    const Cookies: CookiesStatic;
    export default Cookies;
}