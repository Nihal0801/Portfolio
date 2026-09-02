import SectionTitle from '@/components/SectionTitle';
import { EDUCATION } from '@/lib/data';

const Education = () => (
    <section className="py-section" id="education">
        <div className="container">
            <SectionTitle title="Education" />
            <div className="grid md:grid-cols-2">
                {EDUCATION.map((item) => (
                    <article className="border-t pt-6" key={item.school}>
                        <div className="flex justify-between gap-5 text-muted-foreground text-base">
                            <span>{item.location}</span>
                            <span className="text-right">{item.duration}</span>
                        </div>
                        <h3 className="font-anton text-4xl md:text-5xl mt-10">
                            {item.school}
                        </h3>
                        <p className="text-xl mt-4">{item.degree}</p>
                        <p className="text-primary text-lg mt-8">
                            {item.score}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default Education;
