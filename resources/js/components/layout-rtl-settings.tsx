import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { AlignLeft, AlignRight, LucideIcon } from 'lucide-react';
import HeadingSmall from './heading-small';

export const LayoutRtlSettings = () => {
    const tabs: { value: 'left' | 'right'; icon: LucideIcon; label: string }[] = [
        { value: 'left', icon: AlignLeft, label: 'Left' },
        { value: 'right', icon: AlignRight, label: 'Right' },
    ];

    const { position: layoutPosition, updatePosition } = useLayout();

    return (
        <div className="flex flex-col gap-4">
            <Head title="Layout settings" />

            <HeadingSmall title="Layouts settings" description="Choose your preferred layout direction. This will apply to the entire application." />

            <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                {tabs.map(({ value, icon: Icon, label }) => (
                    <button
                        key={value}
                        onClick={() => updatePosition(value)}
                        className={cn(
                            'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                            layoutPosition === value
                                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                        )}
                    >
                        <Icon className="-ml-1 h-4 w-4" />
                        <span className="ml-1.5 text-sm">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
