import SectionTitle from '@/components/SectionTitle';

const focusAreas = [
    {
        number: '01',
        title: 'AI Systems',
        description:
            'Multi-agent architecture, model orchestration, tool use, memory, routing, and evaluation.',
    },
    {
        number: '02',
        title: 'Cloud Engineering',
        description:
            'Building toward secure, observable, and scalable systems with AWS and modern cloud foundations.',
    },
    {
        number: '03',
        title: 'Intelligent Software',
        description:
            'Software that turns data, automation, and strong system design into useful real-world outcomes.',
    },
];

const Focus = () => (
    <section className="py-section" id="focus">
        <div className="container">
            <SectionTitle title="Current Focus" />
            <p className="max-w-[900px] text-4xl md:text-6xl font-thin leading-tight mb-20">
                AI is the intelligence. Cloud is the infrastructure. I want to
                build the systems that connect both.
            </p>
            <div className="grid md:grid-cols-3">
                {focusAreas.map((area) => (
                    <article
                        className="border-t pt-5 min-h-56 flex flex-col"
                        key={area.title}
                    >
                        <span className="text-primary font-anton">
                            {area.number}
                        </span>
                        <h3 className="text-3xl font-anton mt-8">
                            {area.title}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed mt-4">
                            {area.description}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default Focus;
