export const GLOBAL_CONSTANTS = Object.freeze({
  MODAL_BODY_TYPES: {
    BENEFICIARY_NEW: "BENEFICIARY_NEW",
    CONSTANTS_NEW: "CONSTANTS_NEW",
    CONSULTATIONS_NEW: "CONSULTATIONS_NEW",
    CONSULTATIONS_DONE_DETAILS: "CONSULTATIONS_DONE_DETAILS",
    EXAMS_NEW: "EXAMS_NEW",
    DEFAULT: "",
  },
  RIGHT_SIDE_DRAWER: {
    BENEFICIARY_INFO: "BENEFICIARY_INFO",
    BENEFICIARY_HISTORY: "BENEFICIARY_HISTORY",
    BENEFICIARY_CARD: "BENEFICIARY_CARD",
    EXAMENS_NEW: "EXAMENS_NEW",
    MEDICAL_CERTIFICAT_NEW: "MEDICAL_CERTIFICAT_NEW",
    DEFAULT: "",
  },
  OPTIONS: {
    GENDER_OPTIONS: [
      { name: "MASCULIN", value: "MASCULINE" },
      { name: "FEMININ", value: "FEMININE" },
      { name: "UNDEFINED", value: "UNDEFINED" },
    ],
    CONTRACT_TYPE_OPTIONS: [
      { name: "DURÉE DETERMINÉE", value: "CDD" },
      { name: "DURÉE INDETERMINÉE", value: "CDI" },
      { name: "STAGE", value: "INTERNSHIP" },
    ],
    BLOOD_GROUP_OPTIONS: [
      { name: "O+", value: "O POSITIF" },
      { name: "O-", value: "O NÉGATIF" },
      { name: "A+", value: "A POSITIF" },
      { name: "A-", value: "A NÉGATIF" },
      { name: "B+", value: "B POSITIF" },
      { name: "B-", value: "B NÉGATIF" },
      { name: "AB+", value: "AB POSITIF" },
      { name: "AB-", value: "AB NÉGATIF" },
    ],
    AGENT_TYPE_OPTIONS: [
      { name: "AGENT", value: "AGENT" },
      { name: "CONJOINT", value: "CONJOINT" },
      { name: "ENFANT", value: "ENFANT" },
    ],
    EXAM_TYPE_OPTIONS: [
      { name: "INTERNE", value: "INTERNAL" },
      { name: "EXTERNE", value: "EXTERNAL" },
    ],
  },
  AG_GRID_DEFAULT_COL_DEF: {
    resizable: true,
    sortable: true,
    filter: true,
  },
  PERIODS: {
    LAST_MONTH: "MOIS DERNIER",
    LAST_THREE_MONTHS: "TROIS DERNIERS MOIS",
    LAST_SIX_MONTHS: "SIX DERNIERS MOIS",
    LAST_YEAR: "L'ANNÉE DERNIÈRE",
    LAST_TWO_YEAR: "IL Y'A DEUX ANS",
  },
});

export const FILTERS_CONSTANTS = Object.freeze({
  FILTERS: [
    {
      LABEL: "PERIODE",
      FILTERS: [
        GLOBAL_CONSTANTS.PERIODS.LAST_MONTH,
        GLOBAL_CONSTANTS.PERIODS.LAST_THREE_MONTHS,
        GLOBAL_CONSTANTS.PERIODS.LAST_SIX_MONTHS,
        GLOBAL_CONSTANTS.PERIODS.LAST_YEAR,
        GLOBAL_CONSTANTS.PERIODS.LAST_TWO_YEAR,
      ],
    },
  ],
});
