import * as O from "fp-ts/Option";
import * as EO from "effect/Option";

export const fpOptionToEffect = <A>(oa: O.Option<A>): EO.Option<A> => (O.isSome(oa) ? EO.some(oa.value) : EO.none());

