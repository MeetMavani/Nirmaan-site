import React from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import './page.css';

gsap.registerPlugin(SplitText);



const Profiles = () => {

   document.addEventListener("DOMContentLoaded", () => {
        const profileImagesContainer = document.querySelector(".profile-images");
        const profileImages = document.querySelectorAll(".profile-images .img");
        const nameElements = document.querySelectorAll(".profile-names .name");
        const nameHeadings = document.querySelectorAll(".profile-names .name h1");

        nameHeadings.forEach((heading) => {
            const split = new SplitText(heading, { type: "chars" });
            split.chars.forEach((char) => {
                char.classList.add("letter");
            });
        });

        const defaultLetters = nameElements[0].querySelectorAll(".letter");
        gsap.set(defaultLetters, { y: "100%"});

        if (window.innerWidth >= 900) {
            profileImages.forEach((img, index) => {
                const correspondingName = nameElements[index + 1];
                const letters = correspondingName.querySelectorAll(".letter");

                img.addEventListener("mouseenter", () => {
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
                });

                img.addEventListener("mouseleave", () => {
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
                });
            });

            profileImagesContainer?.addEventListener("mouseenter", () => {
                gsap.to(defaultLetters, {
                    y: "0%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center",
                    },
                });
            });

            profileImagesContainer?.addEventListener("mouseleave", () => {
                gsap.to(defaultLetters, {
                    y: "100%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center",
                    },
                });
            });
        }
    });

  return (
      <section className="team">
        <div className="profile-images">
          <div className="img"><img src="/profiles/img1.png" alt="Kashyap"/></div>
          <div className="img"><img src="/profiles/img2.png" alt="Shubhankar"/></div>
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