export const ProductSkeleton = () => (
	<div className='bg-white rounded-[2.5rem] p-6 border border-slate-100 animate-pulse'>
		<div className='aspect-square bg-slate-100 rounded-3xl mb-5' />
		<div className='h-4 bg-slate-100 rounded-full w-3/4 mb-2' />
		<div className='h-3 bg-slate-50 rounded-full w-1/4 mb-6' />
		<div className='flex justify-between items-center mt-auto'>
			<div className='h-8 bg-slate-100 rounded-lg w-20' />
			<div className='h-8 bg-slate-100 rounded-lg w-16' />
		</div>
		<div className='h-12 bg-slate-100 rounded-2xl w-full mt-4' />
	</div>
);
