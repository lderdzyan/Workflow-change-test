import { pipe, Option } from "effect";
import { getCurrentPerson, Person, User } from "@repo/gui-sdk";
import { MicroAppsBases } from "../location";
import { fpOptionToEffect } from "../../product/fpOptionToEffect";

const getEffectOptionUser = (person: Person): Option.Option<User> => fpOptionToEffect(person.user);

export const normalizeBase = (base: MicroAppsBases) => base.slice(0, -1);

const conceptUserCheck = (appList: string[]) => !appList.some((base) => base === normalizeBase(MicroAppsBases.MWI));

const b2b2cUserCheck = (user: User) => Boolean(user.isB2b2c);

export const isConceptsUser = (): boolean =>
  pipe(
    getCurrentPerson(),
    getEffectOptionUser,
    Option.exists((user) => {
      if (user.appList) {
        return conceptUserCheck(user.appList);
      }
      return false;
    }),
  );

export const isB2b2cUser = (): boolean => pipe(getCurrentPerson(), getEffectOptionUser, Option.exists(b2b2cUserCheck));

