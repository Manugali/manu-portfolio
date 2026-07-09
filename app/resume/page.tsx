import { AppShell } from "@/components/AppShell";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EducationCard } from "@/components/EducationCard";
import { TechStack } from "@/components/TechStack";
import { PrintButton } from "@/components/PrintButton";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import workProfile from "@/data/work-profile.json";
import social from "@/data/social.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and professional profile for Manohar Gali — Applications Engineer.",
};

export default function ResumePage() {
  return (
    <AppShell>
      <main className="resume-page space-y-10 print:space-y-6">
        <header className="space-y-3 text-center print:text-left">
          <p className="section-number print:hidden">Resume</p>
          <h1 className="gradient-text-hero text-3xl font-semibold sm:text-4xl print:text-black">
            Manohar Gali
          </h1>
          <p className="text-sm text-white print:text-black">{workProfile.headline}</p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[--muted-foreground] print:mx-0 print:text-gray-700">
            {workProfile.summary}
          </p>
          <p className="text-xs text-[--muted-subtle] print:text-gray-600">
            {social.email} · West Des Moines, IA
          </p>
          <PrintButton />
        </header>

        <section className="space-y-4">
          <h2 className="section-label">Experience</h2>
          <div className="space-y-4">
            {experience.map((item) => (
              <ExperienceCard
                key={`${item.company}-${item.role}`}
                item={item}
                detailed
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="section-label">Education</h2>
          <div className="space-y-4">
            {education.map((item) => (
              <EducationCard key={item.institution} item={item} />
            ))}
          </div>
        </section>

        <section className="space-y-4 print:break-inside-avoid">
          <h2 className="section-label">Skills</h2>
          <TechStack />
        </section>

        <p className="text-center text-xs text-[--muted-subtle] print:hidden">
          Use your browser&apos;s print dialog to save as PDF.
        </p>
      </main>
    </AppShell>
  );
}
