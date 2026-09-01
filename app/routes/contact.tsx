export function meta() {
    return [
        {title: "Contact | Stayfinder"},
        {name: "description", content: "Get in touch with the Stayfinder team."},
    ]
}

export function loader() {
}

export async function clientLoader() {}

const contactOptions = [
    {
        title: "Trip support",
        description: "Questions about a stay or help planning your next trip.",
        email: "support@stayfinder.com",
        icon: "message",
    },
    {
        title: "General questions",
        description: "Anything else about Stayfinder, our service, or how it works.",
        email: "hello@stayfinder.com",
        icon: "mail",
    },
    {
        title: "Partnerships",
        description: "For hotels, travel partners, and collaboration opportunities.",
        email: "partners@stayfinder.com",
        icon: "spark",
    },
]

export default function ContactPage() {
    return (
        <div className="overflow-hidden bg-white dark:bg-zinc-950">
            <section className="relative isolate border-b border-slate-200/80 px-5 py-20 sm:px-8 sm:py-28 dark:border-white/10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_85%_30%,rgba(99,102,241,0.13),transparent_30%)]"/>
                <div className="absolute left-1/2 top-16 -z-10 size-64 -translate-x-1/2 rounded-full border border-sky-200/60 dark:border-sky-400/10"/>

                <div className="mx-auto max-w-3xl text-center">
                    <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
                            <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7"/>
                            <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                        Contact us
                    </p>
                    <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
                        We would love to hear from you.
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-600 dark:text-zinc-300">
                        Whether you need help with a trip or simply want to say hello, choose the right inbox and our team will get back to you soon.
                    </p>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-8 sm:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-5 md:grid-cols-3">
                        {contactOptions.map((option) => (
                            <article
                                key={option.title}
                                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-white/10 dark:bg-zinc-900 dark:hover:shadow-black/20"
                            >
                                <span className="grid size-11 place-items-center rounded-2xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-400/10 dark:text-sky-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                                    <ContactIcon name={option.icon}/>
                                </span>
                                <h2 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">{option.title}</h2>
                                <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-zinc-400">{option.description}</p>
                                <a
                                    href={`mailto:${option.email}`}
                                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                                >
                                    {option.email}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </article>
                        ))}
                    </div>

                    <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 lg:grid-cols-[1.1fr_0.9fr] dark:border-white/10 dark:bg-white/[0.03]">
                        <div className="p-7 sm:p-10 lg:p-12">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                                Before you write
                            </p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                                A little detail helps us help you faster.
                            </h2>
                            <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-zinc-400">
                                If your message is about a booking, include the property name, travel dates, and the email used for your reservation. Please never send payment card details by email.
                            </p>
                        </div>

                        <div className="flex flex-col justify-center gap-6 bg-gradient-to-br from-slate-950 to-indigo-950 p-7 text-white sm:p-10 lg:p-12">
                            <div className="flex items-start gap-4">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7"/>
                                        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="font-bold">Response time</h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-300">Usually within one business day.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                                        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.7"/>
                                        <path d="M3.5 12h17M12 3c2 2.5 3 5.5 3 9s-1 6.5-3 9c-2-2.5-3-5.5-3-9s1-6.5 3-9Z" stroke="currentColor" strokeWidth="1.7"/>
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="font-bold">Support hours</h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-300">Every day, 9:00–21:00.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function ContactIcon({name}: { name: string }) {
    if (name === "message") {
        return (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
        )
    }

    if (name === "spark") {
        return (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                <path d="M12 3c.5 5 2 6.5 7 7-5 .5-6.5 2-7 7-.5-5-2-6.5-7-7 5-.5 6.5-2 7-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                <path d="M19 16c.2 2 1 2.8 3 3-2 .2-2.8 1-3 3-.2-2-1-2.8-3-3 2-.2 2.8-1 3-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
            <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7"/>
            <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
