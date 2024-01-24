import React from 'react';

type Props = {
	isInput: boolean;
	label: string;
};

const Input = ({ isInput, label, ...props }: Props) => {
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
						className="rounded-sm px-2 py-1 text-black bg-stone-200"
					/>
				) : (
					<textarea
						{...props}
						className="rounded-sm px-2 py-1 text-black bg-stone-200"
					/>
				)}
			</p>
		</>
	);
};

export default Input;
