import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLayout } from '@/contexts/LayoutContext';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { position } = useLayout();

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className={`flex w-full items-center gap-2 ${position === 'right' ? 'justify-end' : 'justify-start'}`}>
                {position === 'left' ? (
                    <>
                        <SidebarTrigger className="-ml-1" />
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </>
                ) : (
                    <>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <SidebarTrigger className="-mr-1" />
                    </>
                )}
            </div>
        </header>
    );
}
