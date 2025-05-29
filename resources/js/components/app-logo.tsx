import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ position }: { position: 'left' | 'right' }) {
    return (
        <div className={`w-full flex items-center ${position === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className={`grid flex-1 truncate text-sm leading-none font-semibold ${position === 'right' ? 'mr-1 text-right' : 'ml-1 text-left'}`}>
                Laravel Starter Kit
            </div>
        </div>
    );
}
