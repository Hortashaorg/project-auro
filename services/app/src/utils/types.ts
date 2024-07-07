import type { VariantProps } from "class-variance-authority";

type Optionalize<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type NonNullableProps<
	// biome-ignore lint/suspicious/noExplicitAny: Unknown creates issues when using
	Variants extends (...args: any) => any,
	T extends keyof VariantProps<Variants>,
> = Optionalize<
	{
		[Key in keyof VariantProps<Variants>]: NonNullable<
			VariantProps<Variants>[Key]
		>;
	},
	T
>;
