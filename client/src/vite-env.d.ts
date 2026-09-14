/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Backend origin to call in production builds (e.g. "https://api.example.com").
   * Leave unset in dev — Vite proxies /api to API_PROXY_TARGET instead.
   */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}