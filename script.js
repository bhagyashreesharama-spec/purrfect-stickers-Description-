/* =========================================
   🐾 PURRFECT STICKERS
   STEP 4 — ALL INTERACTIONS
========================================= */


/* =========================================
   STICKER DATA
========================================= */

const stickers = [
    {
        id: 1,
        emoji: "😺",
        title: "Happy Cat",
        caption: "A tiny happy face for a happy day.",
        category: "cute"
    },
    {
        id: 2,
        emoji: "🥺",
        title: "Baby Cat",
        caption: "Too cute to ignore. 🥺",
        category: "cute"
    },
    {
        id: 3,
        emoji: "😹",
        title: "Laughing Cat",
        caption: "When you try not to laugh but fail.",
        category: "funny"
    },
    {
        id: 4,
        emoji: "😂🐱",
        title: "Chaos Cat",
        caption: "Everything is fine. Probably.",
        category: "funny"
    },
    {
        id: 5,
        emoji: "😴",
        title: "Sleepy Cat",
        caption: "Currently unavailable. Taking a nap.",
        category: "sleepy"
    },
    {
        id: 6,
        emoji: "💤🐱",
        title: "Nap Cat",
        caption: "Five more minutes... maybe five hours.",
        category: "sleepy"
    },
    {
        id: 7,
        emoji: "😻",
        title: "Love Cat",
        caption: "Sending tiny paws and big hugs.",
        category: "love"
    },
    {
        id: 8,
        emoji: "🥰🐱",
        title: "Cuddle Cat",
        caption: "Emergency cat hug incoming.",
        category: "love"
    },
    {
        id: 9,
        emoji: "💻😸",
        title: "Coding Cat",
        caption: "Just one more bug...",
        category: "coding"
    },
    {
        id: 10,
        emoji: "👩‍💻🐱",
        title: "Developer Cat",
        caption: "Coffee, code and confused cats.",
        category: "coding"
    },
    {
        id: 11,
        emoji: "😼",
        title: "Sneaky Cat",
        caption: "I definitely know something you don't.",
        category: "meme"
    },
    {
        id: 12,
        emoji: "🙀",
        title: "Shocked Cat",
        caption: "Wait... WHAT JUST HAPPENED?!",
        category: "meme"
    }
];


/* =========================================
   ELEMENTS
========================================= */

const stickerGrid = document.getElementById("stickerGrid");
const favoriteGrid = document.getElementById("favoriteGrid");

const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const openSearch = document.getElementById("openSearch");
const openSearchTwo = document.getElementById("openSearchTwo");
const searchClose = document.getElementById("searchClose");
const searchBackdrop = document.getElementById("searchBackdrop");

const stickerModal = document.getElementById("stickerModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalSticker = document.getElementById("modalSticker");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");

const modalFavorite = document.getElementById("modalFavorite");
const modalSave = document.getElementById("modalSave");

const randomBtn = document.getElementById("randomBtn");
const heroSurprise = document.getElementById("heroSurprise");
const randomResult = document.getElementById("randomResult");

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");


/* =========================================
   FAVORITES
========================================= */

let favorites = JSON.parse(
    localStorage.getItem("purrfectFavorites")
) || [];

let currentSticker = null;


/* =========================================
   CREATE STICKER CARD
========================================= */

function createStickerCard(sticker) {

    const card = document.createElement("article");

    card.className = "sticker-card";

    const isFavorite = favorites.includes(sticker.id);

    card.innerHTML = `
        <div class="sticker-visual">

            <div class="sticker-art">
                ${sticker.emoji}
            </div>

        </div>

        <div class="sticker-details">

            <small>
                ${sticker.category}
            </small>

            <h3>
                ${sticker.title}
            </h3>

            <div class="sticker-bottom">

                <button
                    class="view-sticker"
                    data-view="${sticker.id}"
                >
                    View ✨
                </button>

                <button
                    class="card-heart ${isFavorite ? "active" : ""}"
                    data-favorite="${sticker.id}"
                    aria-label="Favorite"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

            </div>

        </div>
    `;

    return card;
}


/* =========================================
   SHOW STICKERS
========================================= */

