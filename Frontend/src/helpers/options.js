import { ACTIVE, RECOVERED, DIED } from "./constant";

export const commonSymptoms = [
  { key: "C", value: "Cough", text: "Cough" },
  { key: "F", value: "Fever", text: "Fever" },
  {
    key: "BD",
    value: "Breathing difficulty",
    text: "Breathing difficulty",
  },
  { key: "LoT", value: "Loss of taste", text: "Loss of taste" },
  { key: "LoS", value: "Loss of smell", text: "Loss of smell" },
  { key: "H", value: "Headaches", text: "Headaches" },
  { key: "ST", value: "Sore throat", text: "Sore throat" },
  { key: "T", value: "Tiredness", text: "Tiredness" },
];

export const genderList = [
  { text: "Male", key: "Male", value: "male" },
  { text: "Female", key: "Female", value: "female" },
  { text: "Other", key: "Other", value: "other" },
];

export const status = [
  { text: "Active", key: "Active", value: ACTIVE },
  { text: "Recovered", key: "Recovered", value: RECOVERED },
  { text: "Died", key: "Died", value: DIED },
];
