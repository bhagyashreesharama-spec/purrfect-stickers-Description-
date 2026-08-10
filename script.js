// ==============================
// LITTLE PAWS — JAVASCRIPT
// ==============================

const stickerCards = document.querySelectorAll(".sticker-card");
const cuteButton = document.querySelector(".cute-button");

// Sticker hover effect
stickerCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.setProperty("--random-rotate", `${Math.random() * 4 - 2}deg`);
    });

    card.addEventListener("mouseleave", () => {
        card.style.removeProperty("--random-rotate");
    });

});


// Cute button click
cuteButton.addEventListener("click", () => {

    document.querySelector("#stickers").scrollIntoView({
        behavior: "smooth"
    });

});


// Small floating sparkles
function createSparkle() {

    const sparkle = document.createElement("span");

    sparkle.className = "floating-sparkle";

    sparkle.innerHTML = "✦";

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration =
        3 + Math.random() * 3 + "s";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 6000);
}


// Create sparkles occasionally
setInterval(createSparkle, 1800);
