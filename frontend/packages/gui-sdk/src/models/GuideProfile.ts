export interface Highlight {
  setting?: string;
  headline: string;
  answer: string;
}

export interface ICalendly {
  username?: string;
}

export interface GuideProfile {
  id?: string;
  calendly?: ICalendly;
  country?: string;
  countryState?: string;
  city?: string;
  calendlyUsername?: string;
  firstName?: string;
  lastName?: string;
  languages?: string[];
  workLifeRoles?: string[];
  profileImageId?: string;
  profileImage?: string;
  welcomeMessageId?: string;
  welcomeMessage?: string;
  welcomeMessageDuration?: number;
  experiences?: string;
  goodAdvice?: string;
  highlights?: Highlight[];
  createdBy?: string;
  updatedBy?: string;
  createdAt?: number;
  createdOn?: string;
  updatedAt?: number;
  updatedOn?: string;
}

