import { experiences } from '../../data/experiences';
import { ExperienceDetailClient } from './ExperienceDetailClient';

// Required for static export with dynamic routes
export function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }));
}

interface ExperienceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { id } = await params;
  return <ExperienceDetailClient experienceId={id} />;
}
