import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useEffect, type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    
    // Load Chatbase script on component mount
    useEffect(() => {
        // Check if script already exists
          if (document.querySelector('script[chatbotid]')) {
                return;
            }

        // Create and add Chatbase script
        const script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.setAttribute('chatbotId', 'HYINTBGMKQVsPXALmjNAg'); // REPLACE THIS
        script.setAttribute('domain', 'www.chatbase.co');
        script.defer = true;
             script.async = true;

        document.body.appendChild(script);

        
    }, []);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}