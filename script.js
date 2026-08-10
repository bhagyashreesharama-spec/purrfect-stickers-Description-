const stickers = [
    { id: 1, emoji: "🎀🐱", title: "Shy Cat Girl", category: "cute", caption: "A tiny shy smile 🥺" },
    { id: 2, emoji: "😽🐱", title: "Happy Cat Girl", category: "cute", caption: "Too happy to contain the excitement!" },
    { id: 3, emoji: "😾🐱", title: "Angry Cat Girl", category: "funny", caption: "Someone stole my snacks." },
    { id: 4, emoji: "😭🐱", title: "Crying Cat Girl", category: "cute", caption: "Tiny tears, big feelings." },
    { id: 5, emoji: "😴🐱", title: "Sleepy Cat Girl", category: "sleepy", caption: "Five more minutes please..." },
    { id: 6, emoji: "🥰🐱", title: "Love Cat Girl", category: "love", caption: "Sending tiny hugs and hearts." },
    { id: 7, emoji: "😋🐱", title: "Hungry Cat Girl", category: "food", caption: "Where are my strawberries?" },
    { id: 8, emoji: "😂🐱", title: "Laughing Cat Girl", category: "funny", caption: "I cannot stop laughing!" },
    { id: 9, emoji: "😳🐱", title: "Embarrassed Cat Girl", category: "cute", caption: "Please don't look at me..." },
    { id: 10, emoji: "😼🐱", title: "Mischief Cat Girl", category: "funny", caption: "I definitely did not do it." },
    { id: 11, emoji: "🥺🐱", title: "Please Cat Girl", category: "love", caption: "Can I have one tiny hug?" },
    { id: 12, emoji: "💤🐱", title: "Dreamy Cat Girl", category: "sleepy", caption: "Off to dreamland." }
];

const stickerGrid = document.getElementById("stickerGrid");
const favoriteGrid = document.getElementById("favoriteGrid");

const stickerModal = document.getElementById("stickerModal");
const modalSticker = document.getElementById("modalSticker");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");

const modalFavorite = document.getElementById("modalFavorite");
const modalSave = document.getElementById("modalSave");

const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

const randomSticker = document.getElementById("randomSticker");

let favorites = JSON.parse(
    localStorage.getItem("purrfectFavorites") || "[]"
);

let currentSticker = null;
let currentCategory = "all";


/* =========================
   SAVE FAVORITES
========================= */

function saveFavorites() {
    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );
}


/* =========================
   CHECK FAVORITE
========================= */

function isFavorite(id) {
    return favorites.includes(id);
}


/* =========================
   CREATE CARD
========================= */

function createStickerCard(sticker) {

    const card = document.createElement("article");

    card.className = "sticker-card";

    card.innerHTML = `
        <div class="sticker-visual">
            <div class="sticker-art">
                ${sticker.emoji}
            </div>
        </div>

        <div class="sticker-details">

            <small>${sticker.category}</small>

            <h3>${sticker.title}</h3>

            <div class="sticker-bottom">

                <button
                    class="view-sticker"
                    data-view="${sticker.id}">
                    👀 View
                </button>

                <button
                    class="card-heart ${isFavorite(sticker.id) ? "active" : ""}"
                    data-favorite="${sticker.id}">
                    ${isFavorite(sticker.id) ? "♥" : "♡"}
                </button>

            </div>

        </div>
    `;

    return card;
}


/* =========================
   SHOW STICKERS
========================= */

function showStickers(list) {

    stickerGrid.innerHTML = "";

    if (!list.length) {

        stickerGrid.innerHTML = `
            <div class="empty-favorites">
                <div>🥺</div>
                <h3>No sticker found</h3>
                <p>Try another search or mood.</p>
            </div>
        `;

        return;
    }

    list.forEach(sticker => {
        stickerGrid.appendChild(
            createStickerCard(sticker)
        );
    });
}


/* =========================
   VIEW STICKER
========================= */

function openSticker(id) {

    const sticker = stickers.find(
        item => item.id === id
    );

    if (!sticker) return;

    currentSticker = sticker;

    modalSticker.textContent = sticker.emoji;
    modalCategory.textContent = sticker.category;
    modalTitle.textContent = sticker.title;
    modalCaption.textContent = sticker.caption;

    updateModalFavorite();

    stickerModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================
   MODAL FAVORITE BUTTON
========================= */

function updateModalFavorite() {

    if (!currentSticker) return;

    if (isFavorite(currentSticker.id)) {

        modalFavorite.textContent =
            "♥ Saved to favorites";

    } else {

        modalFavorite.textContent =
            "♡ Save to favorites";
    }
}


/* =========================
   TOGGLE FAVORITE
========================= */

function toggleFavorite(id) {

    if (isFavorite(id)) {

        favorites = favorites.filter(
            favoriteId => favoriteId !== id
        );

        showToast("Removed from favorites 💕");

    } else {

        favorites.push(id);

        showToast("Added to favorites ❤️");
    }

    saveFavorites();

    showStickers(getFilteredStickers());

    showFavorites();

    updateModalFavorite();
}


/* =========================
   STICKER CLICK EVENTS
========================= */

stickerGrid.addEventListener("click", function(event) {

    const viewButton =
        event.target.closest("[data-view]");

    const favoriteButton =
        event.target.closest("[data-favorite]");

    if (viewButton) {

        openSticker(
            Number(viewButton.dataset.view)
        );

        return;
    }

    if (favoriteButton) {

        toggleFavorite(
            Number(
                favoriteButton.dataset.favorite
            )
        );
    }

});


/* =========================
   FAVORITES
========================= */

function showFavorites() {

    favoriteGrid.innerHTML = "";

    if (!favorites.length) {

        favoriteGrid.innerHTML = `
            <div class="empty-favorites">
                <div>🥺</div>
                <h3>Nothing here yet</h3>
                <p>
                    Tap the heart on a sticker
                    to keep it here.
                </p>
            </div>
        `;

        return;
    }

    favorites.forEach(id => {

        const sticker = stickers.find(
            item => item.id === id
        );

        if (sticker) {

            favoriteGrid.appendChild(
                createStickerCard(sticker)
            );
        }
    });
}


/* =========================
   FAVORITE CARD EVENTS
========================= */

favoriteGrid.addEventListener("click", function(event) {

    const viewButton =
        event.target.closest("[data-view]");

    const favoriteButton =
        event.target.closest("[data-favorite]");

    if (viewButton) {

        openSticker(
            Number(viewButton.dataset.view)
        );

    }

    if (favoriteButton) {

        toggleFavorite(
            Number(
                favoriteButton.dataset.favorite
            )
        );

    }

});


/* =========================
   MODAL FAVORITE
========================= */

modalFavorite.addEventListener(
    "click",
    function() {

        if (!currentSticker) return;

        toggleFavorite(currentSticker.id);

    }
);


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

    stickerModal.classList.remove("show");

    document.body.style.overflow = "";

}

