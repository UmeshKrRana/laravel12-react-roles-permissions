export const ProductTableConfig = {
    columns: [
        { label: 'Product Name', key: 'name', className: 'border p-4' },
        { label: 'Description', key: 'description', className: 'w-90 border p-4' },
        { label: 'Price (INR)', key: 'price', className: 'border p-4' },
        { label: 'Featured Image', key: 'featured_image', isImage: true, className: 'border p-4' },
        { label: 'Created Date', key: 'created_at', className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', route: 'products.show', className: 'cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90'},
        { label: 'Edit', icon: 'Pencil', route: 'products.edit', className: 'ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90'},
        { label: 'Delete', icon: 'Trash2', route: 'products.destroy', className:'ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90'}
    ]
}
