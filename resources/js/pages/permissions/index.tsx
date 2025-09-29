import { CustomModalForm } from '@/components/custom-modal-form';
import { CustomTable } from '@/components/custom-table';
import { CustomToast, toast } from '@/components/custom-toast';
import { Pagination } from '@/components/ui/pagination';
import { PermissionModalFormConfig } from '@/config/forms/permission-modal-form';
import { PermissionsTableConfig } from '@/config/tables/permissions-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Permissions',
        href: '/permissions',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Permission {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    featured_image_original_name: string;
    created_at: string;
}

interface PermissionPagination {
    data: Permission[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface FlashProps extends Record<string, any> {
    flash?: {
        success?: string;
        error?: string;
    };
}

interface IndexProps {
    permissions: PermissionPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

export default function Index({ permissions, totalCount, filteredCount }: IndexProps) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<'create' | 'view' | 'edit'>('create');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const { data, setData, errors, processing, reset, post } = useForm({
        module: '',
        label: '',
        description: '',
        _method: 'POST',
        perPage: '10',
    });

    // Handle Delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            router.delete(route, {
                preserveScroll: true,
                onSuccess: (response: { props: FlashProps }) => {
                    const successMessage = response.props.flash?.success;
                    successMessage && toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error?.message;
                    errorMessage && toast.error(errorMessage);
                    closeModal();
                },
            });
        }
    };

    // Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Edit mode
        if (mode === 'edit' && selectedCategory) {
            data._method = 'PUT';

            post(route('permissions.update', selectedCategory.id), {
                forceFormData: true,
                onSuccess: (response: { props: FlashProps }) => {
                    const successMessage = response.props.flash?.success;
                    successMessage && toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error?.message;
                    errorMessage && toast.error(errorMessage);
                },
            });
        } else {
            post(route('permissions.store'), {
                onSuccess: (response: { props: FlashProps }) => {
                    const successMessage = response.props.flash?.success;
                    successMessage && toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error?.message;
                    errorMessage && toast.error(errorMessage);
                },
            });
        }
    };

    // Closing modal
    const closeModal = () => {
        setMode('create');
        setSelectedCategory(null);
        reset();
        setModalOpen(false);
    };

    // Handle Modal Toggle
    const handleModalToggle = (open: boolean) => {
        setModalOpen(open);

        if (!open) {
            setMode('create');
            setSelectedCategory(null);
            reset();
        }
    };

    // Open Modal
    const openModal = (mode: 'create' | 'view' | 'edit', category?: any) => {
        setMode(mode);

        if (category) {
            Object.entries(category).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });

            // Setting image preview
            setSelectedCategory(category);
        } else {
            reset();
        }

        setModalOpen(true);
    };

    // Handle Per Page Change
    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };

        router.get(route('permissions.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <CustomToast />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Custom Modal Form Component */}
                <div className="ml-auto">
                    <CustomModalForm
                        addButton={PermissionModalFormConfig.addButton}
                        title={mode === 'view' ? 'View Permission' : mode === 'edit' ? 'Update Permission' : PermissionModalFormConfig.title}
                        description={PermissionModalFormConfig.description}
                        fields={PermissionModalFormConfig.fields}
                        buttons={PermissionModalFormConfig.buttons}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        handleSubmit={handleSubmit}
                        open={modalOpen}
                        onOpenChange={handleModalToggle}
                        mode={mode}
                    />
                </div>

                {/* Custom Table component */}
                <CustomTable
                    columns={PermissionsTableConfig.columns}
                    actions={PermissionsTableConfig.actions}
                    data={permissions.data}
                    from={permissions.from}
                    onDelete={handleDelete}
                    onView={(category) => openModal('view', category)}
                    onEdit={(category) => openModal('edit', category)}
                    isModal={true}
                />

                {/* Pagination */}
                <Pagination
                    products={permissions}
                    perPage={data.perPage}
                    onPerPageChange={handlePerPageChange}
                    totalCount={totalCount}
                    filteredCount={filteredCount}
                    search={data.search}
                />
            </div>
        </AppLayout>
    );
}
