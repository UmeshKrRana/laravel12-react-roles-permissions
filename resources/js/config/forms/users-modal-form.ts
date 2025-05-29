import { CirclePlus } from "lucide-react";

export const UsersModalFormConfig = {
    moduleTitle: 'Manage Users',
    title: 'Create User',
    description: 'Fill in the details below to create a new user.',
    addButton: {
        id: 'add-user',
        label: 'Add User',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-user',
    },
    fields: [
        {
            id: 'full-name',
            key: 'name',
            name: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Enter full name',
            autocomplete: 'name',
            tabIndex: 1,
        },
        {
            id: 'email',
            key: 'email',
            name: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Enter your email',
            autocomplete: 'email',
            tabIndex: 2,
        },
        {
            id: 'password',
            key: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            autocomplete: 'password',
            tabIndex: 3,
        },
        {
            id: 'confirm-password',
            key: 'confirm_password',
            name: 'confirm_password',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm your password',
            autocomplete: 'confirm_password',
            tabIndex: 4,
        },
        {
            id: 'roles',
            key: 'roles',
            name: 'roles',
            label: 'Roles',
            type: 'single-select',
            tabIndex: 5,
            options: []
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
            label: 'Save User',
            variant: 'default',
            className: 'cursor-pointer'
        }
    ]
}
