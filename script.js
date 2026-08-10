// 🐾 PURRFECT STICKERS
// Main JavaScript

const stickers = [
    {
        id: 1,
        emoji: "😺",
        title: "Happy Cat",
        caption: "Me when everything finally works 😂",
        category: "cute"
    },
    {
        id: 2,
        emoji: "😹",
        title: "Laughing Cat",
        caption: "I said I wouldn't laugh... 😭",
        category: "funny"
    },
    {
        id: 3,
        emoji: "😼",
        title: "Suspicious Cat",
        caption: "I know what you did... 👀",
        category: "meme"
    },
    {
        id: 4,
        emoji: "😾",
        title: "Angry Cat",
        caption: "Don't talk to me right now 😾",
        category: "angry"
    },
    {
        id: 5,
        emoji: "😴",
        title: "Sleepy Cat",
        caption: "My only plan today: SLEEP 💤",
        category: "sleepy"
    },
    {
        id: 6,
        emoji: "😻",
        title: "Love Cat",
        caption: "Sending you virtual meows 💕",
        category: "love"
    },
    {
        id: 7,
        emoji: "😋",
        title: "Hungry Cat",
        caption: "Did someone say food? 🍕",
        category: "food"
    },
    {
        id: 8,
        emoji: "💻😸",
        title: "Coding Cat",
        caption: "Just one more bug... 💻",
        category: "coding"
    },
    {
        id: 9,
        emoji: "😂🐱",
        title: "Funny Cat",
        caption: "This cat cannot stop laughing 😂",
        category: "funny"
    },
    {
        id: 10,
        emoji: "🥰🐱",
        title: "Cuddle Cat",
        caption: "Emergency cat hug incoming! 🤗",
        category: "love"
    }
];


// ===============================
// HTML ELEMENTS
// ===============================

const stickerGrid = document.getElementById("stickerGrid");
const searchInput = document.getElementById("searchInput");


// ===============================
// SHOW STICKERS
// ===============================

function showStickers(list) {

    stickerGrid.innerHTML = "";

    if (list.length === 0) {
        stickerGrid.innerHTML = `
            <div class="loading">
                🥺 No cats found!
                <br>
                Try another search 🐱
            </div>
        `;
        return;
    }

    list.forEach(sticker => {

        const card = document.createElement("article");

        card.className = "sticker-card";

        card.innerHTML = `
            
            <div class="sticker-image">
                <span class="sticker-emoji">
                    ${sticker.emoji}
                </span>
            </div>

            <div class="sticker-info">

                <span class="sticker-category">
                    ${sticker.category}
                </span>

                <h3 class="sticker-title">
                    ${sticker.title}
                </h3>

                <p class="sticker-caption">
                    ${sticker.caption}
                </p>

                <div class="sticker-actions">

                    <button class="preview-btn">
                        👀 View
                    </button>

                    <button class="favorite-btn">
                        ❤️ Favorite
                    </button>

                    <button class="download-card-btn">
                        ⬇️ Save
                    </button>

                </div>

            </div>
        `;

        stickerGrid.appendChild(card);

    });
}


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();

    const results = stickers.filter(sticker =>

        sticker.title.toLowerCase().includes(search) ||
        sticker.caption.toLowerCase().includes(search) ||
        sticker.category.toLowerCase().includes(search)

    );

    showStickers(results);

});


// ===============================
// CATEGORY BUTTONS
// ===============================

const categoryButtons =
    document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.category;

        if (category === "all") {

            showStickers(stickers);

        } else {

            const filtered =
                stickers.filter(
                    sticker =>
                        sticker.category === category
                );

            showStickers(filtered);

        }

    });

});


// ===============================
// INITIAL LOAD
// ===============================

showStickers(stickers);

console.log("🐾 Purrfect Stickers loaded!");
