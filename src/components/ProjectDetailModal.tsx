import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Github,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Cpu,
  BarChart3,
  Play,
  Network,
  Workflow,
  Scale,
  ShieldCheck,
  Database,
  Server,
  Zap,
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenLiveDemo: (project: Project) => void;
  allProjects: Project[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onOpenLiveDemo,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'tradeoffs' | 'overview'>('architecture');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset tab to architecture when project changes
  useEffect(() => {
    setActiveTab('architecture');
  }, [project?.id]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const arch = project.architecture;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 rounded-2xl shadow-2xl overflow-hidden my-auto text-neutral-100 light:text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 light:border-neutral-200 bg-neutral-900/90 light:bg-neutral-100/90 shrink-0">
          <div className="flex items-center gap-2.5 text-xs text-neutral-400 light:text-neutral-600">
            <span className="font-semibold text-neutral-200 light:text-neutral-800">{project.clientOrContext}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-400 light:text-indigo-600 font-medium">{project.role}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLiveDemo(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-white text-white" />
              <span className="hidden sm:inline">Launch Live Demo</span>
              <span className="sm:hidden">Demo</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 rounded-lg hover:bg-neutral-800 light:hover:bg-neutral-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Top Title Bar & Tab Navigation */}
        <div className="px-6 sm:px-8 pt-6 pb-2 shrink-0 border-b border-neutral-800/60 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-neutral-100 light:text-neutral-900 tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-neutral-400 light:text-neutral-600 mt-1">
                {project.tagline}
              </p>
            </div>

            {/* GitHub and Source Links */}
            <div className="flex items-center gap-2 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 light:text-neutral-700 bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700 light:border-neutral-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Tab Selector Controls (Allowed functional buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 bg-neutral-900 light:bg-neutral-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>System Architecture & Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab('tradeoffs')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'tradeoffs'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 bg-neutral-900 light:bg-neutral-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Architectural Trade-offs & Decisions</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 bg-neutral-900 light:bg-neutral-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Visual Preview & Scope</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-8 flex-1">
          {/* ---------------- Tab 1: System Architecture & Pipeline ---------------- */}
          {activeTab === 'architecture' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Architecture Blueprint Narrative */}
              {arch && (
                <div className="p-5 rounded-2xl bg-neutral-950/60 light:bg-neutral-100/70 border border-neutral-800 light:border-neutral-200 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 light:text-indigo-600">
                    <Workflow className="w-4 h-4" />
                    <span>System Architecture Blueprint</span>
                  </div>
                  <p className="text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
                    {arch.systemOverview}
                  </p>
                </div>
              )}

              {/* End-to-End Pipeline Data Flow Diagram */}
              {arch && arch.diagramFlow && arch.diagramFlow.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 light:text-neutral-700 flex items-center gap-1.5">
                      <Network className="w-4 h-4 text-emerald-400" />
                      <span>End-to-End Pipeline Data Flow</span>
                    </h3>
                    <span className="text-[11px] text-neutral-500 font-mono-code">Step-by-step telemetry & execution flow</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {arch.diagramFlow.map((node, idx) => (
                      <div
                        key={node.step}
                        className="relative p-4 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold font-mono-code">
                              {node.step}
                            </span>
                            <span className="text-[10px] font-mono-code text-indigo-400 light:text-indigo-600 font-medium bg-indigo-500/10 px-1.5 py-0.5 rounded">
                              {node.protocol}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-neutral-100 light:text-neutral-900 font-display">
                            {node.label}
                          </div>
                          <div className="text-[11px] font-mono-code text-neutral-400 light:text-neutral-500">
                            {node.tech}
                          </div>
                        </div>

                        <p className="text-[11px] text-neutral-400 light:text-neutral-600 leading-relaxed pt-2 border-t border-neutral-800/60 light:border-neutral-100">
                          {node.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Layers & Subsystems */}
              {arch && arch.layers && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 light:text-neutral-700 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-indigo-400" />
                    <span>Layered Subsystem Breakdown</span>
                  </h3>

                  <div className="space-y-3">
                    {arch.layers.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-950/40 light:bg-neutral-50 border border-neutral-800/80 light:border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                      >
                        <div className="md:col-span-4 space-y-0.5">
                          <div className="text-xs font-bold text-neutral-100 light:text-neutral-900 font-display">
                            {layer.name}
                          </div>
                          <div className="text-[11px] font-mono-code text-indigo-400 light:text-indigo-600">
                            {layer.technology}
                          </div>
                        </div>

                        <div className="md:col-span-4 text-xs text-neutral-300 light:text-neutral-700">
                          <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Responsibility</span>
                          <span>{layer.responsibility}</span>
                        </div>

                        <div className="md:col-span-4 text-xs text-neutral-400 light:text-neutral-600">
                          <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Data Flow Route</span>
                          <span className="font-mono-code text-[11px]">{layer.dataFlow}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Challenge & Execution Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-xl bg-neutral-950/40 light:bg-neutral-50 border border-neutral-800 light:border-neutral-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400 light:text-rose-600 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>Engineering Bottleneck Solved</span>
                  </div>
                  <p className="text-xs text-neutral-300 light:text-neutral-700 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/40 light:bg-neutral-50 border border-neutral-800 light:border-neutral-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 light:text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Implemented Architecture Solution</span>
                  </div>
                  <p className="text-xs text-neutral-300 light:text-neutral-700 leading-relaxed">
                    {project.architectureSolution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- Tab 2: Trade-offs & Decisions ---------------- */}
          {activeTab === 'tradeoffs' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {arch && arch.tradeoffs && arch.tradeoffs.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-300 light:text-neutral-700 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Architectural Trade-offs & Alternatives Considered</span>
                  </div>

                  <div className="space-y-4">
                    {arch.tradeoffs.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-neutral-950/50 light:bg-neutral-50 border border-neutral-800 light:border-neutral-200 space-y-3"
                      >
                        <h4 className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display">
                          {item.decision}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-emerald-400">Chosen Architecture</span>
                            <div className="text-xs font-semibold text-emerald-200 light:text-emerald-900 font-mono-code">
                              {item.chosenApproach}
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-neutral-900 light:bg-neutral-200/60 border border-neutral-800 light:border-neutral-300 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-neutral-400 light:text-neutral-600">Alternative Evaluated</span>
                            <div className="text-xs font-semibold text-neutral-300 light:text-neutral-700 font-mono-code">
                              {item.alternativeConsidered}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 text-xs text-neutral-300 light:text-neutral-700 leading-relaxed">
                          <strong className="text-neutral-100 light:text-neutral-900 font-semibold">Technical Rationale: </strong>
                          <span>{item.rationale}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 text-center text-xs text-neutral-400">
                  Comprehensive trade-offs document available in production repository.
                </div>
              )}

              {/* Resilience & Fault-Tolerance Mechanisms */}
              {arch && arch.resilienceMechanisms && (
                <div className="p-5 rounded-2xl bg-neutral-950/40 light:bg-neutral-100/60 border border-neutral-800 light:border-neutral-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 light:text-indigo-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Fault-Tolerance & SLO Guarantees</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 light:text-neutral-700">
                    {arch.resilienceMechanisms.map((mech, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-indigo-400 font-bold">✓</span>
                        <span>{mech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ---------------- Tab 3: Visual Preview & Scope ---------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Screenshot Preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 light:border-neutral-300 bg-neutral-950">
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-950/40 light:bg-neutral-100/60 border border-neutral-800/80 light:border-neutral-200">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="text-xs text-neutral-400 light:text-neutral-500 font-medium">
                      {metric.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-neutral-100 light:text-neutral-900 font-mono-code tabular-nums">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Narrative Overview */}
              <div className="space-y-2 text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-500">
                  Project Description
                </h3>
                <p>{project.overview}</p>
              </div>

              {/* Tech Stack Unboxed Tags */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-neutral-400 light:text-neutral-500 uppercase tracking-wider">
                  Complete Tooling & Dependencies
                </div>
                <div className="text-xs text-neutral-300 light:text-neutral-700 flex flex-wrap gap-x-3 gap-y-1">
                  {project.techStack.map((tech, idx) => (
                    <span key={tech}>
                      <span className="font-mono-code text-neutral-200 light:text-neutral-800">{tech}</span>
                      {idx < project.techStack.length - 1 && (
                        <span aria-hidden="true" className="ml-3 text-neutral-600 light:text-neutral-300">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Previous / Next navigation */}
        <div className="px-6 py-4 border-t border-neutral-800 light:border-neutral-200 bg-neutral-900/90 light:bg-neutral-100/90 flex items-center justify-between shrink-0">
          <div>
            {prevProject ? (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="text-xs font-medium text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px] sm:max-w-xs">{prevProject.title}</span>
              </button>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenLiveDemo(project)}
              className="text-xs font-semibold text-indigo-400 light:text-indigo-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Test In Live Demo Sandbox</span>
              <Play className="w-2.5 h-2.5 fill-current" />
            </button>
          </div>

          <div>
            {nextProject ? (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="text-xs font-medium text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="truncate max-w-[120px] sm:max-w-xs">{nextProject.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
