'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { Barlow_Condensed } from 'next/font/google';

gsap.registerPlugin(SplitText);

type SplitTextInstance = {
    chars?: HTMLElement[];
    revert?: () => void;
};

const barlow = Barlow_Condensed({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900'],
});

export const TeamSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        const profileImagesContainer = root.querySelector('.profile-images');
        const profileImages = root.querySelectorAll('.profile-images .img');
        const nameElements = root.querySelectorAll('.profile-names .name');
        const nameHeadings = root.querySelectorAll('.profile-names .name h1');

        const splits: SplitTextInstance[] = [];
        nameHeadings.forEach((heading) => {
            const split = new SplitText(heading, { type: 'chars' });
            const splitInstance = split as unknown as SplitTextInstance;
            splitInstance.chars?.forEach((char: HTMLElement) => {
                char.classList.add('letter');
            });
            splits.push(splitInstance);
        });

        const defaultLetters = nameElements[0]?.querySelectorAll('.letter');
        if (defaultLetters && defaultLetters.length > 0) {
            gsap.set(defaultLetters, { y: '100%' });
        }

        const canHover = window.matchMedia('(hover: hover)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const listeners: Array<{ el: Element; type: string; handler: EventListener }> = [];

        if (prefersReducedMotion) {
            if (defaultLetters && defaultLetters.length > 0) {
                gsap.set(defaultLetters, { y: '0%' });
            }
        } else if (canHover) {
            profileImages.forEach((img, index) => {
                const correspondingName = nameElements[index + 1];
                const letters = correspondingName?.querySelectorAll('.letter');
                if (!letters || letters.length === 0) return;

                const onEnter = () => {
                    gsap.to(img, { width: 240, height: 240, duration: 0.5, ease: 'power4.out' });
                    gsap.to(letters, {
                        y: '-100%',
                        ease: 'power4.out',
                        duration: 0.75,
                        stagger: { each: 0.025, from: 'center' },
                    });
                };

                const onLeave = () => {
                    gsap.to(img, { width: 150, height: 150, duration: 0.5, ease: 'power4.out' });
                    gsap.to(letters, {
                        y: '0%',
                        ease: 'power4.out',
                        duration: 0.75,
                        stagger: { each: 0.025, from: 'center' },
                    });
                };

                img.addEventListener('mouseenter', onEnter);
                img.addEventListener('mouseleave', onLeave);
                listeners.push({ el: img, type: 'mouseenter', handler: onEnter });
                listeners.push({ el: img, type: 'mouseleave', handler: onLeave });
            });

            if (profileImagesContainer && defaultLetters && defaultLetters.length > 0) {
                const onContainerEnter = () => {
                    gsap.to(defaultLetters, {
                        y: '0%',
                        ease: 'power4.out',
                        duration: 0.75,
                        stagger: { each: 0.025, from: 'center' },
                    });
                };
                const onContainerLeave = () => {
                    gsap.to(defaultLetters, {
                        y: '100%',
                        ease: 'power4.out',
                        duration: 0.75,
                        stagger: { each: 0.025, from: 'center' },
                    });
                };
                profileImagesContainer.addEventListener('mouseenter', onContainerEnter);
                profileImagesContainer.addEventListener('mouseleave', onContainerLeave);
                listeners.push({ el: profileImagesContainer, type: 'mouseenter', handler: onContainerEnter });
                listeners.push({ el: profileImagesContainer, type: 'mouseleave', handler: onContainerLeave });
            }
        } else {
            if (defaultLetters && defaultLetters.length > 0) {
                gsap.set(defaultLetters, { y: '0%' });
            }
        }

        return () => {
            listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler));
            splits.forEach((split) => split.revert && split.revert());
        };
    }, []);

    return (
        <>
        <section
          ref={sectionRef}
          className={`w-screen h-[90svh] bg-[#0f0f0f] text-[#e3e3e3] flex flex-col justify-center items-center gap-10 overflow-hidden relative ${barlow.className}
            max-[900px]:flex-col-reverse`
          }
        >
          <div
            className="w-max flex justify-center items-center max-[900px]:flex-wrap max-[900px]:max-w-[90%] max-[900px]:justify-center"
          >
            <div
              className="relative h-[150px] w-[150px] p-[5px] cursor-pointer will-change-[width,height] max-[900px]:h-[60px] max-[900px]:w-[60px] max-[900px]:p-[2.5px] transition-all duration-500"
            >
              <img
                src="/profiles/img1.png"
                alt="Kashyap"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="relative h-[150px] w-[150px] p-[5px] cursor-pointer will-change-[width,height] max-[900px]:h-[60px] max-[900px]:w-[60px] max-[900px]:p-[2.5px] transition-all duration-500">
              <img src="/profiles/img2.png" alt="Disha" className="h-full w-full object-cover rounded-md" />
            </div>
            <div className="relative h-[150px] w-[150px] p-[5px] cursor-pointer will-change-[width,height] max-[900px]:h-[60px] max-[900px]:w-[60px] max-[900px]:p-[2.5px] transition-all duration-500">
              <img src="/profiles/img3.png" alt="Shubhankar" className="h-full w-full object-cover rounded-md" />
            </div>
            <div className="relative h-[150px] w-[150px] p-[5px] cursor-pointer will-change-[width,height] max-[900px]:h-[60px] max-[900px]:w-[60px] max-[900px]:p-[2.5px] transition-all duration-500">
              <img src="/profiles/img4.png" alt="Meet" className="h-full w-full object-cover rounded-md" />
            </div>
          </div>
          <div
            className="w-full h-[20rem] overflow-hidden"
            style={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }}
          >
            <div className="name default relative">
              <h1
                className="absolute w-full text-center uppercase font-barlow font-black text-[20rem] tracking-[-0.5rem] leading-none text-[#e3e3db] user-select-none transform translate-y-[-100%] max-[900px]:text-[4rem] max-[900px]:tracking-[0]"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900 }}
              >
                The Squad
              </h1>
            </div>
            <div className="name relative">
              <h1
                className="absolute w-full text-center uppercase font-barlow font-black text-[20rem] tracking-[-0.5rem] leading-none text-[#f93535] user-select-none transform translate-y-[100%] max-[900px]:text-[4rem] max-[900px]:tracking-[0]"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900 }}
              >
                Kashyap
              </h1>
            </div>
            <div className="name relative">
              <h1
                className="absolute w-full text-center uppercase font-barlow font-black text-[20rem] tracking-[-0.5rem] leading-none text-[#f93535] user-select-none transform translate-y-[100%] max-[900px]:text-[4rem] max-[900px]:tracking-[0]"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900 }}
              >
                Disha
              </h1>
            </div>
            <div className="name relative">
              <h1
                className="absolute w-full text-center uppercase font-barlow font-black text-[20rem] tracking-[-0.5rem] leading-none text-[#f93535] user-select-none transform translate-y-[100%] max-[900px]:text-[4rem] max-[900px]:tracking-[0]"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900 }}
              >
                Shubhankar
              </h1>
            </div>
            <div className="name relative">
              <h1
                className="absolute w-full text-center uppercase font-barlow font-black text-[20rem] tracking-[-0.5rem] leading-none text-[#f93535] user-select-none transform translate-y-[100%] max-[900px]:text-[4rem] max-[900px]:tracking-[0]"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900 }}
              >
                Meet
              </h1>
            </div>
          </div>
        </section>
        </>
    );
};

export default TeamSection;


