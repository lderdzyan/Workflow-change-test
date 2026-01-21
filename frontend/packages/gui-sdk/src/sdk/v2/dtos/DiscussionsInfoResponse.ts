import { MsoData } from "../../../dtos/index";

export interface DiscussionsInfoResponse extends MsoData {
  incompleteDiscussions: string[];
  canceledDiscussions: string[];
}
