import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { Application, Package } from "../models";
import APIPaths from "../api-paths";
import { EmptyResponse, PackageByIdResponse, PackagesResponse } from "../dtos";
import { RequestError, doPost } from "../request";
import { getApplicationByPath } from "./application";
import { CacheKeys, getDataFromCache, putDataToCache, removeDataFromCache } from "../cache";

export const getPackages = (additionalApplicationIds?: string[]): TE.TaskEither<RequestError, Package[]> =>
  pipe(
    getApplicationByPath(window.MS_APP_PATH),
    TE.flatMap((response: Application) =>
      pipe(
        doPost<PackagesResponse>(APIPaths.Package.List, { applicationsId: [response.id, ...(additionalApplicationIds || [])] }),
        TE.map((response: PackagesResponse) => response.packages),
      ),
    ),
  );

export const getPackageById = (packageId: string): TE.TaskEither<RequestError, Package> =>
  pipe(
    doPost<PackageByIdResponse>(APIPaths.Package.ById, { id: packageId }),
    TE.map((response: PackageByIdResponse) => response.packageInfo),
  );

export function loadAllPackages(): TE.TaskEither<RequestError, Package[]> {
  return pipe(
    doPost<PackagesResponse>(APIPaths.Package.AllList),
    TE.map((response: PackagesResponse) => response.packages),
  );
}

type UpdatePackageOptions = {
  name: string;
  description: string;
  id: string;
  survey?: number;
  guidedDiscussion?: number;
  workLifeFulfillment?: number;
  discount?: number;
};

export const updatePackage = (options: UpdatePackageOptions): TE.TaskEither<RequestError, EmptyResponse> => pipe(doPost<EmptyResponse>(APIPaths.Package.Update, { p: options }));

export function storeChosenPackageIdInCache(packageId: string): void {
  putDataToCache(CacheKeys.ChosenPackageId, packageId);
}

export function getChosenPackageIdFromCache(): string {
  const packageIdOption = getDataFromCache<string>(CacheKeys.ChosenPackageId);
  return O.isSome(packageIdOption) ? packageIdOption.value : "";
}

export function removeChosenPackageIdFromCache(): void {
  removeDataFromCache(CacheKeys.ChosenPackageId);
}

