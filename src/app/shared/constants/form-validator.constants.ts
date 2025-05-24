export const FORM_VALIDATORS = {
  CATEGORY: {
    MAX_NAME_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 90,
  },

    PATTERNS: {
    MAX_NAME_LENGTH: 30,
    MAX_LASTNAME_LENGTH: 30,
    NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    LASTNAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    DOCUMENT: /^\d{10}$/,
    PHONE: /^(\+57)?\d{10}$/,
    BIRTHDATE:18,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^\S+$/,
  },
};