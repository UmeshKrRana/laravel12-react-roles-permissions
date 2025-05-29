export const PermissionsTableConfig = {
    columns: [
        { label: 'Permission Name', key: 'label', className: 'border p-4' },
        { label: 'Module', key: 'module', className: 'capitalize border p-4' },
        { label: 'Description', key: 'description', className: 'w-90 border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90', permission: 'view-permission'},
        { label: 'Edit', icon: 'Pencil', className: 'ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90', permission: 'edit-permission'},
        { label: 'Delete', icon: 'Trash2', route: 'categories.destroy', className:'ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90', permission: 'delete-permission'}
    ]
}
