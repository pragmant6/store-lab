import { useField } from 'formik';
import React from 'react';

interface Props {
	label: string;
	name: string;
	type?: string;
	placeholder?: string;
	icon?: React.ReactNode;
}

export const FormInput = ({ label, icon, ...props }: Props) => {
	const [field, meta] = useField(props);
	const hasError = meta.touched && meta.error;

	return (
		<div className='flex flex-col gap-1.5 w-full'>
			<label className='text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>
				{label}
			</label>
			<div className='relative group'>
				{icon && (
					<div
						className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
							hasError
								? 'text-rose-400'
								: 'text-slate-400 group-focus-within:text-indigo-500'
						}`}>
						{icon}
					</div>
				)}
				<input
					{...field}
					{...props}
					className={`w-full py-3.5 rounded-2xl border-2 transition-all outline-none text-sm font-medium
          ${icon ? 'pl-12' : 'px-5'} 
          ${
						hasError
							? 'bg-rose-50 border-rose-200 focus:border-rose-500'
							: 'bg-slate-50 border-transparent focus:border-indigo-500 focus:bg-white'
					}`}
				/>
			</div>
			{hasError && (
				<span className='text-rose-500 text-[10px] font-bold ml-2 animate-pulse italic'>
					{meta.error}
				</span>
			)}
		</div>
	);
};
