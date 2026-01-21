import { MsoData } from ".";
import { Package } from "../models";

export interface PackagesResponse extends MsoData {
  packages: Package[];
}

export interface PackageByIdResponse extends MsoData {
  packageInfo: Package;
}
