const config = {
    APP_NAME: "OpsPilot AI",

    API_URL: import.meta.env.VITE_API_URL,

    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,

    NODE_ENV: import.meta.env.MODE,
};

export default Object.freeze(config);