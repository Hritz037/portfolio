import React, { useState, useMemo } from 'react';
import { Code2, Server, Cloud, Sparkles, Search, Layers, CheckCircle } from 'lucide-react';
import { SkillCategoryGroup } from '../types/portfolio';

interface SkillsSectionProps {
  skillCategories: SkillCategoryGroup[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchSkill, setSearchSkill] = useState<string>('');

  const activeCategories = useMemo(() => {
    return skillCategories.filter((cat) => {
      if (activeTab !== 'all' && cat.id !== activeTab) return false;
      return true;
    });
  }, [skillCategories, activeTab]);

  const dailyStack = [
    { name: 'TypeScript', role: 'Language standard for 100% of codebases' },
    { name: 'React 19 & Next.js', role: 'Client architecture & Server Components' },
    { name: 'Go (Golang)', role: 'High-throughput microservices & event workers' },
    { name: 'PostgreSQL', role: 'Relational data modeling, indices & triggers' },
    { name: 'Tailwind CSS', role: 'Constraint-based design system styling' },
    { name: 'Docker & K8s', role: 'Hermetic development & deployment' },
    { name: 'ClickHouse / Redis', role: 'High-velocity analytics & in-memory caches' },
    { name: 'Vitest / Playwright', role: 'Automated end-to-end integration testing' },
  ];

  return (
    <section id="skills" className="py-20 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-indigo-400 light:text-indigo-600 tracking-wider uppercase mb-2">
              Technical Competencies & Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 light:text-neutral-900 font-display tracking-tight text-balance">
              Deep expertise across the modern engineering stack.
            </h2>
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              placeholder="Search skill (e.g. Go, React, Docker)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-900 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 text-neutral-200 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Daily Production Tooling Matrix */}
        <div className="mb-14 p-6 rounded-2xl bg-neutral-900/40 light:bg-neutral-100/60 border border-neutral-800/80 light:border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 light:text-neutral-800">
              Primary Production Tooling in Daily Use
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dailyStack.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800/80 light:border-neutral-200/80 flex flex-col justify-between"
              >
                <div className="font-mono-code font-bold text-xs text-indigo-400 light:text-indigo-600">
                  {item.name}
                </div>
                <div className="text-[11px] text-neutral-400 light:text-neutral-600 mt-1">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 light:bg-neutral-200/60 rounded-xl border border-neutral-800/80 light:border-neutral-300 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-neutral-800 light:bg-white text-neutral-100 light:text-neutral-900 shadow-sm'
                : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900'
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-neutral-800 light:bg-white text-neutral-100 light:text-neutral-900 shadow-sm'
                  : 'text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900'
              }`}
            >
              {cat.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeCategories.map((group) => {
            const filteredSkills = group.skills.filter((s) =>
              s.name.toLowerCase().includes(searchSkill.toLowerCase().trim())
            );

            if (filteredSkills.length === 0 && searchSkill) return null;

            return (
              <div
                key={group.id}
                className="p-6 rounded-2xl bg-neutral-900/50 light:bg-neutral-100/70 border border-neutral-800/80 light:border-neutral-200 flex flex-col justify-between space-y-6"
              >
                <div>
                  <h3 className="text-base font-bold text-neutral-100 light:text-neutral-900 font-display">
                    {group.name}
                  </h3>
                  <p className="text-xs text-neutral-400 light:text-neutral-600 mt-1">
                    {group.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredSkills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-200 light:text-neutral-800 flex items-center gap-1.5">
                          {skill.featured && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                          )}
                          <span>{skill.name}</span>
                        </span>
                        <div className="flex items-center gap-3 text-neutral-400 light:text-neutral-500 tabular-nums">
                          <span>{skill.experienceYears}y exp</span>
                          <span className="font-mono-code font-semibold text-neutral-300 light:text-neutral-700">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      {/* Clean visual meter */}
                      <div className="h-1.5 w-full bg-neutral-800 light:bg-neutral-300/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
