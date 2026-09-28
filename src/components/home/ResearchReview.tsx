import Image from "next/image";

const review = {
  quote:
    "PiEEG XR is enabling us to gain a deeper insight into our immersive experiences, adding a neurophysiological dimension to the study of how athletes respond during specific training tasks. Its integration with virtual reality environments opens up new possibilities for objectively investigating what happens whilst performing different exercises and how the response changes in the face of varying demands. Although we are still working on methodological optimisation and signal quality control, it is so far proving to be a tool with great potential for sports-related research.",
  name: "María Trapero Ventura",
  roles: [
    "Preparadora física Atlético de Madrid",
    "Health & Prevention Specialist - BeFootball",
    "Profesora en UAX",
  ],
  href: "https://www.linkedin.com/in/mar%C3%ADa-trapero-ventura/",
  photo: "/home/testimonials/maria.webp",
};

export default function ResearchReview() {
  return (
    <section
      id="research-review"
      aria-labelledby="research-review-title"
      className="scroll-mt-20 border-b border-zinc-200 bg-white py-20 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[280px_minmax(0,1fr)] md:gap-14">
        <a
          href={review.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto block w-full max-w-[280px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
        >
          <Image
            src={review.photo}
            alt={review.name}
            width={720}
            height={1280}
            sizes="280px"
            className="aspect-3/4 w-full object-cover object-[22%_center]"
          />
        </a>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            Latest
          </p>
          <h2
            id="research-review-title"
            className="mb-6 text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.08] tracking-[-0.045em]"
          >
            PiEEG XR in sports research
          </h2>
          <blockquote className="m-0 text-[17px] leading-[1.7] text-zinc-600 dark:text-zinc-300">
            <p className="m-0">{review.quote}</p>
          </blockquote>
          <footer className="mt-8 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <p className="m-0 text-base font-semibold tracking-[-0.02em]">{review.name}</p>
            <ul className="m-0 mt-2 list-none space-y-1 p-0 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {review.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <a
              href={review.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-50"
            >
              LinkedIn
            </a>
          </footer>
        </div>
      </div>
    </section>
  );
}
