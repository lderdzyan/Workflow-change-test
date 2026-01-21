import { ShortName, SurveyAnswer } from "@repo/gui-sdk";

type CheckProduct = (surveyAnswer: SurveyAnswer | null, productType: ShortName) => boolean;
export const checkProduct: CheckProduct = (surveyAnswer, productType) => {
  if (!surveyAnswer) return false;
  const product = surveyAnswer.packageInfo?.find((myPackage) => myPackage.products.find((product) => product.shortName === productType));
  return Boolean(product);
};

