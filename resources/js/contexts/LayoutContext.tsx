import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type LayoutPosition = 'left' | 'right';

type LayoutContextType = {
    position: LayoutPosition;
    updatePosition: (val: LayoutPosition) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [position, setPosition] = useState<LayoutPosition>('left');

    useEffect(() => {
        const storedPosition = localStorage.getItem('layoutPosition') as LayoutPosition;

        if (storedPosition === 'left' || storedPosition === 'right') {
            setPosition(storedPosition);
        }
    }, []);

    const updatePosition = (val: LayoutPosition) => {
        setPosition(val);
        localStorage.setItem('layoutPosition', val);
    };

    return <LayoutContext.Provider value={{ position, updatePosition }}>{children}</LayoutContext.Provider>;
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) throw new Error('useLayout must be used within LayoutProvider');
    return context;
};
