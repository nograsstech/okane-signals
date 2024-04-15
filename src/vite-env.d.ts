/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_MESSAGE: string
  OKANE_FINANCE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}