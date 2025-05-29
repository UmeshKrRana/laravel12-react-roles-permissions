import { CirclePlus } from "lucide-react";

export const PermissionModalFormConfig = {
    moduleTitle: 'Manage Permissions',
    title: 'Create Permission',
    description: 'Fill in the details below to create a new permission.',
    addButton: {
        id: 'add-permission',
        label: 'Add Permission',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-permission',
    },
    fields: [
        {
            id: 'module',
            key: 'module',
            name: 'module',
            label: 'Module Name',
            type: 'single-select',
            placeholder: 'Enter category name',
            tabIndex: 1,
            autoFocus: true,
            options: [
                { label: 'Categories', value: 'categories', key: 'categories'},
                { label: 'Products', value: 'products', key: 'products'},
                { label: 'Roles', value: 'roles', key: 'roles'},
                { label: 'Users', value: 'users', key: 'users'},
                { label: 'Permissions', value: 'permissions', key: 'permissions'},
            ]
        },
        {
            id: 'permission-label',
            key: 'label',
            name: 'label',
            label: 'Permission Label (ex. Create User)',
            type: 'text',
            placeholder: 'Enter permission label',
            autocomplete: 'label',
            tabIndex: 2,
        },
        {
            id: 'description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter permission description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 2,
            className: 'rounded border p-2 w-full',
        },
    ],
    buttons: [
        {
            key: 'cancel',
            type: 'button',
            label: 'Cancel',
            variant: 'ghost',
            className: 'cursor-pointer',
        },
        {
            key: 'submit',
            type: 'submit',
            label: 'Save Permission',
            variant: 'default',
            className: 'cursor-pointer'
        }
    ]
}