document.getElementById("modalClose")
    ?.addEventListener("click", closeModal);

document.getElementById("modalCloseButton")
    ?.addEventListener("click", closeModal);


/* =========================
   SEARCH
========================= */

function openSearch() {

    searchPanel.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
        searchInput.focus();
    }, 100);
}

function closeSearch() {

    searchPanel.classList.remove("show");

    document.body.style.overflow = "";

}

document.getElementById("searchOpen")
    ?.addEventListener("click", openSearch);

document.getElementById("searchOpenTwo")
    ?.addEventListener("click", openSearch);

document.getElementById("searchClose")
    ?.addEventListener("click", closeSearch);

document.getElementById("searchCloseButton")
    ?.addEventListener("click", closeSearch);


/* =========================
   SEARCH FILTER
========================= */

searchInput.addEventListener(
    "input",
    function() {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();

        if (!value) {

            showStickers(
                getFilteredStickers()
            );

            return;
        }

        const results = stickers.filter(
            sticker =>
                sticker.title
                    .toLowerCase()
                    .includes(value) ||

                sticker.category
                    .toLowerCase()
                    .includes(value) ||

                sticker.caption
                    .toLowerCase()
                    .includes(value)
        );

        showStickers(results);

    }
);


/* =========================
   CATEGORY
========================= */

function getFilteredStickers() {

    if (currentCategory === "all") {
        return stickers;
    }

    return stickers.filter(
        sticker =>
            sticker.category === currentCategory
    );
}


function selectCategory(category) {

    currentCategory = category;

    showStickers(
        getFilteredStickers()
    );
}


/* =========================
   MOODS
========================= */

document
    .querySelectorAll(".mood-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".mood-card")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                this.classList.add("active");

                selectCategory(
                    this.dataset.category
                );

                document
                    .getElementById("stickers")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================
   PACKS
========================= */

document
    .querySelectorAll(".pack-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                selectCategory(
                    this.dataset.category
                );

                document
                    .getElementById("stickers")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================
   RANDOM
========================= */

function randomPick() {

    const sticker =
        stickers[
            Math.floor(
                Math.random() *
                stickers.length
            )
        ];

    randomSticker.textContent =
        sticker.emoji;

    randomSticker.style.transform =
        "scale(.7) rotate(-10deg)";

    setTimeout(() => {

        randomSticker.style.transform =
            "scale(1) rotate(0deg)";

    }, 200);

    openSticker(sticker.id);
}


document.getElementById("surpriseHero")
    ?.addEventListener(
        "click",
        randomPick
    );

document.getElementById("surpriseButton")
    ?.addEventListener(
        "click",
        randomPick
    );


/* =========================
   MOBILE MENU
========================= */

const mobileMenu =
    document.getElementById("mobileMenu");

document.getElementById("menuToggle")
    ?.addEventListener("click", () => {

        mobileMenu.classList.add("open");

    });

document.getElementById("mobileClose")
    ?.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {
                mobileMenu.classList.remove("open");
            }
        );

    });


/* =========================
   SAVE BUTTON
========================= */

modalSave.addEventListener(
    "click",
    function() {

        if (!currentSticker) return;

        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="500"
             height="500"
             viewBox="0 0 500 500">

            <rect
                width="500"
                height="500"
                rx="100"
                fill="#fff0f7"/>

            <text
                x="250"
                y="290"
                text-anchor="middle"
                font-size="150">
                ${currentSticker.emoji}
            </text>

        </svg>
        `;

        const blob =
            new Blob(
                [svg],
                { type: "image/svg+xml" }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            currentSticker.title
                .replaceAll(" ", "-")
                .toLowerCase() +
            ".svg";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

        showToast("Sticker saved ✨");

    }
);


/* =========================
   TOAST
========================= */

function showToast(message) {

    let toast =
        document.querySelector(".purrfect-toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "purrfect-toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

}


/* =========================
   ESC KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();
            closeSearch();

        }

    }
);


/* =========================
   START
========================= */

showStickers(stickers);
showFavorites();

