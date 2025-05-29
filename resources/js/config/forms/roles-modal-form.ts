import { CirclePlus } from "lucide-react";

export const RolesModalFormConfig = {
    moduleTitle: 'Manage Roles',
    title: 'Create Role',
    description: 'Fill in the details below to create a new role.',
    addButton: {
        id: 'add-role',
        label: 'Add Role',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default'
    },
    fields: [
        {
            id: 'role-label',
            key: 'label',
            name: 'label',
            label: 'Role Label (ex. Super Admin)',
            type: 'text',
            placeholder: 'Enter role label',
            autocomplete: 'label',
            tabIndex: 1,
        },
        {
            id: 'description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter role description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 2,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'permissions',
            key: 'permissions',
            name: 'permissions[]',
            label: 'Permissions',
            type: 'grouped-checkboxes',
            tabIndex: 2,
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
            label: 'Save Role',
            variant: 'default',
            className: 'cursor-pointer'
        }
    ]
}
