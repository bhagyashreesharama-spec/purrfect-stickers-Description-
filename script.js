/* =========================================
   LITTLE PAWS
   KAWAII STICKER INTERACTIONS
   ========================================= */

const stickers = document.querySelectorAll(".sticker-card");
const exploreButton = document.querySelector(".cute-button");


/* =========================================
   RANDOM STICKER ROTATION
   ========================================= */

stickers.forEach((sticker, index) => {

    const rotations = [-3, 2, -2, 3, -1, 2, -4, 3, -2, 1, -3, 2];

    sticker.style.setProperty(
        "--random-rotate",
        `${rotations[index % rotations.length]}deg`
    );

});


/* =========================================
   MOUSE MOVEMENT
   ========================================= */

stickers.forEach((sticker) => {

    sticker.addEventListener("mousemove", (event) => {

        const rect = sticker.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        sticker.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotate(${sticker.style.getPropertyValue("--random-rotate")})
        `;

    });


    sticker.addEventListener("mouseleave", () => {

        sticker.style.transform = "";

    });

});


/* =========================================
   EXPLORE BUTTON
   ========================================= */

if (exploreButton) {

    exploreButton.addEventListener("click", (event) => {

        event.preventDefault();

        const gallery =
            document.querySelector("#stickers");

        gallery.scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* =========================================
   FLOATING MINI SPARKLES
   ========================================= */

function createSparkle() {

    const sparkle =
        document.createElement("span");

    sparkle.className =
        "floating-sparkle";

    sparkle.textContent =
        "✦";

    sparkle.style.left =
        Math.random() * 100 + "vw";

    sparkle.style.top =
        Math.random() * 100 + "vh";

    sparkle.style.animationDuration =
        3 + Math.random() * 3 + "s";

    sparkle.style.fontSize =
        8 + Math.random() * 10 + "px";

    document.body.appendChild(sparkle);


    setTimeout(() => {

        sparkle.remove();

    }, 6000);

}


/* Create sparkles slowly */

setInterval(createSparkle, 1400);


/* =========================================
   ADD SPARKLE STYLE
   ========================================= */

const sparkleStyle =
    document.createElement("style");

sparkleStyle.textContent = `

    .floating-sparkle {

        position: fixed;

        z-index: 9999;

        pointer-events: none;

        color: #e4a6b1;

        opacity: 0;

        animation:
            sparkleFloat 5s ease-in-out forwards;

    }


    @keyframes sparkleFloat {

        0% {

            opacity: 0;

            transform:
                translateY(20px)
                rotate(0deg)
                scale(.5);

        }

        20% {

            opacity: .8;

        }

        70% {

            opacity: .6;

        }

        100% {

            opacity: 0;

            transform:
                translateY(-80px)
                rotate(180deg)
                scale(1.2);

        }

    }

`;

document.head.appendChild(sparkleStyle);
