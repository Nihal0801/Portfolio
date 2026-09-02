import SectionTitle from '@/components/SectionTitle';
import { RECOGNITION } from '@/lib/data';

const Recognition = () => (
    <section className="pb-section" id="recognition">
        <div className="container">
            <SectionTitle title="Awards & Recognition" />
            <div className="border-t">
                {RECOGNITION.map((item, index) => (
                    <article
                        className="grid md:grid-cols-12 gap-3 py-7 border-b items-center"
                        key={item.title}
                    >
                        <span className="md:col-span-1 font-anton text-muted-foreground">
                            _{String(index + 1).padStart(2, '0')}.
                        </span>
                        <h3 className="md:col-span-5 text-2xl font-anton">
                            {item.title}
                        </h3>
                        <p className="md:col-span-4 text-muted-foreground text-base">
                            {item.organization}
                        </p>
                        <p className="md:col-span-2 md:text-right text-primary">
                            {item.date}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default Recognition;
