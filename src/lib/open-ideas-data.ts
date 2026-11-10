export type IdeaLevel = "Starter" | "Intermediate" | "Advanced";

export type IdeaCategoryId =
  | "hardware"
  | "ml"
  | "software"
  | "education"
  | "science";

export interface OpenIdea {
  slug: string;
  title: string;
  categoryId: IdeaCategoryId;
  categoryName: string;
  level: IdeaLevel;
  skills: string[];
  summary: string;
  outcome: string;
  repo?: [label: string, url: string];
  whyItMatters: string;
  gettingStartedNotes: string[];
  keywords: string[];
}

export interface IdeaCategory {
  id: IdeaCategoryId;
  name: string;
  icon: "cpu" | "brain" | "code" | "book" | "flask";
  colorVar: string;
  accentClass: string;
  badgeClass: string;
  blurb: string;
  ideas: OpenIdea[];
}

export interface HighlightedCommunityBuild {
  slug: string;
  title: string;
  author: string;
  authorUrl?: string;
  date: string;
  category: string;
  level?: IdeaLevel;
  hardware: string[];
  tags: string[];
  excerpt: string;
  repoUrl: string;
  demoUrl?: string;
  image?: string;
  featured?: boolean;
  basedOnIdeaSlug?: string;
  content: string;
}

export interface OpenIdeasFaq {
  question: string;
  answer: string;
}

const GH = "https://github.com/pieeg-club";

