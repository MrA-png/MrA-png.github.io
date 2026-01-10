import { projects } from '../../data/projects';
import { ProjectDetailClient } from './ProjectDetailClient';

// Required for static export with dynamic routes
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  return <ProjectDetailClient projectId={id} />;
}

