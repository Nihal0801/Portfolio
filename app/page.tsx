import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import Focus from './_components/Focus';
import Education from './_components/Education';
import Recognition from './_components/Recognition';
import GitHubProjectFeed from './_components/GitHubProjectFeed';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <Focus />
            <Skills />
            <Education />
            <Experiences />
            <ProjectList />
            <GitHubProjectFeed />
            <Recognition />
        </div>
    );
}
