import { NameDetailPage, generateStaticParams } from '@/components/NameDetailPage';
export { generateStaticParams };
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <NameDetailPage slug={slug} language="en" />; }
