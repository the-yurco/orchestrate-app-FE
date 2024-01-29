import React, { forwardRef, ForwardedRef } from 'react';

type Props = {
	isInput: boolean;
	label: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = forwardRef(
	(
		{ isInput, label, ...props }: Props,
		ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
	) => {
		return (
			<>
				<p className="flex flex-col gap-1">
					<label htmlFor="" className="text-sm uppercase">
						{label}
					</label>

					{/* Spread remaining props into textarea or input based on isInput value. */}
					{isInput ? (
						<input
							{...props}
							ref={ref as React.Ref<HTMLInputElement>}
							className="rounded-sm px-2 py-1 text-black bg-stone-200"
						/>
					) : (
						<textarea
							{...props}
							ref={ref as React.Ref<HTMLTextAreaElement>}
							className="rounded-sm px-2 py-1 text-black bg-stone-200"
						/>
					)}
				</p>
			</>
		);
	}
);

export default Input;
