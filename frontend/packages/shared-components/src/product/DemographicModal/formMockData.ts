export interface IFormFields {
  gender: IField;
  age: IField;
  education: IField;
  liveRegion: IField;
  birthRegion: IField;
  industry: IField;
  occupation: IField;
}

export interface IField {
  title: string;
  options: string[];
}

export enum DemographicModalButtonNames {
  SUBMIT = "submit",
  BACK = "back",
  CANCEL = "cancel",
  CLOSE = "close"
}

export const formMockData = {
  gender: {
    title: "Gender",
    options: ["Male", "Female", "Other"],
  },
  birthRegion: {
    title: "Region of birth",
    options: ["Asia", "India", "Middle East", "North Africa", "Sub Saharan Africa", "North America", "Central America", "South America", "Europe", "Eurasia", "Oceania"],
  },
  age: {
    title: "Age group",
    options: ["18-24 years", "25-34 years", "35-44 years", "45-54 years", "55-64 years", "65 years and over"],
  },
  industry: {
    title: "Industry",
    options: [
      "Agriculture, Forestry, Fishing and Hunting",
      "Mining, Quarrying, and Oil and Gas Extraction",
      "Utilities",
      "Construction",
      "Manufacturing",
      "Wholesale Trade",
      "Retail Trade",
      "Transportation and Warehousing",
      "Information",
      "Finance and Insurance",
      "Real Estate and Rental and Leasing",
      "Professional, Scientific, and Technical Services",
      "Management of Companies and Enterprises",
      "Administrative and Support and Waste Management and Remediation Services",
      "Educational Services",
      "Health Care and Social Assistance",
      "Arts, Entertainment, and Recreation",
      "Accommodation and Food Services",
      "Other Services (except Public Administration)",
      "Public Administration",
    ],
  },
  education: {
    title: "Highest education level attained",
    options: ["Secondary school", "College/technical degree", "Masters level and beyond"],
  },
  occupation: {
    title: "Occupation",
    options: [
      "Management Occupations",
      "Business and Financial Operations Occupations",
      "Computer and Mathematical Occupations",
      "Architecture and Engineering Occupations",
      "Life, Physical, and Social Science Occupations",
      "Community and Social Service Occupations",
      "Legal Occupations",
      "Educational Instruction and Library Occupations",
      "Arts, Design, Entertainment, Sports, and Media Occupations",
      "Healthcare Practitioners and Technical Occupations",
      "Healthcare Support Occupations",
      "Protective Service Occupations",
      "Food Preparation and Serving Related Occupations",
      "Building and Grounds Cleaning and Maintenance Occupations",
      "Personal Care and Service Occupations",
      "Sales and Related Occupations",
      "Office and Administrative Support Occupations",
      "Farming, Fishing, and Forestry Occupations",
      "Construction and Extraction Occupations",
      "Installation, Maintenance, and Repair Occupations",
      "Production Occupations",
      "Transportation and Material Moving Occupations",
      "Military Specific Occupations",
    ],
  },
  liveRegion: {
    title: "Region you live",
    options: ["Asia", "India", "Middle East", "North Africa", "Sub Saharan Africa", "North America", "Central America", "South America", "Europe", "Eurasia", "Oceania"],
  },
};

