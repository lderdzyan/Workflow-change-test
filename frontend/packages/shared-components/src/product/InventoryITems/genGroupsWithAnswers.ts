import { Theme } from "@mui/material";
import { getImageSrc } from "@repo/utilities";

export interface QAPair {
  question: string;
  answer: string;
  id: string;
}

export interface IResponse {
  groupName: string;
  color: string;
  qaPairs: QAPair[];
  imageSrc: string;
}

enum QuestionGroups {
  "unity" = "Unity with Others",
  "service" = "Service to Others",
  "expressing" = "Expressing Full Potential",
  "integrity" = "Integrity with Self",
  "reality" = "Reality of Self and Circumstances",
  "inspiration" = "Inspiration",
  "being_doing" = "Balancing Being and Doing",
  "self_other" = "Balancing Self and Others",
  "lastThree" = "Well-being",
}

type GenGroupsWithAnswers = (theme: Theme, questions: string[], answers: string[], chosen?: string[]) => IResponse[];
export const genGroupsWithAnwers: GenGroupsWithAnswers = (theme, questions, answers, chosen) => {

  let groups: IResponse[] = [
    {
      groupName: QuestionGroups.unity,
      color: theme.palette.periwinkle.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/unity.png"),
    },
    {
      groupName: QuestionGroups.service,
      color: theme.palette.orange.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/service.png"),
    },
    {
      groupName: QuestionGroups.expressing,
      color: theme.palette.lucky.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/expressing.png"),
    },
    {
      groupName: QuestionGroups.integrity,
      color: theme.palette.pink.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/integrity.png"),
    },
    {
      groupName: QuestionGroups.reality,
      color: theme.palette.sky.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/reality.png"),
    },
    {
      groupName: QuestionGroups.inspiration,
      color: theme.palette.canary.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/inspiration.png"),
    },
    {
      groupName: QuestionGroups.being_doing,
      color: theme.palette.sky.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/being_doing.png"),
    },
    {
      groupName: QuestionGroups.self_other,
      color: theme.palette.sky.main!,
      qaPairs: [],
      imageSrc: getImageSrc("product/inventoryItems/self_others.png"),
    },
    {
      groupName: QuestionGroups.lastThree,
      color: theme.palette.charcoal.main!,
      qaPairs: [],
      imageSrc: "",
    },
  ];

  questions.forEach((question, index) => {
    if (index <= 5) {
      groups[0]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 9) {
      groups[1]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 13) {
      groups[2]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 16) {
      groups[3]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 19) {
      groups[4]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 23) {
      groups[5]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 25) {
      groups[6]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else if (index <= 27) {
      groups[7]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    } else {
      groups[8]?.qaPairs.push({ question: question, answer: answers[index] || "", id: `mws-${index + 1}` });
    }
  });

  if (chosen?.length) {
    groups = groups.map((group) => ({ ...group, qaPairs: group.qaPairs.filter((pair) => chosen.includes(pair.id)) })).filter((group) => group.qaPairs.length);
  }

  return groups;
};

