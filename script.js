// ==========================================
// 🐾 PURRFECT STICKERS - MAIN JAVASCRIPT
// ==========================================

// ---------- STICKER DATA ----------

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
        caption: "I said I wouldn't laugh... but here we are 😭",
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
        emoji: "😿",
        title: "Sad Cat",
        caption: "Nobody asked if I'm okay 🥺",
        category: "cute"
    },
    {
        id: 9,
        emoji: "🙀",
        title: "Shocked Cat",
        caption: "WAIT... WHAT?! 😳",
        category: "funny"
    },
    {
        id: 10,
        emoji: "💀🐱",
        title: "Meme Cat",
        caption: "This is fine. Everything is totally fine 💀",
        category: "meme"
    },
    {
        id: 11,
        emoji: "💻😸",
        title: "Coding Cat",
        caption: "Just one more bug... famous last words 💻",
        category: "coding"
    },
    {
        id: 12,
        emoji: "🐱",
        title: "Tiny Cat",
        caption: "Small cat. BIG attitude. 🐾",
        category: "cute"
    },
    {
        id: 13,
        emoji: "😎🐱",
        title: "Cool Cat",
        caption: "Too cool to explain myself 😎",
        category: "funny"
    },
    {
        id: 14,
        emoji: "😭🐱",
        title: "Drama Cat",
        caption: "Everything is a dramatic event 😭",
        category: "meme"
    },
    {
        id: 15,
        emoji: "🍕🐱",
        title: "Pizza Cat",
        caption: "My love language is pizza 🍕",
        category: "food"
    },
    {
        id: 16,
        emoji: "💻💀",
        title: "404 Cat",
        caption: "Motivation not found. Please try again.",
        category: "coding"
    },
    {
        id: 17,
        emoji: "🥰🐱",
        title: "Cuddle Cat",
        caption: "Emergency cat hug incoming! 🤗",
        category: "love"
    },
    {
        id: 18,
        emoji: "😾🔥",
        title: "Tiny Rage",
        caption: "Small body. Extremely large anger.",
        category: "angry"
    }
];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const stickerGrid = document.getElementById("stickerGrid");
const favoriteGrid = document.getElementById("favoriteGrid");
const searchInput = document.getElementById("searchInput");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const randomBtn = document.getElementById("randomBtn");
const randomBtn2 = document.getElementById("randomBtn2");
const randomResult = document.getElementById("randomResult");

const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeBtn");

const modalEmoji = document.getElementById("modalEmoji");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const modalCategory = document.getElementById("modalCategory");

const downloadBtn = document.getElementById("downloadBtn");
const favoriteModalBtn =
    document.getElementById("favoriteModalBtn");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".nav");


// ==========================================
// APP STATE
// ==========================================

let currentCategory = "all";
let currentSearch = "";
let currentSticker = null;

let favorites =
    JSON.parse(localStorage.getItem("purrfectFavorites")) || [];


// ==========================================
// TOAST
// ==========================================

let toastTimer;

