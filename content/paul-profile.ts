/**
 * Structured site content for Atty. Paul Magtulis.
 *
 * Every fact here must be supported by content/paul-profile.md, which mirrors
 * the source document. Marketing copy may reframe facts for clients, but must
 * not add credentials, outcomes, or claims the source does not contain.
 */

export const site = {
  name: "Paul Anthony Magtulis",
  displayName: "Atty. Paul Magtulis",
  shortName: "Paul Magtulis",
  title: "Attorney at Law",
  scope: "Philippines",
  admitted: "Admitted to the Philippine Bar, 2023",
  /**
   * TODO: replace with the production domain before deploying.
   * Used for canonical URL, Open Graph, and structured data.
   */
  url: "https://paulmagtulis-law.example.com",
} as const;

/**
 * TODO — CONTACT DETAILS (not present in the source document).
 * The source profile contains no email address, telephone number, or office
 * address. Fill these in once Paul confirms them; the contact section and
 * footer render each row only when a value is present.
 */
export const contact = {
  email: null as string | null,
  phone: null as string | null,
  office: null as string | null,
  linkedin: null as string | null,
} as const;

export const nav = [
  { id: "profile", index: "01", label: "Profile" },
  { id: "expertise", index: "02", label: "Expertise" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "approach", index: "04", label: "Approach" },
  { id: "contact", index: "05", label: "Contact" },
] as const;

export const credibility = [
  {
    figure: "2023",
    label: "Philippine Bar",
    detail: "Passed the September 2023 Bar; admitted as Attorney by the Supreme Court of the Philippines in December 2023.",
  },
  {
    figure: "06",
    label: "Fields of practice",
    detail: "Litigation, property, family, corporate, intellectual property, and criminal law.",
  },
  {
    figure: "2019",
    label: "Working in law since",
    detail: "Began in litigation support at a Cebu law office while completing his Juris Doctor.",
  },
  {
    figure: "J.D.",
    label: "University of San Carlos",
    detail: "Juris Doctor, 2018–2022, Cebu City — with leadership roles in student governance.",
  },
] as const;

export interface ExpertiseArea {
  index: string;
  title: string;
  clients: string;
  description: string;
}

export const expertise: ExpertiseArea[] = [
  {
    index: "01",
    title: "Litigation & Disputes",
    clients: "For individuals and businesses facing or considering a court case",
    description:
      "Paul represents clients through every stage of litigation — case preparation, filing, and courtroom advocacy — in civil, criminal, and family law disputes. Clients get a clear view of where their case stands and what each step is for.",
  },
  {
    index: "02",
    title: "Property Law",
    clients: "For buyers, owners, families, and heirs",
    description:
      "From property transactions and land disputes to estate planning, Paul helps clients protect what they hold and pass it on properly — with documents checked carefully and compliance with the relevant laws confirmed before anyone signs.",
  },
  {
    index: "03",
    title: "Family Law",
    clients: "For people navigating difficult family transitions",
    description:
      "Custody, adoption, and the dissolution of marriage are legal matters wrapped around personal ones. Paul handles both dimensions with care — protecting his clients' legal interests while keeping the process understandable and humane.",
  },
  {
    index: "04",
    title: "Corporate Law",
    clients: "For businesses and the people who run them",
    description:
      "Paul advises on corporate governance, compliance, and business transactions — helping companies keep their obligations in order and structure their dealings so problems are prevented rather than litigated.",
  },
  {
    index: "05",
    title: "Intellectual Property",
    clients: "For creators, brands, and growing businesses",
    description:
      "Trademark registration, copyright questions, and the enforcement of IP rights. Paul helps clients secure what they have built and respond when someone else uses it without permission.",
  },
  {
    index: "06",
    title: "Criminal Law",
    clients: "For people who need clarity when the stakes are highest",
    description:
      "Paul advises and represents clients in criminal matters — and has taught the Revised Penal Code to criminology students, a discipline that shows in how plainly he can explain the law that applies to a case.",
  },
];

export type TimelineTag = "Practice" | "Education" | "Teaching" | "Public service" | "Leadership";