function showStickers(list) {

    stickerGrid.innerHTML = "";

    if (list.length === 0) {

        stickerGrid.innerHTML = `
            <div class="empty-favorites">

                <div>🥺</div>

                <h3>
                    No tiny cats found!
                </h3>

                <p>
                    Try another mood or search.
                </p>

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


/* =========================================
   INITIAL DISPLAY
========================================= */

showStickers(stickers);


/* =========================================
   MOOD FILTER
========================================= */

const moodCards =
    document.querySelectorAll(".mood-card");

moodCards.forEach(card => {

    card.addEventListener("click", () => {

        moodCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

        const category =
            card.dataset.category;

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

        document
            .getElementById("collection")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   PACK FILTER
========================================= */

const packCards =
    document.querySelectorAll(".pack-card");

packCards.forEach(pack => {

    pack.addEventListener("click", () => {

        const category =
            pack.dataset.category;

        const filtered =
            stickers.filter(
                sticker =>
                    sticker.category === category
            );

        showStickers(filtered);

        document
            .getElementById("collection")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   CARD BUTTONS
========================================= */

stickerGrid.addEventListener("click", event => {

    const viewButton =
        event.target.closest("[data-view]");

    const favoriteButton =
        event.target.closest("[data-favorite]");


    /* VIEW */

    if (viewButton) {

        const id =
            Number(viewButton.dataset.view);

        const sticker =
            stickers.find(item => item.id === id);

        if (sticker) {
            openStickerModal(sticker);
        }

    }


    /* FAVORITE */

    if (favoriteButton) {

        const id =
            Number(favoriteButton.dataset.favorite);

        toggleFavorite(id);

    }

});


/* =========================================
   FAVORITE FUNCTION
========================================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId => favoriteId !== id
            );

        showToast("Removed from favorites 💕");

    } else {

        favorites.push(id);

        showToast("Added to favorites ❤️");

    }

    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );

    showStickers(getCurrentStickerList());

    renderFavorites();

}


/* =========================================
   CURRENT FILTER / SEARCH
========================================= */

function getCurrentStickerList() {

    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";

    let result = stickers;

    const activeMood =
        document.querySelector(".mood-card.active");

    if (
        activeMood &&
        activeMood.dataset.category !== "all"
    ) {

        result =
            result.filter(
                sticker =>
                    sticker.category ===
                    activeMood.dataset.category
            );
    }

    if (search) {

        result =
            result.filter(sticker =>

                sticker.title
                    .toLowerCase()
                    .includes(search) ||

                sticker.caption
                    .toLowerCase()
                    .includes(search) ||

                sticker.category
                    .toLowerCase()
                    .includes(search)
            );
    }

    return result;
}


/* =========================================
   SEARCH
========================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            showStickers(
                getCurrentStickerList()
            );

        }
    );

}


/* =========================================
   SEARCH POPUP
========================================= */

function openSearchPanel() {

    searchPanel.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        searchInput.focus();

    }, 150);

}


function closeSearchPanel() {

    searchPanel.classList.remove("show");

    document.body.style.overflow = "";

}


if (openSearch) {
    openSearch.addEventListener(
        "click",
        openSearchPanel
    );
}


if (openSearchTwo) {
    openSearchTwo.addEventListener(
        "click",
        openSearchPanel
    );
}


if (searchClose) {
    searchClose.addEventListener(
        "click",
        closeSearchPanel
    );
}


if (searchBackdrop) {
    searchBackdrop.addEventListener(
        "click",
        closeSearchPanel
    );
}


/* =========================================
   STICKER MODAL
========================================= */

function openStickerModal(sticker) {

    currentSticker = sticker;

    modalSticker.textContent =
        sticker.emoji;

    modalCategory.textContent =
        sticker.category;

    modalTitle.textContent =
        sticker.title;

    modalCaption.textContent =
        sticker.caption;

    updateModalFavorite();

    stickerModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeStickerModal() {

    stickerModal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeStickerModal
);


modalBackdrop.addEventListener(
    "click",
    closeStickerModal
);


/* =========================================
   MODAL FAVORITE
========================================= */

function updateModalFavorite() {

    if (!currentSticker) return;

    const liked =
        favorites.includes(currentSticker.id);

    modalFavorite.textContent =
        liked
            ? "♥ Favorited"
            : "❤️ Favorite";

}


modalFavorite.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;

        toggleFavorite(
            currentSticker.id
        );

        updateModalFavorite();

    }
);


/* =========================================
   SAVE BUTTON
========================================= */

modalSave.addEventListener(
    "click",
    () => {

        showToast(
            "Sticker saved in your tiny collection ✨"
        );

    }
);


/* =========================================
   RANDOM CAT
========================================= */

function pickRandomCat() {

    const randomIndex =
        Math.floor(
            Math.random() * stickers.length
        );

    const sticker =
        stickers[randomIndex];

    randomResult.textContent =
        sticker.emoji;

    randomResult.style.animation = "none";

    void randomResult.offsetWidth;

    randomResult.style.animation =
        "stickerPop 0.5s ease";

    setTimeout(() => {

        openStickerModal(sticker);

    }, 450);

}


if (randomBtn) {

    randomBtn.addEventListener(
        "click",
        pickRandomCat
    );

}


if (heroSurprise) {

    heroSurprise.addEventListener(
        "click",
        pickRandomCat
    );

}


/* =========================================
   FAVORITES SECTION
========================================= */

function renderFavorites() {

    favoriteGrid.innerHTML = "";

    if (favorites.length === 0) {

        favoriteGrid.innerHTML = `
            <div class="empty-favorites">

                <div>🥺</div>

                <h3>
                    Your favorite corner is empty.
                </h3>

                <p>
                    Tap the ♡ on any sticker to keep it here.
                </p>

            </div>
        `;

        return;
    }


    const favoriteStickers =
        stickers.filter(
            sticker =>
                favorites.includes(sticker.id)
        );


    favoriteStickers.forEach(
        sticker => {

            favoriteGrid.appendChild(
                createStickerCard(sticker)
            );

        }
    );

}


renderFavorites();


/* =========================================
   FAVORITE GRID BUTTONS
========================================= */

favoriteGrid.addEventListener(
    "click",
    event => {

        const viewButton =
            event.target.closest("[data-view]");

        const favoriteButton =
            event.target.closest("[data-favorite]");


        if (viewButton) {

            const id =
                Number(viewButton.dataset.view);

            const sticker =
                stickers.find(
                    item => item.id === id
                );

            if (sticker) {
                openStickerModal(sticker);
            }

        }


        if (favoriteButton) {

            const id =
                Number(
                    favoriteButton.dataset.favorite
                );

            toggleFavorite(id);

        }

    }
);


/* =========================================
   MOBILE MENU
========================================= */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileMenu.classList.add("open");

            document.body.style.overflow =
                "hidden";

        }
    );

}


if (mobileClose) {

    mobileClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


function closeMobileMenu() {

    mobileMenu.classList.remove("open");

    document.body.style.overflow = "";

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchPanel();
            closeStickerModal();
            closeMobileMenu();

        }

    }
);


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    let toast =
        document.getElementById("purrToast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "purrToast";

        toast.style.position = "fixed";
        toast.style.left = "50%";
        toast.style.bottom = "25px";
        toast.style.transform =
            "translate(-50%, 100px)";
        toast.style.opacity = "0";
        toast.style.zIndex = "9999";
        toast.style.padding = "13px 20px";
        toast.style.borderRadius = "15px";
        toast.style.background = "#34232d";
        toast.style.color = "#ffffff";
        toast.style.fontWeight = "700";
        toast.style.transition =
            "0.3s ease";
        toast.style.boxShadow =
            "0 15px 35px rgba(0,0,0,0.15)";

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    clearTimeout(toastTimer);

    requestAnimationFrame(() => {

        toast.style.transform =
            "translate(-50%, 0)";

        toast.style.opacity = "1";

    });


    toastTimer =
        setTimeout(() => {

            toast.style.transform =
                "translate(-50%, 100px)";

            toast.style.opacity = "0";

        }, 2200);

}


/* =========================================
   DONE 🐾
========================================= */

console.log(
    "🐾 Purrfect Stickers is ready!"
);
