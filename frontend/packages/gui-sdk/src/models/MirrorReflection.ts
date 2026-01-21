export enum CustomFeelingWordTopic {
  upFeeling = "UpFeeling",
  downFeeling = "DownFeeling",
  topic = "Topic",
}

export interface IFeelingWordTopic {
  id?: string | undefined;
  type: CustomFeelingWordTopic;
  text: string[];
}

export interface MirrorReflectionData {
  name: string;
  answers: MirrorReflectionDataAnswer;
  startedAt: number
}

export interface MirrorReflectionDataAnswer {
  [key: string]: {
    name: string;
    type: string;
    answer: string | string[] | Array<{ title: string; answer: string }>;
  };
}

export interface MirrorReflection {
  name: string;
  createdAt: number;
  id: string;
  answers: MirrorReflectionDataAnswer;
}

