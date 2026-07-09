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
};

export default function ResumePage() {
  return (
    <AppShell>
      <main className="space-y-10">
        <header className="space-y-3 text-center print:text-left">
          <h1 className="text-3xl font-semibold sm:text-4xl print:text-black">Manohar Gali</h1>
          <p className="text-sm text-[--muted-foreground] print:text-gray-700">
            {workProfile.headline}
          </p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[--muted-foreground] print:mx-0 print:text-gray-700">
            {workProfile.summary}
          </p>
          <p className="text-xs text-[--muted-foreground] print:text-gray-600">
            {social.email} · West Des Moines, IA
          </p>
          <PrintButton />
        </header>

        <section className="space-y-4">
          <h2 className="section-label">Experience</h2>
          {experience.map((item) => (
            <ExperienceCard key={`${item.company}-${item.role}`} item={item} detailed />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="section-label">Education</h2>
          {education.map((item) => (
            <EducationCard key={item.institution} item={item} />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="section-label">Skills</h2>
          <TechStack />
        </section>
      </main>
    </AppShell>
  );
}
