'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import type { IconType } from 'react-icons';
import {
    SiBlender,
    SiC,
    SiDotnet,
    SiJavascript,
    SiMeta,
    SiPython,
    SiUnity,
    SiUnrealengine,
} from 'react-icons/si';
import { FaAws, FaGitAlt, FaJava, FaLinux, FaWordpress } from 'react-icons/fa';
import { PiDatabaseFill } from 'react-icons/pi';
import {
    TbActivityHeartbeat,
    TbApi,
    TbAugmentedReality2,
    TbBoxMultiple,
    TbBrain,
    TbChartHistogram,
    TbCode,
    TbDeviceGamepad2,
    TbMathFunction,
    TbTopologyStar3,
} from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StackIcon = {
    icon: IconType;
    color: string;
};

const STACK_ICONS: Record<string, StackIcon> = {
    Python: { icon: SiPython, color: '#3776AB' },
    'C#': { icon: SiDotnet, color: '#512BD4' },
    Java: { icon: FaJava, color: '#F89820' },
    JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
    C: { icon: SiC, color: '#659AD2' },
    SQL: { icon: PiDatabaseFill, color: '#4479A1' },
    MATLAB: { icon: TbMathFunction, color: '#E16737' },
    'AI systems': { icon: TbBrain, color: '#A78BFA' },
    'Agent orchestration': { icon: TbTopologyStar3, color: '#22D3EE' },
    'AWS cloud fundamentals': { icon: FaAws, color: '#FF9900' },
    'REST APIs': { icon: TbApi, color: '#00C7B7' },
    'Data analysis': { icon: TbChartHistogram, color: '#4CC9F0' },
    Unity: { icon: SiUnity, color: '#FFFFFF' },
    'Unreal Engine': { icon: SiUnrealengine, color: '#FFFFFF' },
    Blender: { icon: SiBlender, color: '#F5792A' },
    Vuforia: { icon: TbAugmentedReality2, color: '#7AC943' },
    'Meta Quest': { icon: SiMeta, color: '#0668E1' },
    'XR Interaction Toolkit': { icon: TbDeviceGamepad2, color: '#A78BFA' },
    'Git & GitHub': { icon: FaGitAlt, color: '#F05032' },
    Linux: { icon: FaLinux, color: '#FCC624' },
    'Object-oriented programming': { icon: TbBoxMultiple, color: '#3B82F6' },
    'Real-time interaction': { icon: TbActivityHeartbeat, color: '#EF4444' },
    WordPress: { icon: FaWordpress, color: '#21759B' },
};

const FALLBACK_ICON: StackIcon = { icon: TbCode, color: '#6FE08F' };

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const slideUpEl =
                containerRef.current?.querySelectorAll('.slide-up');

            if (!slideUpEl?.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up', {
                opacity: 0,
                y: 40,
                ease: 'none',
                stagger: 0.4,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section id="my-stack" ref={containerRef}>
            <div className="container">
                <SectionTitle title="My Stack" />

                <div className="space-y-20">
                    {Object.entries(MY_STACK).map(([key, value]) => (
                        <div className="grid sm:grid-cols-12" key={key}>
                            <div className="sm:col-span-5">
                                <p className="slide-up text-5xl font-anton leading-none text-muted-foreground uppercase">
                                    {key}
                                </p>
                            </div>

                            <div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
                                {value.map((item) => {
                                    const { icon: Icon, color } =
                                        STACK_ICONS[item.name] ?? FALLBACK_ICON;

                                    return (
                                        <div
                                            className="slide-up group flex gap-3.5 items-center leading-none"
                                            key={item.name}
                                        >
                                            <div className="size-10 shrink-0 flex items-center justify-center">
                                                <Icon
                                                    aria-hidden="true"
                                                    className="size-9 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                                                    style={{ color }}
                                                />
                                            </div>
                                            <span className="text-2xl capitalize">
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

};

export default Skills;
