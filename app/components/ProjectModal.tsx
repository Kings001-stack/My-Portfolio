"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/supabase/types";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (project) {
            setIsAnimating(true);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [project]);

    if (!project) return null;

    return (
        <div
            className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${isAnimating ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform ${isAnimating ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
                    }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors"
                >
                    <i className="bi bi-x-lg text-xl"></i>
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                    {/* Image Section */}
                    <div className="md:w-3/5 relative h-64 md:h-auto min-h-[300px] bg-black/50">
                        <Image
                            src={project.cover_image || "/port.png"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#111]/20"></div>
                    </div>

                    {/* Info Section */}
                    <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#111]">
                        <div>
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                    {project.title}
                                </h2>
                                <div className="h-1 w-12 bg-primary rounded-full"></div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {project.tech_stack && Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                                    <div>
                                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">
                                            Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {(project.tech_stack as string[]).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="w-full glow-btn flex items-center justify-center gap-2 py-3 font-semibold"
                            >
                                View Full Case Study
                                <i className="bi bi-arrow-right"></i>
                            </Link>

                            {project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-center font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <i className="bi bi-globe"></i>
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
