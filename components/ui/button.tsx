import * as React from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, variant = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' }) {
  return <button className={cn('inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50', variant === 'default' && 'bg-fd-primary text-fd-primary-foreground hover:opacity-90', variant === 'outline' && 'border bg-fd-background hover:bg-fd-accent', variant === 'ghost' && 'hover:bg-fd-accent', className)} {...props} />;
}
