import React from 'react';

type Props = {
	buttonName: string;
};

const ButtonComponent = ({ buttonName }: Props) => {
	return (
		<button className="px-4 py-1 border border-sky-700 bg-sky-800 rounded-md text-xs md:text-base hover:bg-sky-700 transition-all duration-300">
			{buttonName}
		</button>
	);
};

export default ButtonComponent;