function showToast(message) {

    if (!toast || !toastText) return;

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


// ==========================================
// CREATE STICKER CARD
// ==========================================

function createStickerCard(sticker) {

    const card = document.createElement("article");

    card.className = "sticker-card";

    const saved =
        favorites.includes(sticker.id);

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

                <button
                    class="preview-btn"
                    data-action="view"
                >
                    👀 View
                </button>

                <button
                    class="favorite-btn ${saved ? "is-favorite" : ""}"
                    data-action="favorite"
                >
                    ${saved ? "❤️ Saved" : "♡ Favorite"}
                </button>

                <button
                    class="download-card-btn"
                    data-action="download"
                >
                    ⬇️ Save
                </button>

            </div>

        </div>
    `;

    card.dataset.id = sticker.id;

    return card;
}


// ==========================================
// SHOW STICKERS
// ==========================================

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

    const fragment =
        document.createDocumentFragment();

    list.forEach(sticker => {

        fragment.appendChild(
            createStickerCard(sticker)
        );

    });

    stickerGrid.appendChild(fragment);
}


// ==========================================
// FILTER STICKERS
// ==========================================

function filterStickers() {

    let result = [...stickers];

    // Category
    if (currentCategory !== "all") {

        result = result.filter(
            sticker =>
                sticker.category === currentCategory
        );

    }

    // Search
    if (currentSearch !== "") {

        const search =
            currentSearch.toLowerCase();

        result = result.filter(sticker =>

            sticker.title
                .toLowerCase()
                .includes(search)

            ||

            sticker.caption
                .toLowerCase()
                .includes(search)

            ||

            sticker.category
                .toLowerCase()
                .includes(search)

        );

    }

    showStickers(result);
}


// ==========================================
// CATEGORY BUTTONS
// ==========================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        filterStickers();

        document
            .getElementById("stickers")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener("input", () => {

    currentSearch =
        searchInput.value.trim().toLowerCase();

    filterStickers();

});


// ==========================================
// GALLERY BUTTONS
// ==========================================

stickerGrid.addEventListener("click", event => {

    const button =
        event.target.closest("button");

    if (!button) return;

    const card =
        event.target.closest(".sticker-card");

    if (!card) return;

    const id =
        Number(card.dataset.id);

    const sticker =
        stickers.find(item => item.id === id);

    if (!sticker) return;

    const action =
        button.dataset.action;


    if (action === "view") {

        openModal(sticker);

    }


    if (action === "favorite") {

        toggleFavorite(sticker);

    }


    if (action === "download") {

        downloadStickerAsPNG(sticker);

    }

});


// ==========================================
// FAVORITES
// ==========================================

function toggleFavorite(sticker) {

    const index =
        favorites.indexOf(sticker.id);

    if (index === -1) {

        favorites.push(sticker.id);

        showToast("❤️ Added to favorites!");

    } else {

        favorites.splice(index, 1);

        showToast("💔 Removed from favorites!");

    }

    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );

    filterStickers();
    showFavorites();

    if (currentSticker &&
        currentSticker.id === sticker.id) {

        updateModalFavoriteButton();

    }

}


// ==========================================
// SHOW FAVORITES
// ==========================================

function showFavorites() {

    favoriteGrid.innerHTML = "";

    if (favorites.length === 0) {

        favoriteGrid.innerHTML = `

            <div class="empty-favorites">

                <div>🥺</div>

                <h3>
                    No favorite cats yet!
                </h3>

                <p>
                    Click ❤️ on a sticker to save it here.
                </p>

            </div>

        `;

        return;
    }

    const savedStickers =
        stickers.filter(sticker =>
            favorites.includes(sticker.id)
        );

    savedStickers.forEach(sticker => {

        favoriteGrid.appendChild(
            createStickerCard(sticker)
        );

    });

}


// ==========================================
// FAVORITE GALLERY BUTTONS
// ==========================================

favoriteGrid.addEventListener("click", event => {

    const button =
        event.target.closest("button");

    if (!button) return;

    const card =
        event.target.closest(".sticker-card");

    if (!card) return;

    const id =
        Number(card.dataset.id);

    const sticker =
        stickers.find(item => item.id === id);

    if (!sticker) return;

    const action =
        button.dataset.action;

    if (action === "view") {

        openModal(sticker);

    }

    if (action === "favorite") {

        toggleFavorite(sticker);

    }

    if (action === "download") {

        downloadStickerAsPNG(sticker);

    }

});


// ==========================================
// OPEN MODAL
// ==========================================

function openModal(sticker) {

    currentSticker = sticker;

    modalEmoji.textContent =
        sticker.emoji;

    modalTitle.textContent =
        sticker.title;

    modalCaption.textContent =
        sticker.caption;

    modalCategory.textContent =
        sticker.category.toUpperCase();

    updateModalFavoriteButton();

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


// ==========================================
// MODAL FAVORITE BUTTON
// ==========================================

function updateModalFavoriteButton() {

    if (!currentSticker) return;

    const saved =
        favorites.includes(currentSticker.id);

    favoriteModalBtn.textContent =
        saved
            ? "❤️ Saved"
            : "❤️ Favorite";

}


favoriteModalBtn.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;

        toggleFavorite(currentSticker);

    }
);


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModalWindow() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

closeBtn.addEventListener(
    "click",
    closeModalWindow
);

modalOverlay.addEventListener(
    "click",
    closeModalWindow
);

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModalWindow();
        }

    }
);


// ==========================================
// RANDOM CAT
// ==========================================

function showRandomCat() {

    const randomIndex =
        Math.floor(
            Math.random() * stickers.length
        );

    const sticker =
        stickers[randomIndex];

    randomResult.innerHTML = `

        <div>

            <div style="font-size:90px;">
                ${sticker.emoji}
            </div>

            <strong>
                ${sticker.title}
            </strong>

        </div>

    `;

    randomResult.animate(
        [
            {
                transform:
                    "scale(.7) rotate(-8deg)"
            },
            {
                transform:
                    "scale(1.1) rotate(8deg)"
            },
            {
                transform:
                    "scale(1) rotate(0)"
            }
        ],
        {
            duration: 500
        }
    );

}

randomBtn.addEventListener(
    "click",
    showRandomCat
);

randomBtn2.addEventListener(
    "click",
    showRandomCat
);


// ==========================================
// DOWNLOAD STICKER AS PNG
// ==========================================

function downloadStickerAsPNG(sticker) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 600;
    canvas.height = 600;

    const ctx =
        canvas.getContext("2d");

    ctx.fillStyle = "#fff0f6";

    ctx.fillRect(
        0,
        0,
        600,
        600
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "180px Arial";

    ctx.fillText(
        sticker.emoji,
        300,
        250
    );

    ctx.fillStyle = "#3d2633";

    ctx.font =
        "bold 32px Arial";

    ctx.fillText(
        sticker.title,
        300,
        430
    );

    ctx.font =
        "20px Arial";

    ctx.fillText(
        "🐾 Purrfect Stickers",
        300,
        500
    );

    const link =
        document.createElement("a");

    link.download =
        sticker.title
            .replaceAll(" ", "-")
            .toLowerCase() +
        "-sticker.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();

    showToast("⬇️ Sticker saved!");
}


// ==========================================
// MODAL DOWNLOAD
// ==========================================

downloadBtn.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;

        downloadStickerAsPNG(
            currentSticker
        );

    }
);


// ==========================================
// MOBILE MENU
// ==========================================

menuBtn.addEventListener(
    "click",
    () => {

        navbar.classList.toggle("open");

    }
);


// Close mobile menu after clicking link

navbar.querySelectorAll("a").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navbar.classList.remove("open");

            }
        );

    }
);


// ==========================================
// INITIALIZE
// ==========================================

showStickers(stickers);

showFavorites();

console.log(
    "🐾 Purrfect Stickers is ready!"
);
