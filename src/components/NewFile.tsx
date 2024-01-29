import React, { MouseEventHandler, useRef } from 'react';
import Input from './Input';
import { FaFileUpload } from 'react-icons/fa';

type Props = {
	onAddFile: MouseEventHandler<HTMLButtonElement>;
};

const NewFile = ({ onAddFile }: Props) => {
	const title = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLTextAreaElement>(null);
	const dueDate = useRef<HTMLInputElement>(null);
	const versionControl = useRef<HTMLInputElement>(null);
	const author = useRef<HTMLInputElement>(null);

	const handleSave = () => {};

	return (
		<section className="w-[35rem] pt-16 pb-8 border border-neutral-700 bg-neutral-900 px-10 flex flex-col gap-10 text-stone-50 justify-between rounded-sm">
			<div className="flex flex-col gap-4">
				<Input isInput={true} label={'Title'} ref={title} />
				<Input isInput={false} label={'Description'} ref={description} />
				<Input isInput={true} label={'Due Date'} ref={dueDate} />
				<Input isInput={true} label={'Version Control'} ref={versionControl} />
				<Input isInput={true} label={'Author'} ref={author} />
				<button className="px-4 py-2 border border-stone200 bg-neutral-800  rounded-sm text-xs md:text-base hover:bg-neutral-800 transition-all duration-300 flex gap-1 justify-center items-center">
					<FaFileUpload />
					Uploud...
				</button>
			</div>
			<menu className="flex gap-2">
				<li>
					{/* <ButtonComponent buttonName={'Cancel'} /> */}
					<button
						className="px-4 py-1 border border-neutral-700 bg-neutral-900 rounded-sm text-xs md:text-base hover:bg-neutral-800 transition-all duration-300"
						// onChange={onAddFile}
					>
						Cancel
					</button>
				</li>
				<li>
					{/* <ButtonComponent buttonName={'Save'} /> */}
					<button
						className="px-4 py-1 border border-neutral-700 bg-neutral-800 rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300"
						onClick={handleSave}
					>
						Save
					</button>
				</li>
			</menu>
		</section>
	);
};

export default NewFile;
