import { CirclePlus } from "lucide-react";

export const CategoryModalFormConfig = {
    moduleTitle: 'Manage Categories',
    title: 'Create Category',
    description: 'Fill in the details below to create a new category.',
    addButton: {
        id: 'add-category',
        label: 'Add Category',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default'
    },
    fields: [
        {
            id: 'category-name',
            key: 'name',
            name: 'name',
            label: 'Category Name',
            type: 'text',
            placeholder: 'Enter category name',
            autocomplete: 'name',
            tabIndex: 1,
            autoFocus: true,
        },
        {
            id: 'category-description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter category description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 3,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'category-image',
            key: 'image',
            name: 'image',
            label: 'Image (optional)',
            type: 'file',
            accept: 'image/*',
            tabIndex: 3,
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
            label: 'Save Category',
            variant: 'default',
            className: 'cursor-pointer'
        }
    ]


}
