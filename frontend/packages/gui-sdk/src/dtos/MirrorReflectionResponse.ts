import { IFeelingWordTopic, MirrorReflection } from "../models";
import { MsoData } from "./";

import * as O from "fp-ts/Option";

export interface FeelingWordSTopicSGetResponse extends MsoData {
  feelingWords: O.Option<IFeelingWordTopic[]>;
}

export interface MirrorReflectionCreateResponse extends MsoData {
  mr: string;
}

export interface CelebrationBackgroundImageResponse extends MsoData {
  currentImage: O.Option<number>;
}


export interface MirrorReflectionResponse extends MsoData {
  mr: MirrorReflection;
}

export interface MirrorReflectionsListResponse extends MsoData {
  mirrorReflections: MirrorReflection[];
}
