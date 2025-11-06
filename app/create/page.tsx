'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { Barlow_Condensed } from 'next/font/google';
import './page.css';


gsap.registerPlugin(SplitText);

type SplitTextInstance = {
    chars?: HTMLElement[];
    revert?: () => void;
};

const barlow = Barlow_Condensed({
    subsets: ['latin'],
    weight: [
        '100', '200', '300', '400', '500', '600', '700', '800', '900'
    ],
});


const Profiles = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const activeIndexRef = useRef<number | null>(null);

    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        // Scope DOM queries to the current section only
        const profileImagesContainer = root.querySelector(".profile-images");
        const profileImages = root.querySelectorAll(".profile-images .img");
        const nameElements = root.querySelectorAll(".profile-names .name");
        const nameHeadings = root.querySelectorAll(".profile-names .name h1");

        // SplitText setup and tracking for cleanup
        const splits: SplitTextInstance[] = [];
        nameHeadings.forEach((heading) => {
            const split = new SplitText(heading, { type: "chars" });
            const splitInstance = split as unknown as SplitTextInstance;
            splitInstance.chars?.forEach((char: HTMLElement) => {
                char.classList.add("letter");
            });
            splits.push(splitInstance);
        });

        const defaultLetters = nameElements[0]?.querySelectorAll(".letter");
        
        const listeners: Array<{ el: Element; type: string; handler: EventListener }> = [];

        // Initialize setup function
        const setupInteractions = () => {
            // Re-read media queries on each setup (in case viewport changed)
            const canHover = window.matchMedia('(hover: hover)').matches;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobile = window.matchMedia('(max-width: 900px)').matches;

            // Responsive size values (recalculated)
            const baseSize = isMobile ? 60 : 70;
            const hoverSize = isMobile ? 90 : 140;

            // Clear any existing listeners first
            listeners.forEach(({ el, type, handler }) => {
                if (el instanceof MediaQueryList) {
                    el.removeEventListener(type as 'change', handler as EventListener);
                } else if (el.removeEventListener) {
                    el.removeEventListener(type, handler);
                }
            });
            listeners.length = 0;
            activeIndexRef.current = null;

            // Reset all images to base size
            profileImages.forEach((img) => {
                gsap.set(img, { width: baseSize, height: baseSize });
            });

            if (prefersReducedMotion) {
                if (defaultLetters && defaultLetters.length > 0) {
                    gsap.set(defaultLetters, { y: "0%" });
                }
                // Hide all profile names
                nameElements.forEach((nameEl, index) => {
                    if (index === 0) return;
                    const letters = nameEl.querySelectorAll(".letter");
                    if (letters && letters.length > 0) {
                        gsap.set(letters, { y: "100%" });
                    }
                });
            } else if (isMobile) {
                // Mobile touch behavior - prioritize screen size
                // Set initial state: show default text (positioned similar to laptop view)
                if (defaultLetters && defaultLetters.length > 0) {
                    gsap.set(defaultLetters, { y: "30%" });
                }

                // Hide all profile names initially
                nameElements.forEach((nameEl, index) => {
                    if (index === 0) return; // Skip default name
                    const letters = nameEl.querySelectorAll(".letter");
                    if (letters && letters.length > 0) {
                        gsap.set(letters, { y: "100%" });
                    }
                });

                // Function to reset to default text
                const resetToDefault = () => {
                    // Reset all images to base size
                    profileImages.forEach((otherImg) => {
                        gsap.to(otherImg, {
                            width: baseSize,
                            height: baseSize,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });

                    // Hide all profile names
                    nameElements.forEach((nameEl, nameIndex) => {
                        if (nameIndex === 0) return; // Skip default
                        const otherLetters = nameEl.querySelectorAll(".letter");
                        if (otherLetters && otherLetters.length > 0) {
                            gsap.to(otherLetters, {
                                y: "100%",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                    });

                    // Show default text with stagger animation (positioned similar to laptop view)
                    if (defaultLetters && defaultLetters.length > 0) {
                        gsap.to(defaultLetters, {
                            y: "30%",
                            duration: 0.4,
                            ease: "power2.out",
                            stagger: {
                                each: 0.02,
                                from: "center",
                            },
                        });
                    }

                    activeIndexRef.current = null;
                };

                // Handle tap/click on profile images
                profileImages.forEach((img, index) => {
                    const correspondingName = nameElements[index + 1];
                    const letters = correspondingName?.querySelectorAll(".letter");
                    if (!letters || letters.length === 0) return;

                    const activateProfile = (e?: Event) => {
                        // Stop event propagation to prevent triggering section click
                        if (e) {
                            e.stopPropagation();
                        }

                        // Reset all images to base size
                        profileImages.forEach((otherImg) => {
                            gsap.to(otherImg, {
                                width: baseSize,
                                height: baseSize,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });

                        // Hide all profile names
                        nameElements.forEach((nameEl, nameIndex) => {
                            if (nameIndex === 0) return; // Skip default
                            const otherLetters = nameEl.querySelectorAll(".letter");
                            if (otherLetters && otherLetters.length > 0) {
                                gsap.to(otherLetters, {
                                    y: "100%",
                                    duration: 0.3,
                                    ease: "power2.out"
                                });
                            }
                        });

                        // Hide default text (move it up completely on mobile)
                        if (defaultLetters && defaultLetters.length > 0) {
                            gsap.to(defaultLetters, {
                                y: "-100%",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }

                        // Show selected profile
                        if (activeIndexRef.current === index) {
                            // Tapping same image: show default again
                            resetToDefault();
                        } else {
                            // Show new profile
                            activeIndexRef.current = index;
                            gsap.to(img, {
                                width: hoverSize,
                                height: hoverSize,
                                duration: 0.3,
                                ease: "power2.out"
                            });

                            // Move profile name up (similar spacing to laptop view)
                            gsap.to(letters, {
                                y: "-60%",
                                duration: 0.4,
                                ease: "power2.out",
                                stagger: {
                                    each: 0.02,
                                    from: "center",
                                },
                            });
                        }
                    };

                    const handleTouch = (e: Event) => {
                        e.preventDefault();
                        activateProfile(e);
                    };

                    img.addEventListener("click", activateProfile);
                    img.addEventListener("touchend", handleTouch);
                    listeners.push({ el: img, type: "click", handler: activateProfile });
                    listeners.push({ el: img, type: "touchend", handler: handleTouch });
                });

                // Add click handler to entire section to reset to default
                const handleSectionClick = () => {
                    // Only reset if a profile is currently active
                    if (activeIndexRef.current !== null) {
                        resetToDefault();
                    }
                };

                root.addEventListener("click", handleSectionClick);
                root.addEventListener("touchend", handleSectionClick);
                listeners.push({ el: root, type: "click", handler: handleSectionClick });
                listeners.push({ el: root, type: "touchend", handler: handleSectionClick });
            } else if (canHover) {
                // Desktop hover behavior
                // Set initial state for desktop
                if (defaultLetters && defaultLetters.length > 0) {
                    gsap.set(defaultLetters, { y: "100%" });
                }
                profileImages.forEach((img, index) => {
                const correspondingName = nameElements[index + 1];
                const letters = correspondingName?.querySelectorAll(".letter");
                if (!letters || letters.length === 0) return;

                const onEnter = () => {
                    gsap.to(img, {
                        width: 140,
                        height: 140,
                        duration: 0.5,
                        ease: "power4.out"
                    });

                    gsap.to(letters, {
                        y: "-100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                const onLeave = () => {
                    gsap.to(img, {
                        width: 70,
                        height: 70,
                        duration: 0.5,
                        ease: "power4.out"
                    });

                    gsap.to(letters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                img.addEventListener("mouseenter", onEnter);
                img.addEventListener("mouseleave", onLeave);
                listeners.push({ el: img, type: "mouseenter", handler: onEnter });
                listeners.push({ el: img, type: "mouseleave", handler: onLeave });
            });

            if (profileImagesContainer && defaultLetters && defaultLetters.length > 0) {
                const onContainerEnter = () => {
                    gsap.to(defaultLetters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                const onContainerLeave = () => {
                    gsap.to(defaultLetters, {
                        y: "100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                profileImagesContainer.addEventListener("mouseenter", onContainerEnter);
                profileImagesContainer.addEventListener("mouseleave", onContainerLeave);
                listeners.push({ el: profileImagesContainer, type: "mouseenter", handler: onContainerEnter });
                listeners.push({ el: profileImagesContainer, type: "mouseleave", handler: onContainerLeave });
            }
            } else {
                // Fallback: no hover capability and not mobile - show default text
                if (defaultLetters && defaultLetters.length > 0) {
                    gsap.set(defaultLetters, { y: "0%" });
                }
                // Hide all profile names
                nameElements.forEach((nameEl, index) => {
                    if (index === 0) return;
                    const letters = nameEl.querySelectorAll(".letter");
                    if (letters && letters.length > 0) {
                        gsap.set(letters, { y: "100%" });
                    }
                });
            }
        };

        // Initial setup
        setupInteractions();

        // Listen for viewport changes to reinitialize
        const mobileQuery = window.matchMedia('(max-width: 900px)');
        let lastMobileState = mobileQuery.matches;
        
        const handleResize = () => {
            const currentIsMobile = window.matchMedia('(max-width: 900px)').matches;
            // Only reinitialize if the mobile state actually changed
            if (currentIsMobile !== lastMobileState) {
                lastMobileState = currentIsMobile;
                setupInteractions();
            }
        };

        // Use MediaQueryList listener for better performance
        if (mobileQuery.addEventListener) {
            mobileQuery.addEventListener('change', handleResize);
            listeners.push({ 
                el: mobileQuery as unknown as Element, 
                type: 'change', 
                handler: handleResize 
            });
        } else {
            // Fallback for older browsers
            const resizeHandler = () => {
                const currentIsMobile = window.innerWidth <= 900;
                if (currentIsMobile !== lastMobileState) {
                    lastMobileState = currentIsMobile;
                    setupInteractions();
                }
            };
            window.addEventListener('resize', resizeHandler);
            listeners.push({ 
                el: window as unknown as Element, 
                type: 'resize', 
                handler: resizeHandler 
            });
        }

        return () => {
            // Remove all registered listeners
            listeners.forEach(({ el, type, handler }) => {
                if (el instanceof MediaQueryList) {
                    el.removeEventListener(type as 'change', handler as EventListener);
                } else if (el.removeEventListener) {
                    el.removeEventListener(type, handler);
                }
            });

            // Revert SplitText to restore original DOM
            splits.forEach((split) => split.revert && split.revert());
        };
    }, []);

  return (
        <section ref={sectionRef} className={`team ${barlow.className}`}>
            <div className="profile-images">
            <div className="img"><img src="/profiles/img1.png" alt="Kashyap"/></div>
            <div className="img"><img src="/profiles/img2.png" alt="Disha"/></div>
            <div className="img"><img src="/profiles/img3.png" alt="Shubhankar"/></div>
            <div className="img"><img src="/profiles/img4.png" alt="Meet"/></div>
            </div>

            <div className="profile-names">
                <div className="name default"><h1>The Squad</h1></div>
                <div className="name"><h1>Kashyap</h1></div>
                <div className="name"><h1>Disha</h1></div>
                <div className="name"><h1>Shubhankar</h1></div>
                <div className="name"><h1>Meet</h1></div>
            </div>
        </section>
  );
}

export default Profiles;