export interface TimelineEntry {
  year: string;
  period: string;
  role: string;
  org: string;
  location?: string;
  tag: TimelineTag;
  summary: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2018",
    period: "Aug 2018 — Jul 2022",
    role: "Juris Doctor, Law",
    org: "University of San Carlos",
    location: "Cebu City",
    tag: "Education",
    summary:
      "Four years of legal study in Cebu City, combined from the second year onward with full-time and part-time work inside working law offices.",
  },
  {
    year: "2019",
    period: "Jul 2019 — Jul 2021",
    role: "Litigation Paralegal",
    org: "Oriol Law Office",
    location: "Metro Cebu",
    tag: "Practice",
    summary:
      "Legal research, trial exhibits, and drafting — motions, briefs, affidavits, and correspondence — plus gathering witness statements and liaison work with government agencies.",
  },
  {
    year: "2020",
    period: "2020 — 2022",
    role: "Student leadership",
    org: "University of San Carlos · Societas Spectra Legis",
    location: "Cebu City",
    tag: "Leadership",
    summary:
      "Associate Justice of the Student Supreme Court; Chairperson of the Blue Ribbon Committee and later Legal Counsel for the Student COMELEC; president (primus-inter-pares) of Societas Spectra Legis.",
  },
  {
    year: "2022",
    period: "May 2022",
    role: "Election Paralegal",
    org: "Campaigns of Mayor Richard Gomez & Congw. Lucy Torres-Gomez",
    location: "Ormoc, Eastern Visayas",
    tag: "Public service",
    summary:
      "Collected and organized evidence for election cases, monitored election activities for adherence to law, and drafted complaints, petitions, and affidavits.",
  },
  {
    year: "2023",
    period: "Mar 2023 — Apr 2024",
    role: "Paralegal 2",
    org: "Abramson Labor Group",
    location: "Remote",
    tag: "Practice",
    summary:
      "Court-pleading follow-up and court communications for a labor firm — and liaison work for Filipino clients, translating between clients and their handling attorneys.",
  },
  {
    year: "2023",
    period: "Sep — Dec 2023",
    role: "Philippine Bar · Attorney",
    org: "Supreme Court of the Philippines",
    tag: "Practice",
    summary:
      "Passed the September 2023 Bar Examination and was admitted as an Attorney by the Supreme Court of the Philippines in December 2023.",
  },
  {
    year: "2024",
    period: "Aug — Dec 2024",
    role: "Professor, Criminal Law (Part-time)",
    org: "CelTech College",
    location: "San Fernando, Central Luzon",
    tag: "Teaching",
    summary:
      "Taught the Revised Penal Code Book 1 to criminology students — designing lessons and examinations, and mentoring students through the framework of Philippine criminal law.",
  },
  {
    year: "Now",
    period: "Dec 2023 — Present",
    role: "Attorney at Law, Private Practice",
    org: "Self-employed",
    location: "Philippines · In person & remote",
    tag: "Practice",
    summary:
      "Independent counsel across litigation, property, family, corporate, intellectual property, and criminal matters — consultation, drafting, negotiation, and court representation.",
  },
];

export interface CredentialGroup {
  heading: string;
  items: { title: string; detail: string }[];
}

export const credentials: CredentialGroup[] = [
  {
    heading: "Legal & professional",
    items: [
      {
        title: "Attorney — Supreme Court of the Philippines",
        detail: "Professional license, issued December 2023",
      },
      {
        title: "Philippine Bar Passer",
        detail: "September 2023 Bar Examination",
      },
    ],
  },
  {
    heading: "Education",
    items: [
      {
        title: "Juris Doctor, Law — University of San Carlos",
        detail: "Cebu City · August 2018 – July 2022",
      },
    ],
  },
  {
    heading: "Leadership",
    items: [
      {
        title: "Associate Justice — Student Supreme Court",
        detail: "University of San Carlos · A.Y. 2020–2021",
      },
      {
        title: "Chairperson — Blue Ribbon Committee, Student COMELEC",
        detail: "University of San Carlos · April 2021",
      },
      {
        title: "Legal Counsel — Student COMELEC",
        detail: "University of San Carlos · April – May 2022",
      },
      {
        title: "Primus-inter-pares — Societas Spectra Legis",
        detail: "Fraternity-sorority president · Cebu City · 2021–2022",
      },
    ],
  },
  {
    heading: "Certifications",
    items: [
      {
        title: "Targeted Selections Interview",
        detail: "DDI | Development Dimensions International · May 2014",
      },
    ],
  },
];

export interface ApproachStep {
  index: string;
  title: string;
  description: string;
}

export const approach: ApproachStep[] = [
  {
    index: "01",
    title: "Understand the situation first",
    description:
      "Every engagement begins with a consultation — not a pitch. Paul listens for what is actually at stake: the facts, the people involved, and what a good outcome would look like for you.",
  },
  {
    index: "02",
    title: "Assess the legal position",
    description:
      "Before recommending anything, Paul assesses the legal issues honestly — what the law supports, where the risks sit, and which questions still need answers.",
  },
  {
    index: "03",
    title: "Build a tailored strategy",
    description:
      "No two matters are identical. Paul builds a comprehensive strategy around your specific needs — whether that means negotiating, documenting, or preparing for court.",
  },
  {
    index: "04",
    title: "Put it in writing, precisely",
    description:
      "Contracts, pleadings, affidavits, agreements — drafted and reviewed so they are accurate, complete, and aligned with your interests. In law, the document is the work.",
  },
  {
    index: "05",
    title: "Represent with diligence",
    description:
      "In negotiations and in court, Paul manages each stage of the matter — preparation, filings, advocacy — holding to the professional standards and integrity the work demands.",
  },
];

export const inquiryNatures = [
  "Litigation or a dispute",
  "Property matter",
  "Family matter",
  "Corporate or business matter",
  "Intellectual property",
  "Criminal matter",
  "General consultation",
  "Other",
] as const;

export const contactMethods = ["Email", "Phone call", "Text message"] as const;

export const disclaimer =
  "Submitting this form does not create an attorney-client relationship. Please do not include confidential or highly sensitive information.";
