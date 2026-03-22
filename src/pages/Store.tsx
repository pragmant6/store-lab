import { useState } from 'react';

import { StatsGrid } from '../components/StatsGrid';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { EditProductModal } from '../components/EditProductModal';
import { AddProductModal } from '../components/AddProductModal';
import { Search, Plus, Filter } from 'lucide-react';
import type { Product } from '../core/types';
import {
	useDeleteProduct,
	useProducts,
	useUpdateProduct,
} from '../hooks/useProducts';
import { useAddPurchase } from '../hooks/usePurchases';

export const Store = () => {
	// --- Estados Locales ---
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('All');
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	// --- Hooks de Datos (TanStack Query) ---
	const { data: products, isLoading } = useProducts(search, category);
	const buyMutation = useAddPurchase();
	const deleteMutation = useDeleteProduct();
	const updateMutation = useUpdateProduct();

	const categories = ['All', 'Laptops', 'Phones', 'Audio', 'Accessories'];

	return (
		<div className='space-y-10 animate-fade-in'>
			{/* 📊 1. Panel de Estadísticas Real-time */}
			<StatsGrid />

			{/* 🎯 2. Cabecera de Acción */}
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h2 className='text-3xl font-black text-slate-900 tracking-tighter italic uppercase'>
						Inventario <span className='text-indigo-600'>Local</span>
					</h2>
					<p className='text-slate-400 text-sm font-medium'>
						Gestiona productos y simula compras.
					</p>
				</div>

				<button
					onClick={() => setIsAddModalOpen(true)}
					className='flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95'>
					<Plus size={20} strokeWidth={3} />
					Nuevo Producto
				</button>
			</div>

			{/* 🔍 3. Filtros y Buscador */}
			<div className='flex flex-col lg:flex-row gap-4 bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 items-center'>
				<div className='relative flex-1 w-full'>
					<Search
						className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300'
						size={18}
					/>
					<input
						type='text'
						placeholder='¿Qué estás buscando?...'
						className='w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm font-medium'
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className='flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar'>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setCategory(cat)}
							className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${
									category === cat
										? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
										: 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
								}`}>
							{cat}
						</button>
					))}
				</div>
			</div>

			{/* 🛍️ 4. Grid de Productos */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
				{isLoading ? (
					// Skeletons de carga
					Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
				) : !products || products.length === 0 ? (
					// Empty State
					<div className='col-span-full py-32 flex flex-col items-center justify-center text-slate-300'>
						<Filter size={64} strokeWidth={1} className='mb-4 opacity-20' />
						<p className='text-xl font-bold italic'>
							No hay productos que coincidan...
						</p>
						<button
							onClick={() => {
								setSearch('');
								setCategory('All');
							}}
							className='mt-4 text-indigo-600 font-bold hover:underline'>
							Limpiar filtros
						</button>
					</div>
				) : (
					// Render de Productos
					products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onEdit={(p) => setEditingProduct(p)}
							onDelete={(id) => {
								if (window.confirm('¿Eliminar este producto?')) {
									deleteMutation.mutate(id);
								}
							}}
							onBuy={(p) =>
								buyMutation.mutate({ productId: p.id, price: p.price })
							}
							isBuying={buyMutation.isPending}
						/>
					))
				)}
			</div>

			{/* 📝 5. Modal: Añadir Producto */}
			{isAddModalOpen && (
				<AddProductModal onClose={() => setIsAddModalOpen(false)} />
			)}

			{/* ✏️ 6. Modal: Editar Producto */}
			{editingProduct && (
				<EditProductModal
					product={editingProduct}
					onClose={() => setEditingProduct(null)}
					onSubmit={(values) => {
						updateMutation.mutate({ id: editingProduct.id, data: values });
						setEditingProduct(null);
					}}
				/>
			)}
		</div>
	);
};
