import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export const CustomToast = () => {
    return <Toaster position="top-right" duration={4000} richColors />;
};

export { toast };
