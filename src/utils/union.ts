type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer R
) => void
  ? R
  : never;

type LastOfUnion<U> =
  UnionToIntersection<U extends any ? () => U : never> extends () => infer R
    ? R
    : never;

type UnionToTuple<U, Last = LastOfUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

export type AllUnionElements<T> = UnionToTuple<T>;