export const OPEN_IDEA_CATEGORIES: IdeaCategory[] = [
  {
    id: "hardware",
    name: "Hardware & Analog",
    icon: "cpu",
    colorVar: "--c-hw",
    accentClass: "text-cyan-600 dark:text-cyan-400",
    badgeClass:
      "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/70",
    blurb: "For PCB designers and analog / mixed-signal engineers.",
    ideas: [
      {
        slug: "independent-noise-cmrr-characterisation",
        title: "Independent noise & CMRR characterisation",
        categoryId: "hardware",
        categoryName: "Hardware & Analog",
        level: "Intermediate",
        skills: ["Analog measurement", "Python", "Lab practice"],
        summary:
          "Measure input-referred noise, CMRR and channel crosstalk of an open PiEEG board using your own setup, and publish the method so others can repeat it.",
        outcome: "A public report + scripts in your own repository.",
        repo: ["PiEEG-16", `${GH}/PiEEG-16`],
        whyItMatters:
          "Transparent, third-party bench measurements help researchers and students compare low-cost open EEG hardware against lab amplifiers using reproducible test setups.",
        gettingStartedNotes: [
          "Short inputs with low-impedance resistors (e.g. 51 Ω or 0 Ω) in a shielded enclosure to record baseline input-referred noise spectra (0.5–100 Hz).",
          "Drive common-mode sine waves across tied inputs vs. reference to measure CMRR at 50 Hz / 60 Hz.",
          "Publish raw CSV/EDF recordings alongside your Python PSD & CMRR plotting scripts so other labs can replicate the benchmark.",
        ],
        keywords: [
          "EEG input-referred noise",
          "CMRR measurement EEG",
          "ADS1299 bench test",
          "open source EEG characterization",
          "PiEEG-16 benchmark",
        ],
      },
      {
        slug: "active-electrode-front-end-prototype",
        title: "Active-electrode front-end prototype",
        categoryId: "hardware",
        categoryName: "Hardware & Analog",
        level: "Advanced",
        skills: ["Analog design", "KiCad", "Low-noise layout"],
        summary:
          "Design an open active-electrode (buffer at the electrode) board that plugs into an existing open-source EEG front end, and compare it with passive electrodes.",
        outcome: "Open KiCad files, BOM and a comparison write-up.",
        repo: ["IronBCI", `${GH}/ironbci`],
        whyItMatters:
          "Active buffering directly at the scalp sensor reduces cable motion artifacts and capacitive mains pickup, especially for dry or high-impedance electrodes.",
        gettingStartedNotes: [
          "Select an ultra-low-input-bias-current, low-1/f-noise op-amp suitable for unit-gain buffering on a coin-sized PCB.",
          "Include ESD protection and current-limiting series resistance at the electrode input for participant safety.",
          "Compare 50/60 Hz pickup and cable-shake artifacts side-by-side against a passive lead of the same length.",
        ],
        keywords: [
          "active EEG electrode KiCad",
          "open hardware active electrode",
          "low noise biopotential buffer",
          "IronBCI active sensor",
        ],
      },
      {
        slug: "shielding-and-cable-study",
        title: "Shielding & cable study",
        categoryId: "hardware",
        categoryName: "Hardware & Analog",
        level: "Starter",
        skills: ["Basic electronics", "Experimentation"],
        summary:
          "How much do cable length, twisting and shielding change mains interference? Run simple, repeatable experiments and document the results with photos.",
        outcome: "A practical guide others can follow.",
        whyItMatters:
          "Most newcomers to EEG struggle with 50/60 Hz hum caused by lead dress and loop area rather than the amplifier itself. Visual, quantitative experiments save builders hours of debugging.",
        gettingStartedNotes: [
          "Test straight unshielded leads, twisted pairs, and coax/driven-shield leads of 15 cm, 50 cm, and 100 cm.",
          "Use a consistent phantom or saline resistor network near a known mains source and compare 50/60 Hz spectral peaks.",
          "Document wiring diagrams and before/after FFT plots in a clear open README.",
        ],
        keywords: [
          "EEG cable shielding",
          "50Hz 60Hz mains interference EEG",
          "twisted pair biopotential leads",
          "DIY EEG noise reduction",
        ],
      },
      {
        slug: "open-enclosure-designs",
        title: "Open enclosure designs",
        categoryId: "hardware",
        categoryName: "Hardware & Analog",
        level: "Starter",
        skills: ["3D CAD", "3D printing"],
        summary:
          "Design a printable case, battery holder or headband mount for an open PiEEG-family board. Share STL + source files under an open licence.",
        outcome: "Files on your GitHub or Thingiverse.",
        whyItMatters:
          "Good mechanical enclosures protect boards from electrostatic discharge, strain-relieve electrode cables, and make wearable experiments comfortable.",
        gettingStartedNotes: [
          "Provide both print-ready `.stl` / `.3mf` files and parametric CAD sources (`.step` or FreeCAD/Fusion files) so others can remix them.",
          "Include snap-fit or screw standoffs, clear access to electrode headers, and strain-relief channels for leads.",
          "Specify recommended print orientation, infill, and filament (PLA/PETG/TPU).",
        ],
        keywords: [
          "3D printable EEG case",
          "PiEEG enclosure STL",
          "open source BCI headset mount",
          "wearable EEG CAD",
        ],
      },
    ],
  },
  {
    id: "ml",
    name: "Signal Processing & ML",
    icon: "brain",
    colorVar: "--c-ml",
    accentClass: "text-purple-600 dark:text-purple-400",
    badgeClass:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/70",
    blurb: "For data scientists, ML students and DSP engineers.",
    ideas: [
      {
        slug: "artifact-detection-benchmark",
        title: "Artifact detection benchmark",
        categoryId: "ml",
        categoryName: "Signal Processing & ML",
        level: "Intermediate",
        skills: ["Python", "NumPy / MNE", "ML"],
        summary:
          "Compare classic and ML methods for removing blinks, jaw clenches and motion artifacts from low-channel EEG, using public datasets or your own recordings.",
        outcome: "A notebook + short paper-style write-up.",
        whyItMatters:
          "In 4- to 16-channel wearable EEG, standard high-density ICA often struggles. Benchmarking lightweight wavelet, ASR, regression, and compact neural methods helps every builder choose the right filter.",
        gettingStartedNotes: [
          "Evaluate both signal distortion on clean epochs and artifact attenuation on labeled blink/EMG epochs.",
          "Measure CPU runtime per 250 ms window so builders know which algorithms can run live on Raspberry Pi or in the browser.",
          "Publish reproducible Jupyter notebooks with MNE-Python and clear SNR metrics.",
        ],
        keywords: [
          "EEG artifact removal benchmark",
          "low channel EEG blink removal",
          "MNE Python artifact detection",
          "EMG EOG artifact filtering",
        ],
      },
      {
        slug: "real-time-motor-imagery-decoder",
        title: "Real-time motor-imagery decoder",
        categoryId: "ml",
        categoryName: "Signal Processing & ML",
        level: "Advanced",
        skills: ["Python", "CSP / Riemannian / deep learning", "Real-time systems"],
        summary:
          "Build an open, real-time left/right motor-imagery classifier that runs on a Raspberry Pi or laptop and streams from an open EEG board.",
        outcome: "An open-source library with accuracy and latency numbers.",
        repo: ["PiEEG-server", `${GH}/PiEEG-server`],
        whyItMatters:
          "Motor imagery (mu/beta event-related desynchronization over C3/C4) is one of the foundational paradigms in restorative and assistive BCIs.",
        gettingStartedNotes: [
          "Implement a clean calibration protocol (e.g. 40–60 cued trials of left vs. right hand imagery) with visual feedback.",
          "Compare Filter-Bank CSP + LDA, Tangent Space Riemannian geometry, and EEGNet on 8- to 16-channel montages.",
          "Report end-to-end inference latency, cross-validation accuracy, and session-to-session stability.",
        ],
        keywords: [
          "motor imagery BCI Python",
          "real time CSP Riemannian EEG",
          "open source motor imagery classifier",
          "Raspberry Pi EEG decoding",
        ],
      },
      {
        slug: "ssvep-speller-in-the-browser",
        title: "SSVEP speller in the browser",
        categoryId: "ml",
        categoryName: "Signal Processing & ML",
        level: "Intermediate",
        skills: ["JavaScript", "DSP"],
        summary:
          "A web-based SSVEP speller with flicker targets and CCA detection that works with an open EEG data stream.",
        outcome: "A live demo + source code.",
        whyItMatters:
          "Browser-native BCIs require zero installation. Using `requestAnimationFrame` stimulus rendering and Canonical Correlation Analysis (CCA) in TypeScript/WebAssembly makes hands-free spelling accessible anywhere.",
        gettingStartedNotes: [
          "Use frame-accurate frequency/phase flicker schedules on HTML5 Canvas or WebGL and monitor actual frame drops.",
          "Implement multi-harmonic CCA or Filter-Bank CCA in JS/TS over occipital channels (O1, Oz, O2).",
          "Calculate Information Transfer Rate (ITR in bits/min) and let users test with simulated or live WebBLE/WebSocket streams.",
        ],
        keywords: [
          "SSVEP speller JavaScript",
          "browser BCI WebBLE",
          "Canonical Correlation Analysis EEG web",
          "open source SSVEP demo",
        ],
      },
      {
        slug: "low-channel-count-transfer-learning",
        title: "Low-channel-count transfer learning",
        categoryId: "ml",
        categoryName: "Signal Processing & ML",
        level: "Advanced",
        skills: ["PyTorch", "Research methods"],
        summary:
          "Can models pre-trained on large public EEG datasets be adapted to 8 or 16 consumer-grade channels? A good topic for a thesis or a preprint.",
        outcome: "Code, model weights and a preprint (e.g. arXiv).",
        whyItMatters:
          "Foundation models for EEG are emerging rapidly, but most assume 64+ wet lab channels. Bridging foundation models down to 8–16 channels with minimal per-user calibration unlocks practical everyday BCIs.",
        gettingStartedNotes: [
          "Sub-select standard 10–20 subsets (8ch / 16ch) from PhysioNet, MOABB, or TUH EEG datasets for pre-training.",
          "Quantify how many minutes of target-user calibration data are needed for fine-tuning vs. training from scratch.",
          "Release model checkpoints and evaluation scripts under an open license.",
        ],
        keywords: [
          "EEG transfer learning PyTorch",
          "low channel EEG foundation model",
          "few shot calibration BCI",
          "MOABB open EEG thesis",
        ],
      },
    ],
  },
  {
    id: "software",
    name: "Software & Tools",
    icon: "code",
    colorVar: "--c-sw",
    accentClass: "text-blue-600 dark:text-blue-400",
    badgeClass:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/70",
    blurb: "For developers who like building things people use.",
    ideas: [
      {
        slug: "lsl-brainflow-style-bridges",
        title: "LSL / BrainFlow-style bridges",
        categoryId: "software",
        categoryName: "Software & Tools",
        level: "Intermediate",
        skills: ["Python or C++", "Networking"],
        summary:
          "Write and maintain a bridge that streams open PiEEG data into Lab Streaming Layer or another common neuro-tool, so it works with existing research software.",
        outcome: "A package published under your name.",
        repo: ["PiEEG-server", `${GH}/PiEEG-server`],
        whyItMatters:
          "Neuroscience labs rely on Lab Streaming Layer (LSL), OpenViBE, MNE-LSL, and PsychoPy for synchronized multi-modal experiments. A rock-solid bridge connects open hardware to the entire academic ecosystem.",
        gettingStartedNotes: [
          "Broadcast multi-channel EEG samples with hardware timestamps and channel metadata over `pylsl` or `liblsl`.",
          "Include a synthetic signal fallback mode so developers can test the LSL stream without hardware attached.",
          "Package with `pyproject.toml` so anyone can install and run via a single CLI command.",
        ],
        keywords: [
          "Lab Streaming Layer PiEEG",
          "pylsl EEG bridge",
          "BrainFlow open EEG",
          "OpenViBE PsychoPy EEG stream",
        ],
      },
      {
        slug: "new-dashboard-experiences",
        title: "New dashboard experiences",
        categoryId: "software",
        categoryName: "Software & Tools",
        level: "Starter",
        skills: ["TypeScript", "React"],
        summary:
          "Create a new visualisation or neurofeedback mini-game for the open-source dashboard and offer it as a pull request.",
        outcome: "A merged PR or your own fork.",
        repo: [
          "experiences folder",
          `${GH}/PiEEG-server/tree/main/dashboard/src/experiences`,
        ],
        whyItMatters:
          "Interactive visualisations—such as 3D topographic scalp maps, alpha-theta coherence feedback, or jaw-clench rhythm games—make live biosignals immediately intuitive.",
        gettingStartedNotes: [
          "Explore existing dashboard experiences in `PiEEG-server/dashboard/src/experiences` to see how live channel buffers and band-power hooks work.",
          "Keep rendering smooth at 60 FPS using Canvas, WebGL, or lightweight SVG updates.",
          "Include a demo/simulation toggle so reviewers and visitors can try your experience in the browser.",
        ],
        keywords: [
          "React EEG visualization",
          "open source neurofeedback game",
          "TypeScript BCI dashboard",
          "PiEEG-server experiences",
        ],
      },
      {
        slug: "browser-extension-plugins",
        title: "Browser extension plugins",
        categoryId: "software",
        categoryName: "Software & Tools",
        level: "Starter",
        skills: ["JavaScript", "Web extensions"],
        summary:
          "Extend the open brain-state browser extension: focus timers, reading-load indicators or accessibility helpers.",
        outcome: "A fork or plugin in your repository.",
        repo: ["PiEEG-chrome", `${GH}/PiEEG-chrome`],
        whyItMatters:
          "Bringing live biosignals into everyday web browsing opens up hands-free accessibility navigation (blink/EOG scrolling) and personal cognitive load journaling.",
        gettingStartedNotes: [
          "Fork `PiEEG-chrome` and inspect how live band powers and blink events are injected into active tabs.",
          "Build a modular feature such as hands-free article scrolling, Pomodoro focus tracking, or distraction alerts.",
          "Keep all signal data local in the user's browser for complete privacy.",
        ],
        keywords: [
          "EEG Chrome extension",
          "hands-free browser accessibility BCI",
          "brain computer interface web extension",
          "PiEEG-chrome plugin",
        ],
      },
    ],
  },
  {
    id: "education",
    name: "Education & Writing",
    icon: "book",
    colorVar: "--c-ed",
    accentClass: "text-orange-600 dark:text-orange-400",
    badgeClass:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800/70",
    blurb: "For teachers, students and science communicators.",
    ideas: [
      {
        slug: "translate-a-getting-started-guide",
        title: "Translate a getting-started guide",
        categoryId: "education",
        categoryName: "Education & Writing",
        level: "Starter",
        skills: ["A second language"],
        summary:
          "Translate an open README or tutorial into your language so more students around the world can start with neurotech.",
        outcome: "A pull request or a translated guide on your own site.",
        repo: ["PiEEG", `${GH}/PiEEG`],
        whyItMatters:
          "Students and hobbyists in every country deserve accessible neurotechnology documentation in their native language—including Spanish, French, Portuguese, Arabic, Hindi, Mandarin, Japanese, Korean, and German.",
        gettingStartedNotes: [
          "Pick a core README or quickstart tutorial and translate both the setup steps and the electrical safety warnings accurately.",
          "Keep technical terms (like montage, reference electrode, notch filter, sampling rate) clear with brief bilingual glossary notes.",
          "Host it in your own repository or submit a pull request to the upstream documentation.",
        ],
        keywords: [
          "open source neurotech translation",
          "multilingual EEG tutorial",
          "neuroscience education open access",
          "PiEEG documentation translation",
        ],
      },
      {
        slug: "a-classroom-lab-kit",
        title: "A classroom lab kit",
        categoryId: "education",
        categoryName: "Education & Writing",
        level: "Intermediate",
        skills: ["Teaching", "Curriculum design"],
        summary:
          "Write a 3–5 session school or university lab course on biosignals (EMG, ECG, EEG basics) built on open-source tools, with safety notes included.",
        outcome: "Open teaching materials (CC-BY licence suggested).",
        whyItMatters:
          "University biomedical engineering and neuroscience departments often want hands-on biosignal labs but lack ready-to-teach lab handouts built around affordable open hardware.",
        gettingStartedNotes: [
          "Structure progressive 90-minute sessions: e.g. Session 1 (Safety & EMG muscle contractions), Session 2 (ECG & heart-rate variability), Session 3 (Occipital alpha waves & eyes-open/closed FFT).",
          "Include student worksheets, instructor setup checklists, and mandatory battery-isolation safety rules.",
          "Publish under CC-BY-4.0 so educators worldwide can adapt the syllabus.",
        ],
        keywords: [
          "university EEG lab curriculum",
          "open source biosignals course",
          "biomedical engineering lab EMG ECG EEG",
          "teaching neuroscience with open hardware",
        ],
      },
      {
        slug: "explainer-videos",
        title: "Explainer videos",
        categoryId: "education",
        categoryName: "Education & Writing",
        level: "Starter",
        skills: ["Video editing", "Clear explaining"],
        summary:
          "Make a short, accurate video about how EEG amplifiers work, what alpha waves are, or how to read a spectrum — on your own channel.",
        outcome: "A video you own and publish.",
        whyItMatters:
          "Clear, honest visual explainers demystify biopotential instrumentation—showing how differential amplifiers, driven right leg (DRL) circuits, and Fourier transforms actually work in practice.",
        gettingStartedNotes: [
          "Focus on a single concrete question (e.g. 'Why does blinking create a huge spike in frontal EEG?' or 'How does a 24-bit delta-sigma ADC measure microvolts?').",
          "Show real live waveforms and spectra alongside diagrams.",
          "Share your video link on Discord so the community can watch and learn from it.",
        ],
        keywords: [
          "how EEG amplifiers work video",
          "alpha waves neuroscience explainer",
          "biopotential instrumentation tutorial",
          "open neurotech science communication",
        ],
      },
    ],
  },
  {
    id: "science",
    name: "Open Science",
    icon: "flask",
    colorVar: "--c-sc",
    accentClass: "text-emerald-600 dark:text-emerald-400",
    badgeClass:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/70",
    blurb: "For researchers who want reproducible, public results.",
    ideas: [
      {
        slug: "reproduce-a-classic-eeg-paradigm",
        title: "Reproduce a classic EEG paradigm",
        categoryId: "science",
        categoryName: "Open Science",
        level: "Intermediate",
        skills: ["Experimental design", "Statistics"],
        summary:
          "Replicate a well-known effect (alpha blocking, P300, SSVEP) with low-cost open hardware and publish data and code. Recording other people requires your own institution's ethics approval.",
        outcome: "An open dataset + analysis on OSF or Zenodo.",
        whyItMatters:
          "Replicating foundational neurophysiology paradigms (Berger effect alpha blocking, auditory/visual oddball P300, or steady-state visual evoked potentials) with BIDS-formatted open data strengthens open science.",
        gettingStartedNotes: [
          "Ensure any human-subject recording follows your institution's IRB / ethics committee approval and informed consent rules.",
          "Format recordings in EEG-BIDS with clear event markers and electrode coordinates.",
          "Deposit raw data and analysis scripts on Zenodo, OSF, or OpenNeuro with a DOI.",
        ],
        keywords: [
          "open science EEG replication",
          "Berger alpha blocking dataset",
          "P300 oddball open hardware",
          "EEG-BIDS open dataset Zenodo",
        ],
      },
      {
        slug: "open-hardware-comparison",
        title: "Open hardware comparison",
        categoryId: "science",
        categoryName: "Open Science",
        level: "Advanced",
        skills: ["Signal analysis", "Scientific writing"],
        summary:
          "Compare several open and commercial EEG systems on the same test signals with a transparent, repeatable method.",
        outcome: "A preprint with all raw data released.",
        whyItMatters:
          "Objective, side-by-side benchmarks using calibrated signal generators or split-lead phantom recordings give the neurotech community trustworthy data without marketing bias.",
        gettingStartedNotes: [
          "Use a calibrated microvolt signal divider or saline head phantom so every device receives the exact same input waveform.",
          "Compare noise floor, bandwidth, trigger jitter, packet loss, and software usability.",
          "Publish all raw files and analysis scripts alongside your preprint so every figure can be regenerated.",
        ],
        keywords: [
          "open source EEG hardware comparison",
          "commercial vs open BCI benchmark",
          "EEG phantom validation study",
          "reproducible neurotech hardware paper",
        ],
      },
    ],
  },
];

