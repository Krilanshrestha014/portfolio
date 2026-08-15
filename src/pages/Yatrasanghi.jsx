import React from "react";
import ProjectHero from "../components/Reusable/ProjectHero";
import SectionNav from "../components/Reusable/SectionNav";
import YatraOverview from "../components/Yatrasanghi/YatraOverview";
import TheChallenge from "../components/Yatrasanghi/TheChallenge";
import MyRole from "../components/Yatrasanghi/MyRole";
import ResearchStrategy from "../components/Yatrasanghi/ResearchStrategy";
import StructureWireframes from "../components/Yatrasanghi/StructureWireframes";
import UIDesign from "../components/Yatrasanghi/UIDesign";
import CollaborationDevelopment from "../components/Yatrasanghi/CollaborationDevelopment";
import OutcomeReflection from "../components/Yatrasanghi/OutcomeReflection";
import RelatedCaseStudies from "../components/Reusable/RelatedCaseStudies";
import { DEFAULT_RELATED_PROJECTS } from "../config/defaultProject";

const Yatrasanghi = () => {
  const sections = [
    { id: "overview", label: "Project Overview" },
    { id: "problem", label: "The Problem" },
    { id: "role", label: "My role" },
    { id: "research", label: "Research & Strategy" },
    { id: "structure", label: "Structure & Wireframes" },
    { id: "ui-design", label: "UI Design" },
    { id: "collaboration", label: "Collaboration & Development" },
    { id: "outcome", label: "Outcome & Reflection" },
  ];

  return (
    <div>
      <ProjectHero
        title="Reframing travel discovery - Yatrasanghi"
        meta={[
          { label: "Role", value: "UI/UX" },
          { label: "Team", value: "4" },
          { label: "Duration", value: "Dec – Feb 2026" },
        ]}
        description="Re-designing an AI-generated interface for a clearer travel discovery journey."
        ctaLabel="Visit Figma"
        ctaHref="https://figma.com/your-link-here"
      />

      <div className="flex items-start gap-16 bg-[#ffffff] px-0 sm:px-6 md:px-16 py-12 sm:py-24">
        <SectionNav
          sections={sections}
          className="hidden md:flex sticky top-24 self-start shrink-0 w-[180px]"
        />
        <div className="flex-1 min-w-0 sm:px-0 px-6">
          <YatraOverview />
          <TheChallenge />
          <MyRole />
          <ResearchStrategy />
          <StructureWireframes />
          <UIDesign />
          <CollaborationDevelopment />
          <OutcomeReflection />
        </div>
      </div>

      <RelatedCaseStudies
        projects={DEFAULT_RELATED_PROJECTS.filter((p) => p.title !== "Yatrasanghi")}
      />
    </div>
  );
};

export default Yatrasanghi;