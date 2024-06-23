import type { VariantProps } from "class-variance-authority";

export type RequiredProps<
  Variants extends (...args: any) => any,
  T extends keyof VariantProps<Variants>,
> = Required<{
  [Key in keyof VariantProps<Variants>]: Key extends T
    ? NonNullable<VariantProps<Variants>[Key]>
    : VariantProps<Variants>[Key];
}>;
