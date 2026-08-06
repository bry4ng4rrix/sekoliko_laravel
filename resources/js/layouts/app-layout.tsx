import { usePage } from '@inertiajs/react';
import {  useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { toast } from 'sonner';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function AppLayout({ children }: PropsWithChildren) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                    </header>
                    <main className="flex-1 px-6 py-8">{children}</main>
                </SidebarInset>
                <Toaster />
            </SidebarProvider>
        </TooltipProvider>
    );
}
