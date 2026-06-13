"use client";

import { Variants } from "framer-motion";
import { Trophy } from "lucide-react";
import { MotionDiv } from "@/components/Framer";
import Section from "@/components/Section";
import { SITE_CONTENT } from "@/lib/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export default function Achievements() {
  return (
    <Section
      text="Achievements"
      href="achievements"
      paragraph="Recognitions and milestones that highlight my journey."
    >
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SITE_CONTENT.achievements.map((achievement, i) => (
          <MotionDiv
            key={achievement.title}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                <Trophy className="size-6" />
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                <p className="text-sm text-foreground/70 leading-relaxed pt-2">
                  {achievement.description}
                </p>
              </div>
            </div>
          </MotionDiv>
        ))}
      </MotionDiv>
    </Section>
  );
}
