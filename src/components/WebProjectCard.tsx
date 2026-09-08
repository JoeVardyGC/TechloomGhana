import React from 'react';
import { Globe, Lock, ArrowUpRight, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface WebProjectCardProps {
  project: PortfolioItem;
  onSelectProject: (project: PortfolioItem) => void;
  id?: string;
}

export function getCleanDomain(urlStr?: string): string {
  if (!urlStr) return 'techloomghana.com';
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return urlStr.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  }
}

export default function WebProjectCard({ project, onSelectProject, id }: WebProjectCardProps) {
  const domain = getCleanDomain(project.projectLink);
  const totalScreens = 1 + (project.extraImages?.length || 0);
  const scopeTags = project.scope && project.scope.length > 0
    ? project.scope.slice(0, 2)
    : ['Enterprise UI/UX Architecture', 'Full-Stack Web Engineering'];

  return (
    <div
      id={id}
      onClick={() => onSelectProject(project)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl bg-[#0B1528] border border-slate-800/90 hover:border-cyan-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full text-left"
    >
      {/* 1. Browser Chrome Header Bar */}
      <div className="bg-[#070D19] px-4 py-2.5 flex items-center justify-between border-b border-white/10 select-none shrink-0">
        {/* Traffic Light Window Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        </div>

        {/* Center URL Pill with SSL Lock */}
        <div className="bg-slate-900/90 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-mono text-slate-300 max-w-[180px] sm:max-w-[220px] shadow-inner">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{domain}</span>
        </div>

        {/* Live Status Pulse Dot */}
        <div className="flex items-center shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
      </div>

      {/* 2. Interactive Screen Preview Area */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 shrink-0">
        {/* Live Platform Pill (Top-Left) */}
        <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-emerald-500 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live Web Platform
          </span>
        </div>

        {/* Multi-Screen Views Pill (Top-Right) */}
        <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-sky-300 bg-slate-950/85 backdrop-blur-md border border-sky-500/20 shadow-sm">
            {totalScreens} Multi-Screen Views
          </span>
        </div>

        {/* Stacked Floating Scope Tags (Bottom-Left) */}
        <div className="absolute bottom-3 left-3.5 z-20 flex flex-col gap-1.5 max-w-[85%] pointer-events-none">
          {scopeTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block w-fit max-w-full px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium text-white/95 bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-sm truncate"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-black/20 pointer-events-none z-10" />

        {/* Screen Image with Subtle Hover Zoom */}
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/portfolio-assets/elan-noir-flyer.jpg';
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top block transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* 3. Project Information Body */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow bg-[#0B1528] border-t border-slate-800/80">
        <div className="space-y-2">
          {/* Header Metadata Row */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 truncate">
              {project.client}
            </span>
            <span className="text-[11px] font-medium text-slate-400 shrink-0 text-right">
              Website Design & Architecture
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mt-1">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 4. Dual Action Buttons Footer */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800/70">
          {project.projectLink ? (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-500/30 hover:border-emerald-400 transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visit Live Platform</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          ) : (
            <span className="text-xs text-slate-500">Live deployment</span>
          )}

          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group/btn ml-auto shrink-0"
          >
            <span>View Case Study</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-cyan-400 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}
