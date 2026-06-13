"use client";

import { Variants } from "framer-motion";
import { Award, BrainCircuit, Cpu, Cloud, FileType, Sparkles } from "lucide-react";
import { MotionDiv, MotionP, MotionSpan, MotionLi } from "@/components/Framer";
import Section from "@/components/Section";
import { ABOUT_CONTENT } from "@/lib/constants";

const interestIcons = [
  <BrainCircuit key="ml" className="size-6" />,
  <Cpu key="ai" className="size-6" />,
  <Cloud key="cloud" className="size-6" />,
  <Sparkles key="pe" className="size-6" />,
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function About() {
  return (
    <Section
      text="About"
      href="about"
      paragraph="A brief introduction about who I am, what I do, and what drives me."
    >
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-10"
      >
        <MotionDiv
          variants={fadeInUp}
          className="relative border-l-2 border-primary/40 pl-6 py-2"
        >
          <div className="absolute left-0 top-3 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
          <MotionP className="text-base md:text-lg leading-relaxed text-foreground/90 italic">
            {ABOUT_CONTENT.summary}
          </MotionP>
        </MotionDiv>

        <MotionDiv variants={fadeInUp}>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-primary mb-5">
            <BrainCircuit className="size-6" />
            Areas of Interest
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ABOUT_CONTENT.interests.map((interest, i) => (
              <MotionDiv
                key={interest}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="text-primary/70 group-hover:text-primary transition-colors">
                  {interestIcons[i]}
                </span>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {interest}
                </span>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv variants={fadeInUp}>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-primary mb-5">
            <Award className="size-6" />
            Certifications
          </h3>
          <div className="space-y-2">
            {ABOUT_CONTENT.certifications.map((cert, i) => (
              <MotionDiv
                key={cert}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="size-4" />
                </span>
                <span className="text-sm text-foreground/80 leading-relaxed">{cert}</span>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </MotionDiv>
    </Section>
  );
}
