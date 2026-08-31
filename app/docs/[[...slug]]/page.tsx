import { notFound } from 'next/navigation';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc}>
      <h1>{page.data.title}</h1>
      <DocsBody><MDX components={getMDXComponents()} /></DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}