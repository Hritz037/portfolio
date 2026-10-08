import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowUpRight, Search, SlidersHorizontal, Sparkles, Play } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';
import { InteractiveDemoModal } from './InteractiveDemoModal';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [liveDemoProject, setLiveDemoProject] = useState<Project | null>(null);

  const categories: Array<{ id: ProjectCategory; label: string }> = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems & Observability' },
    { id: 'ai_canvas', label: 'Collaborative Workspaces' },
    { id: 'fintech', label: 'FinTech Platforms' },
    { id: 'opensource', label: 'Open Source' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-indigo-400 light:text-indigo-600 tracking-wider uppercase mb-2">
              Selected Works & Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 light:text-neutral-900 font-display tracking-tight text-balance">
              Engineered for throughput, durability & craft.
            </h2>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tech or keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-900 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 text-neutral-200 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Interactive Filter Controls: Allowed segmented functional buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 light:bg-neutral-200/60 rounded-xl border border-neutral-800/80 light:border-neutral-300 mb-10 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-800 light:bg-white text-neutral-100 light:text-neutral-900 shadow-sm'
                    : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Bento Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-neutral-800 light:border-neutral-300">
            <p className="text-sm text-neutral-400 light:text-neutral-600">
              No projects found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-indigo-400 light:text-indigo-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {filteredProjects.map((project, index) => {
              // Bento layout: Featured first card takes 8 cols, second takes 4 cols, others take 6 cols
              const isLarge = index === 0;
              const colSpan = isLarge
                ? 'lg:col-span-8'
                : index === 1
                ? 'lg:col-span-4'
                : 'lg:col-span-6';

              return (
                <div
                  key={project.id}
                  className={`${colSpan} group relative rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-neutral-700 light:hover:border-neutral-300 transition-all duration-200 shadow-sm hover:shadow-lg`}
                >
                  {/* Top Thumbnail Image */}
                  <div
                    className="relative aspect-video w-full overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                    {/* Quick overlay triggers */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLiveDemoProject(project);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-md cursor-pointer transition-colors"
                      >
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>Live Demo</span>
                      </button>
                      <div
                        onClick={() => setActiveModalProject(project)}
                        className="bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-200 flex items-center gap-1 border border-neutral-700/60 cursor-pointer hover:bg-neutral-900"
                      >
                        <span>Architecture</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Unboxed Metadata (Zero-pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-neutral-400 light:text-neutral-500">
                        <span>{project.clientOrContext}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Primary Title (Cards lead with title, never pills!) */}
                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className="text-xl font-bold text-neutral-100 light:text-neutral-900 font-display cursor-pointer hover:text-indigo-400 light:hover:text-indigo-600 transition-colors flex items-center justify-between"
                      >
                        <span>{project.title}</span>
                      </h3>

                      <p className="text-sm text-neutral-400 light:text-neutral-600 line-clamp-2 leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Quantitative Key Outcome Metric */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="pt-2 border-t border-neutral-800/60 light:border-neutral-200 text-xs">
                        <span className="text-neutral-500 font-medium">Impact: </span>
                        <span className="font-mono-code font-bold text-indigo-400 light:text-indigo-600 tabular-nums">
                          {project.metrics[0].value}
                        </span>
                        <span className="text-neutral-400 light:text-neutral-600"> ({project.metrics[0].label})</span>
                      </div>
                    )}

                    {/* Unboxed Tech Stack Separators */}
                    <div className="pt-2 text-xs text-neutral-400 light:text-neutral-500 flex flex-wrap gap-x-2 gap-y-1">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span key={tech}>
                          <span className="font-mono-code text-neutral-300 light:text-neutral-700">{tech}</span>
                          {idx < Math.min(project.techStack.length, 4) - 1 && (
                            <span aria-hidden="true" className="ml-2 text-neutral-600 light:text-neutral-400">/</span>
                          )}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-neutral-500">+{project.techStack.length - 4} more</span>
                      )}
                    </div>

                    {/* Bottom Action Affordances */}
                    <div className="pt-3 border-t border-neutral-800/80 light:border-neutral-200 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="font-semibold text-indigo-400 light:text-indigo-600 hover:text-indigo-300 light:hover:text-indigo-700 flex items-center gap-1 transition-colors"
                      >
                        <span>Read Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLiveDemoProject(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/15 hover:bg-indigo-600 text-indigo-400 hover:text-white transition-all font-semibold text-xs active:scale-95 cursor-pointer border border-indigo-500/30"
                          title="Open live interactive demo"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Live Demo</span>
                        </button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 rounded-md hover:bg-neutral-800 light:hover:bg-neutral-200 transition-colors"
                            aria-label={`GitHub repo for ${project.title}`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Case Study Lightbox Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectProject={(proj) => setActiveModalProject(proj)}
        onOpenLiveDemo={(proj) => {
          setActiveModalProject(null);
          setLiveDemoProject(proj);
        }}
        allProjects={projects}
      />

      {/* Live Interactive Demo Sandbox Modal */}
      <InteractiveDemoModal
        project={liveDemoProject}
        isOpen={!!liveDemoProject}
        onClose={() => setLiveDemoProject(null)}
      />
    </section>
  );
};
