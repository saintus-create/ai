import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: 'AI' },
    themeSwitch: { mode: 'light-dark-system' },
  };
}