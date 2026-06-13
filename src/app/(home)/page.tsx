"use client";

import { AnimatePresence } from "framer-motion";
import { MotionMain } from "@/components/Framer";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { SITE_CONTENT } from "@/lib/constants";

const Hero = dynamic(() => import("@/app/(home)/_components/Hero"));
const About = dynamic(() => import("@/app/(home)/_components/About"));
const Skills = dynamic(() => import("@/app/(home)/_components/Skills"));
const Achievements = dynamic(() => import("@/app/(home)/_components/Achievements"));
const ExperienceTabs = dynamic(() => import("@/app/(home)/_components/ExperienceTabs"));
const Projects = dynamic(() =>
  import("@/app/(home)/_components/Projects").then((m) => m.Projects),
);

export default function Home() {
  const sanitizedSkills = Object.fromEntries(
    Object.entries(SITE_CONTENT.skills).map(([category, list]) => [
      category,
      list.map((skill) =>
        typeof skill === "string" ? skill : { name: skill.name, icon: skill.icon },
      ),
    ]),
  ) as typeof SITE_CONTENT.skills;

  return (
    <AnimatePresence mode="wait">
      <MotionMain
        key="content"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
      >
        <Hero {...SITE_CONTENT.hero} />
        <About />
        <Skills skills={sanitizedSkills} />
        <Achievements />
        <ExperienceTabs
          experiences={SITE_CONTENT.experience}
          education={SITE_CONTENT.education}
        />
        <Projects projects={SITE_CONTENT.projects} />
        <Footer />
      </MotionMain>
    </AnimatePresence>
  );
}
