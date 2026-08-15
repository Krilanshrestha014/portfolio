import React from "react";
import ProjectHero from "../components/Reusable/ProjectHero";
import SectionNav from "../components/Reusable/SectionNav";
import SparkOverview from "../components/Spark/SparkOverview";
import TheChallenge from "../components/Spark/TheChallenge";
import TheResearch from "../components/Spark/TheResearch";
import UserFlowWireframes from "../components/Spark/UserFlowWireframes";
import DesignSystem from "../components/Spark/DesignSystem";
import UIDesign from "../components/Spark/UIDesign";
import OutcomeReflection from "../components/Spark/OutcomeReflection";
import RelatedCaseStudies from "../components/Reusable/RelatedCaseStudies";
import { DEFAULT_RELATED_PROJECTS } from "../config/defaultProject";

const Spark = () => {
  const sections = [
    { id: "overview", label: "Project Overview" },
    { id: "problem", label: "The Problem" },
    { id: "research", label: "Discovery & Research" },
    { id: "userflow", label: "Userflow & Wireframes" },
    { id: "design-system", label: "Design System" },
    { id: "ui-design", label: "UI Design" },
    { id: "outcome", label: "Outcome & Reflection" },
  ];

  return (
    <div>
      <ProjectHero
        title="One eCommerce experience. Two brands."
        subtitle="- Spark by Supriya"
        meta={[
          { label: "Role", value: "UI/UX" },
          { label: "Team", value: "2" },
          { label: "Duration", value: "April - May 2026" },
        ]}
        description="Designing a premium eCommerce experience that unifies two brands while positioning candles as the primary shopping focus."
        ctaLabel="Visit Website"
        ctaHref="https://sparkbysupriya.com/"
      />

      <div className="flex items-start gap-16 bg-[#ffffff] px-0 sm:px-6 md:px-16 py-12 sm:py-24">
        <SectionNav
          sections={sections}
          scrollOffset={96}
          className="hidden md:flex sticky top-24 self-start shrink-0 w-[180px]"
        />

        <div className="flex-1 min-w-0 sm:px-0 px-6">
          <SparkOverview />
          <TheChallenge />
          <TheResearch />
          <UserFlowWireframes />
          <DesignSystem />
          <UIDesign />
          <OutcomeReflection />
        </div>
      </div>

      <RelatedCaseStudies
        projects={DEFAULT_RELATED_PROJECTS.filter((p) => p.title !== "Spark")}
      />
    </div>
  );
};

export default Spark;