export const OPEN_IDEAS_FAQS: OpenIdeasFaq[] = [
  {
    question: "Can I become a PiEEG volunteer or intern through this page?",
    answer:
      "No. PiEEG Ltd does not offer volunteer, internship or unpaid roles. This page is a public list of ideas for independent open-source work. Picking an idea does not create any relationship with the company.",
  },
  {
    question: "Do I need permission to start an idea?",
    answer:
      "No. Everything listed builds on MIT-licensed code and open hardware files. Read the licence, start a repository under your own account, and go. There is nothing to apply for.",
  },
  {
    question: "Will PiEEG supervise, mentor or review my work?",
    answer:
      "No. The company does not supervise, assign tasks, set deadlines or provide mentoring. The community on Discord often helps each other, but that is people helping people, not PiEEG Ltd managing a project.",
  },
  {
    question: "Can I get a certificate or reference letter?",
    answer:
      "No. We do not issue certificates, reference letters or confirmations of volunteering. Your public repository, commits, merged pull requests and publications are the best evidence of your work, and they belong to you.",
  },
  {
    question: "How should I describe my project on my CV or LinkedIn?",
    answer:
      'Describe it as your own independent open-source project (for example, "Author of [your project name], an open-source tool compatible with PiEEG"). Please do not list PiEEG Ltd as your employer, host or organisation.',
  },
  {
    question: "I'm a student. Can this be my thesis or course project?",
    answer:
      "Yes, and that is often the best route. Your university supervises, assesses and covers ethics approval; you simply use open-source tools. PiEEG Ltd is not a party to the project and does not sign academic agreements for it.",
  },
  {
    question: "Do you provide free hardware?",
    answer:
      "Not as part of this page. Hardware is available through the normal store. Any separate community programmes (such as maker challenges) are announced on their own pages with their own terms.",
  },
  {
    question: "Who owns what I build?",
    answer:
      "You do. You choose the licence for your own code, designs and data, subject to the licences of anything you reuse. If you choose to submit a pull request to a PiEEG repository, it is accepted under that repository's licence.",
  },
  {
    question: "Can I use the PiEEG name or logo?",
    answer:
      "You may say factually that your project works with or is built on PiEEG open hardware or software. Please don't name your project in a way that suggests it is official, endorsed or made by PiEEG Ltd.",
  },
];

export function getAllOpenIdeas(): OpenIdea[] {
  return OPEN_IDEA_CATEGORIES.flatMap((cat) => cat.ideas);
}

export function getOpenIdeaBySlug(slug: string): OpenIdea | null {
  return getAllOpenIdeas().find((idea) => idea.slug === slug) ?? null;
}
