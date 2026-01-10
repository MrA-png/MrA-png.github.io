import { articles } from '../../data/articles';
import { ArticleDetailClient } from './ArticleDetailClient';

// Required for static export with dynamic routes
export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params;
  return <ArticleDetailClient articleId={id} />;
}

