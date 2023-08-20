/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GTAG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
