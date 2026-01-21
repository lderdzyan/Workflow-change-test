import { MsoData } from "../../../dtos";
import { Builder, WorkbookData } from "../models";

export interface BuilderResponse extends MsoData {
  builder?: Builder;
  workbook?: WorkbookData;
}
