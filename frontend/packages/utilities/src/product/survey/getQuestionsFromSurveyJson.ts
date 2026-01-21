import { fold } from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { FetchError, getSurveyJson } from "./getSurveyJson";

export interface SurveyJson {
  title: string;
  pages: Array<{
    name: string;
    elements: Array<{
      type: string;
      name: string;
      [key: string]: any;
    }>;
  }>;
}

type GetQuestionsFromSurveyJson = (path: string) => Promise<string[]>;
export const getQuestionsFromSurveyJson: GetQuestionsFromSurveyJson = (path) =>
  pipe(
    getSurveyJson<SurveyJson>(path),
    fold<FetchError, SurveyJson, string[]>(
      () => async () => [],
      (surveyJson) => async () => surveyJson.pages.map((page) => page.elements[0]?.description || ""),
    ),
  )();

