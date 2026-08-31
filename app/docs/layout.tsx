import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/flux';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { AISearch } from '@/components/ai/search';
import { AIAssistantTrigger } from '@/components/ai/search';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...baseOptions()} tree={source.getPageTree()}>
      <AISearch>
        <AIAssistantTrigger />
        {children}
      </AISearch>
    </DocsLayout>
  );
}