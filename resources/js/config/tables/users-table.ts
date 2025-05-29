export const UsersTableConfig = {
    columns: [
        { label: 'User Name', key: 'name', className: 'border p-4' },
        { label: 'Email', key: 'email', className: 'w-90 border p-4' },
        { label: 'Roles', key: 'roles', className: 'border p-4', type: 'multi-values' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90', permission: 'view-user'},
        { label: 'Edit', icon: 'Pencil', className: 'ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90', permission: 'edit-user'},
        { label: 'Delete', icon: 'Trash2', route: 'categories.destroy', className:'ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90', permission: 'delete-user'}
    ]
}
