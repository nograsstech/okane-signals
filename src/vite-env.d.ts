/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_MESSAGE: string
  VITE_OKANE_FINANCE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}