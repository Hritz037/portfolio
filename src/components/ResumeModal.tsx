import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import { ProfileData, ExperienceItem, EducationItem, SkillCategoryGroup } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategoryGroup[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  education,
  skillCategories,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-neutral-100 light:text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 light:border-neutral-200 bg-neutral-900/90 light:bg-neutral-100/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-display">{profile.name} — Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 light:hover:bg-neutral-300 transition-colors"
              title="Print or export to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
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

        {/* Printable Resume Content */}
        <div className="overflow-y-auto px-6 py-8 sm:px-12 space-y-8 bg-neutral-900 light:bg-white text-neutral-200 light:text-neutral-900">
          {/* Resume Header */}
          <div className="border-b border-neutral-800 light:border-neutral-200 pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-neutral-100 light:text-neutral-900">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-indigo-400 light:text-indigo-600">
              {profile.roleTitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 light:text-neutral-600 pt-1 font-mono-code">
              <span>{profile.email}</span>
              <span aria-hidden="true">·</span>
              <span>github.com/hritikagupta</span>
              <span aria-hidden="true">·</span>
              <span>linkedin.com/in/hritikagupta</span>
              <span aria-hidden="true">·</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-500">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
              {profile.bioIntro}
            </p>
          </div>

          {/* Technical Skills Overview */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-500">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-3 rounded-lg bg-neutral-950/40 light:bg-neutral-100/60 border border-neutral-800/60 light:border-neutral-200">
                  <div className="font-semibold text-neutral-200 light:text-neutral-800 mb-1">
                    {cat.name.split('&')[0].trim()}
                  </div>
                  <div className="text-neutral-400 light:text-neutral-600 leading-relaxed font-mono-code text-[11px]">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-500 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2 border-l-2 border-neutral-800 light:border-neutral-200 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display">
                      {exp.role} <span className="font-normal text-indigo-400 light:text-indigo-600">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono-code text-neutral-400 light:text-neutral-500">
                      {exp.period} · {exp.location}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 light:text-neutral-700">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1 text-xs text-neutral-400 light:text-neutral-600 list-disc list-inside">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-500 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </h2>

            {education.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-neutral-800 light:border-neutral-200 pl-4 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-neutral-100 light:text-neutral-900">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-mono-code text-neutral-400 light:text-neutral-500">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs text-indigo-400 light:text-indigo-600 font-medium">
                  {edu.institution} · {edu.location}
                </div>
                {edu.honors && (
                  <div className="text-xs text-amber-400 font-medium">{edu.honors}</div>
                )}
                <div className="text-xs text-neutral-400 light:text-neutral-600">{edu.focus}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
