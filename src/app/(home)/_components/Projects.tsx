"use client";

import { Variants } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MotionDiv, MotionLi } from "@/components/Framer";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Projects as ProjectsType } from "@/types";

interface Props {
  projects: ProjectsType[];
}

export function Projects({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<ProjectsType | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const sheetContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const sheetItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const sheetImage: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <Section
      text="Projects"
      href="projects"
      paragraph="A curated selection of projects that demonstrate my approach to building thoughtful, well-engineered applications, with an emphasis on performance, usability, and clean architecture."
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-screen w-full rounded-t-2xl p-0 overflow-hidden border-0 focus:outline-none"
          showCloseButton={false}
        >
          {activeProject && (
            <MotionDiv
              key={activeProject.name}
              variants={sheetContainer}
              initial="hidden"
              animate="visible"
              className="h-full flex flex-col md:flex-row overflow-hidden"
            >
              {/* ── Left / Top: Hero image or tech stack ── */}
              <MotionDiv
                variants={sheetImage}
                className="relative w-full md:w-1/2 h-[35vh] md:h-full shrink-0 bg-secondary overflow-hidden"
              >
                {activeProject.image ? (
                  <Image
                    src={activeProject.image}
                    alt={activeProject.name}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {(Array.isArray(activeProject.technologies) ? activeProject.technologies : []).map((tech, i) => {
                        if (typeof tech === "string") {
                          return (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                              style={{
                                animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                              }}
                            >
                              {tech}
                            </span>
                          );
                        }
                        const Icon = tech.icon;
                        return (
                          <span
                            key={tech.name}
                            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                            style={{
                              animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                            }}
                          >
                            {Icon && <Icon className="size-5" />}
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                    {(() => {
                      const repoPath = activeProject.url.replace("https://github.com/", "");
                      return (
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <FaGithub className="size-4" />
                          {repoPath}
                        </a>
                      );
                    })()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
              </MotionDiv>

              {/* ── Right / Bottom: Content ── */}
              <div className="flex-1 overflow-y-auto">
                <div className="relative p-8 md:p-12 flex flex-col gap-6 min-h-full">
                  <MotionDiv variants={sheetItem} className="flex justify-end">
                    <Button
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      variant="default"
                      size={"icon"}
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </MotionDiv>
                  {Array.isArray(activeProject.category) && (
                    <MotionDiv variants={sheetItem} className="flex flex-wrap gap-2">
                      {(activeProject.category as string[]).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs uppercase tracking-widest rounded-full px-3 py-1 border border-border text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                    </MotionDiv>
                  )}

                  <MotionDiv variants={sheetItem}>
                    <SheetTitle className="text-4xl md:text-6xl font-black italic text-primary leading-none">
                      {activeProject.name}
                    </SheetTitle>
                  </MotionDiv>

                  <MotionDiv variants={sheetItem}>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                      {activeProject.description}
                    </p>
                  </MotionDiv>

                  {Array.isArray(activeProject.technologies) &&
                    activeProject.technologies.length > 0 && (
                      <MotionDiv variants={sheetItem}>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                          Built with
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {activeProject.technologies.map((tech, index) => {
                            if (typeof tech === "string") {
                              return (
                                <MotionLi
                                  key={tech}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 + index * 0.04 }}
                                  className="list-none"
                                >
                                  <span className="inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs">
                                    {tech}
                                  </span>
                                </MotionLi>
                              );
                            }
                            const Icon = tech.icon;
                            return (
                              <MotionLi
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.04 }}
                                className="list-none"
                              >
                                <span className="inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs">
                                  {Icon && <Icon className="size-3.5" />}
                                  {tech.name}
                                </span>
                              </MotionLi>
                            );
                          })}
                        </ul>
                      </MotionDiv>
                    )}

                  <MotionDiv
                    variants={sheetItem}
                    className="flex flex-col sm:flex-row gap-3 mt-auto pt-4"
                  >
                    <Button asChild className="flex-1">
                      <Link
                        href={activeProject.hosted_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                  </MotionDiv>
                </div>
              </div>
            </MotionDiv>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Project list ── */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-full mx-auto px-6"
      >
        <div
          className="pointer-events-none absolute z-50 hidden md:block overflow-hidden rounded-xl shadow-2xl"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition:
              "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="relative w-70 h-45 bg-secondary rounded-xl overflow-hidden">
            {projects.map((project, index) => {
              const isHovered = hoveredIndex === index;
              if (project.image) {
                return (
                  <Image
                    key={project.name}
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="absolute inset-0 object-cover transition-all duration-500 ease-out"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "scale(1)" : "scale(1.1)",
                      filter: isHovered ? "none" : "blur(10px)",
                    }}
                  />
                );
              }
              return (
                <div
                  key={project.name}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 transition-all duration-500 ease-out"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "scale(1)" : "scale(0.9)",
                  }}
                >
                  <FaGithub className="size-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground text-center break-all line-clamp-2">
                    {project.url.replace("https://github.com/", "")}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-medium">
                    View on GitHub
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => {
            const categories: string[] = Array.isArray(project.category)
              ? project.category
              : [project.category];
            return (
              <MotionDiv
                key={project.name}
                variants={fadeInUp}
                className="group block w-full mx-auto cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setActiveProject(project);
                  setOpen(true);
                }}
              >
                <div
                  className="relative py-5 border-t border-border transition-all duration-300 ease-out"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={cn(
                      "absolute inset-0 -mx-4 px-4 rounded-lg transition-all duration-300 ease-out",
                      hoveredIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95",
                    )}
                  />
                  <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="relative overflow-hidden h-[60px] md:h-20 group">
                        <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                          <div className="h-[60px] md:h-20 flex items-center">
                            <h2 className="text-muted-foreground text-3xl md:text-5xl">
                              {project.name}
                            </h2>
                          </div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-3xl md:text-5xl font-black italic text-primary">
                              {project.name}
                            </h2>
                            <ArrowUpRight
                              className={cn(
                                "w-20 h-20 text-muted-foreground transition-all duration-300 ease-out",
                                hoveredIndex === index
                                  ? "opacity-100 translate-x-0 translate-y-0"
                                  : "opacity-0 -translate-x-2 translate-y-2",
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:ml-auto flex flex-wrap items-center gap-2">
                      {categories.map((cat: string) => (
                        <span
                          key={cat}
                          className={cn(
                            "text-xs md:text-sm uppercase tracking-wide rounded-full px-3 py-1 border transition-all duration-300 whitespace-nowrap",
                            hoveredIndex === index
                              ? "bg-primary text-primary-foreground border-primary"
                              : "text-muted-foreground border-border",
                          )}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </MotionDiv>

        <Separator orientation="horizontal" className="my-2" />
      </div>
    </Section>
  );
}