import React from "react";
import ProjectHero from "../components/Reusable/ProjectHero";
import SectionNav from "../components/Reusable/SectionNav";
import MannaOverview from "../components/MannaBakery/MannaOverview";
import TheChallenge from "../components/MannaBakery/TheChallenge";
import ResearchStrategy from "../components/MannaBakery/ResearchStrategy";
import UserFlowWireframes from "../components/MannaBakery/UserFlowWireframes";
import OutcomeReflection from "../components/MannaBakery/OutcomeReflection";
import UIDesign from "../components/MannaBakery/UIDesign";
import RelatedCaseStudies from "../components/Reusable/RelatedCaseStudies";
import { DEFAULT_RELATED_PROJECTS } from "../config/defaultProject";

const MannaBakery = () => {
  const sections = [
    { id: "overview", label: "Project Overview" },
    { id: "problem", label: "The Problem" },
    { id: "research", label: "Discovery & Research" },
    { id: "flow", label: "User Flow & Wireframes" },
    { id: "ui-design", label: "UI Design" },
    { id: "outcome", label: "Outcome & Reflection" },
  ];

  return (
    <div>
      <ProjectHero
        title="Re-designing a mobile ordering experience - Manna Bakery"
        meta={[
          { label: "Role", value: "UI/UX" },
          { label: "Team", value: "3" },
          { label: "Duration", value: "April 2025" },
          { label: "Position", value: "Frontend Intern · Redis Nepal" },
        ]}
        description="Re-designing a mobile ordering experience for a faster, simpler bakery journey."
        ctaLabel="Visit Figma"
        ctaHref="https://www.figma.com/design/wACs6zUXz8AhLEXfnM900I/Manna-Bakery?node-id=2001-410&t=etHbkP0uP6ZR0VC2-1"
      />

      <div className="bg-[#ffffff] py-12 sm:py-24">
        <div className="max-w-[1400px] mx-auto flex items-start gap-16 px-6 md:px-16">
          <SectionNav
            sections={sections}
            className="hidden md:flex sticky top-24 self-start shrink-0 w-[180px]"
          />
          <div className="flex-1 min-w-0">
            <MannaOverview />
            <TheChallenge />
            <ResearchStrategy />
            <UserFlowWireframes />
            <UIDesign />
            <OutcomeReflection />
          </div>
        </div>
      </div>

      <RelatedCaseStudies
        projects={DEFAULT_RELATED_PROJECTS.filter(
          (p) => p.title !== "Manna Bakery",
        )}
      />
    </div>
  );
};

export default MannaBakery;