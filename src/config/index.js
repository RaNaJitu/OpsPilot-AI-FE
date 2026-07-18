const config = {
    APP_NAME: "OpsPilot AI",

    APP_VERSION: "v1.0.0",

    API_URL: import.meta.env.VITE_API_URL,

    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,

    NODE_ENV: import.meta.env.MODE,

    /** Display defaults — actual AI calls use server env (OPENAI_MODEL, etc.) */
    AI_MODEL: import.meta.env.VITE_AI_MODEL || "gpt-4o-mini",
    AI_TEMPERATURE: import.meta.env.VITE_AI_TEMPERATURE || "0.2",
    AI_MAX_TOKENS: import.meta.env.VITE_AI_MAX_TOKENS || "4096",
};

export default Object.freeze(config);