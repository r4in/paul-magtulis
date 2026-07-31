import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Credibility } from "@/components/credibility";
import { StatementSection } from "@/components/statement-section";
import { ExpertiseList } from "@/components/expertise-list";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { CredentialsRegister } from "@/components/credentials-register";
import { ApproachSection } from "@/components/approach-section";
import { ProfileSection } from "@/components/profile-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { expertise, site } from "@/content/paul-profile";

/**
 * Person + LegalService structured data. Only facts supported by
 * content/paul-profile.md — no address, phone, ratings, or reviews.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#paul`,
      name: site.name,
      alternateName: site.displayName,
      jobTitle: site.title,
      description:
        "Philippine attorney in private practice — litigation, property, family, corporate, intellectual property, and criminal law.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of San Carlos",
        address: { "@type": "PostalAddress", addressLocality: "Cebu City", addressCountry: "PH" },
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Attorney — Supreme Court of the Philippines",
        dateCreated: "2023-12",
      },
      knowsAbout: expertise.map((e) => e.title),
      workLocation: { "@type": "Country", name: "Philippines" },
    },
    {
      "@type": "LegalService",
      "@id": `${site.url}/#practice`,
      name: `${site.displayName} — Private Practice`,
      url: site.url,
      areaServed: { "@type": "Country", name: "Philippines" },
      founder: { "@id": `${site.url}/#paul` },
      knowsAbout: expertise.map((e) => e.title),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Credibility />
        <StatementSection />
        <ExpertiseList />
        <ExperienceTimeline />
        <CredentialsRegister />
        <ApproachSection />
        <ProfileSection />
        <ContactSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
