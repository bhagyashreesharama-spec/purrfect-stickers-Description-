// 🐾 PURRFECT STICKERS
// Final interactive JavaScript


/* =========================================
   STICKER DATA
========================================= */

const stickers = [

    {
        id: 1,
        emoji: "🐱",
        title: "Tiny Cat",
        category: "cute",
        caption: "A tiny little cat for your tiny little mood."
    },

    {
        id: 2,
        emoji: "🐰",
        title: "Bunny",
        category: "cute",
        caption: "Soft, fluffy and ready for a hug."
    },

    {
        id: 3,
        emoji: "🐻",
        title: "Teddy",
        category: "cute",
        caption: "Sending you a warm teddy hug."
    },

    {
        id: 4,
        emoji: "🐸",
        title: "Happy Frog",
        category: "funny",
        caption: "No thoughts. Just happy frog energy."
    },

    {
        id: 5,
        emoji: "😹",
        title: "Laughing Cat",
        category: "funny",
        caption: "When something is way too funny."
    },

    {
        id: 6,
        emoji: "🐥",
        title: "Little Chick",
        category: "cute",
        caption: "A tiny sunshine friend."
    },

    {
        id: 7,
        emoji: "😴",
        title: "Sleepy Kitty",
        category: "sleepy",
        caption: "Do not disturb. Tiny nap in progress."
    },

    {
        id: 8,
        emoji: "🦥",
        title: "Lazy Friend",
        category: "sleepy",
        caption: "Today is officially a doing-nothing day."
    },

    {
        id: 9,
        emoji: "💕",
        title: "Love Bunny",
        category: "love",
        caption: "Sending a pocket-sized amount of love."
    },

    {
        id: 10,
        emoji: "🐻‍❄️",
        title: "Cuddle Bear",
        category: "love",
        caption: "Emergency cuddle delivery."
    },

    {
        id: 11,
        emoji: "🍓",
        title: "Strawberry",
        category: "food",
        caption: "Sweet little strawberry happiness."
    },

    {
        id: 12,
        emoji: "🍰",
        title: "Cake",
        category: "food",
        caption: "Because every mood deserves cake."
    },

    {
        id: 13,
        emoji: "🍩",
        title: "Donut",
        category: "food",
        caption: "A donut a day keeps sadness away."
    },

    {
        id: 14,
        emoji: "🐼",
        title: "Panda",
        category: "cute",
        caption: "Just a panda having a peaceful day."
    },

    {
        id: 15,
        emoji: "🦊",
        title: "Little Fox",
        category: "cute",
        caption: "Cute little fox reporting for duty."
    },

    {
        id: 16,
        emoji: "🐣",
        title: "Baby Bird",
        category: "cute",
        caption: "Small bird. Big personality."
    }

];


/* =========================================
   ELEMENTS
========================================= */

const stickerGrid =
    document.getElementById("stickerGrid");

const favoriteGrid =
    document.getElementById("favoriteGrid");

const searchPanel =
    document.getElementById("searchPanel");

const searchInput =
    document.getElementById("searchInput");

const stickerModal =
    document.getElementById("stickerModal");

const modalSticker =
    document.getElementById("modalSticker");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalCaption =
    document.getElementById("modalCaption");

const randomSticker =
    document.getElementById("randomSticker");

const mobileMenu =
    document.getElementById("mobileMenu");


/* =========================================
   FAVORITES
========================================= */

let favorites =
    JSON.parse(localStorage.getItem("purrfectFavorites")) || [];


function saveFavorites() {

    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================================
   CREATE STICKER CARD
========================================= */

function createStickerCard(sticker) {

    const isFavorite =
        favorites.includes(sticker.id);

    const card =
        document.createElement("article");

    card.className = "sticker-card";

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
                    👀 View
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
                    No tiny sticker found
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
   VIEW STICKER
========================================= */

function openSticker(id) {

    const sticker =
        stickers.find(item => item.id === id);

    if (!sticker) return;


    modalSticker.textContent =
        sticker.emoji;

    modalCategory.textContent =
        sticker.category;

    modalTitle.textContent =
        sticker.title;

    modalCaption.textContent =
        sticker.caption;


    stickerModal.classList.add("show");

    document.body.style.overflow = "hidden";


    const modalFavorite =
        document.getElementById("modalFavorite");

    modalFavorite.textContent =
        favorites.includes(id)
            ? "♥ Saved"
            : "♡ Save to favorites";


    modalFavorite.onclick = () => {

        toggleFavorite(id);

        modalFavorite.textContent =
            favorites.includes(id)
                ? "♥ Saved"
                : "♡ Save to favorites";

    };

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeStickerModal() {

    stickerModal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================
   FAVORITE TOGGLE
========================================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

        showToast("Removed from favorites 💕");

    } else {

        favorites.push(id);

        showToast("Saved to your little collection ❤️");

    }


    saveFavorites();

    showStickers(
        getCurrentStickerList()
    );

    showFavorites();

}


/* =========================================
   CURRENT FILTER
========================================= */

let currentCategory = "all";


function getCurrentStickerList() {

    if (currentCategory === "all") {

        return stickers;

    }

    return stickers.filter(
        sticker =>
            sticker.category === currentCategory
    );

}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(category) {

    currentCategory = category;

    showStickers(
        getCurrentStickerList()
    );

}


/* =========================================
   MOOD BUTTONS
========================================= */

const moodButtons =
    document.querySelectorAll(".mood-card");


moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        moodButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;

        filterCategory(category);


        document
            .getElementById("stickers")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   PACK BUTTONS
========================================= */

const packButtons =
    document.querySelectorAll(".pack-card");


packButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.category;


        moodButtons.forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.category === category
            );

        });


        filterCategory(category);


        document
            .getElementById("stickers")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   STICKER GRID EVENTS
========================================= */

stickerGrid.addEventListener(
    "click",
    event => {

        const viewButton =
            event.target.closest(
                "[data-view]"
            );

        const favoriteButton =
            event.target.closest(
                "[data-favorite]"
            );


        if (viewButton) {

            openSticker(
                Number(
                    viewButton.dataset.view
                )
            );

        }


        if (favoriteButton) {

            toggleFavorite(
                Number(
                    favoriteButton.dataset.favorite
                )
            );

        }

    }
);


/* =========================================
   FAVORITES SECTION
========================================= */

function showFavorites() {

    favoriteGrid.innerHTML = "";


    if (favorites.length === 0) {

        favoriteGrid.innerHTML = `

            <div class="empty-favorites">

                <div>🥺</div>

                <h3>
                    Nothing here yet
                </h3>

                <p>
                    Tap the heart on a sticker
                    to keep it here.
                </p>

            </div>

        `;

        return;
    }


    favorites.forEach(id => {

        const sticker =
            stickers.find(
                item => item.id === id
            );

        if (!sticker) return;


        favoriteGrid.appendChild(
            createStickerCard(sticker)
        );

    });

}


/* =========================================
   FAVORITE GRID EVENTS
========================================= */

favoriteGrid.addEventListener(
    "click",
    event => {

        const viewButton =
            event.target.closest(
                "[data-view]"
            );

        const favoriteButton =
            event.target.closest(
                "[data-favorite]"
            );


        if (viewButton) {

            openSticker(
                Number(
                    viewButton.dataset.view
                )
            );

        }


        if (favoriteButton) {

            toggleFavorite(
                Number(
                    favoriteButton.dataset.favorite
                )
            );

        }

    }
);


/* =========================================
   SEARCH PANEL
========================================= */

function openSearch() {

    searchPanel.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        searchInput.focus();

    }, 150);

}


function closeSearch() {

    searchPanel.classList.remove("show");

    document.body.style.overflow = "";

}


document
    .getElementById("searchOpen")
    ?.addEventListener(
        "click",
        openSearch
    );


document
    .getElementById("searchOpenTwo")
    ?.addEventListener(
        "click",
        openSearch
    );


document
    .getElementById("searchClose")
    ?.addEventListener(
        "click",
        closeSearch
    );


document
    .getElementById("searchCloseButton")
    ?.addEventListener(
        "click",
        closeSearch
    );


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!value) {

            showStickers(
                getCurrentStickerList()
            );

            return;

        }


        const results =
            stickers.filter(sticker =>

                sticker.title
                    .toLowerCase()
                    .includes(value)

                ||

                sticker.category
                    .toLowerCase()
                    .includes(value)

                ||

                sticker.caption
                    .toLowerCase()
                    .includes(value)

                ||

                sticker.emoji
                    .includes(value)

            );


        showStickers(results);

    }
);


/* =========================================
   MODAL CLOSE
========================================= */

document
    .getElementById("modalClose")
    ?.addEventListener(
        "click",
        closeStickerModal
    );


document
    .getElementById("modalCloseButton")
    ?.addEventListener(
        "click",
        closeStickerModal
    );


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeStickerModal();

            closeSearch();

        }

    }
);


/* =========================================
   SAVE BUTTON
========================================= */

document
    .getElementById("modalSave")
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "Sticker saved! ✨"
            );

        }
    );


/* =========================================
   RANDOM STICKER
========================================= */

function pickRandomSticker() {

    const random =
        stickers[
            Math.floor(
                Math.random() *
                stickers.length
            )
        ];


    randomSticker.style.transform =
        "scale(.6) rotate(-15deg)";


    setTimeout(() => {

        randomSticker.textContent =
            random.emoji;

        randomSticker.style.transform =
            "scale(1) rotate(0)";

    }, 200);


    showToast(
        `The cat chose ${random.title} 🐾`
    );

}


/* HERO SURPRISE */

document
    .getElementById("surpriseHero")
    ?.addEventListener(
        "click",
        pickRandomSticker
    );


/* MAIN SURPRISE */

document
    .getElementById("surpriseButton")
    ?.addEventListener(
        "click",
        pickRandomSticker
    );


/* =========================================
   MOBILE MENU
========================================= */

document
    .getElementById("menuToggle")
    ?.addEventListener(
        "click",
        () => {

            mobileMenu.classList.add("open");

        }
    );


document
    .getElementById("mobileClose")
    ?.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove("open");

        }
    );


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    let toast =
        document.querySelector(".purrfect-toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "purrfect-toast";


        toast.style.position = "fixed";
        toast.style.left = "50%";
        toast.style.bottom = "25px";
        toast.style.transform =
            "translate(-50%, 100px)";
        toast.style.background =
            "#392631";
        toast.style.color =
            "white";
        toast.style.padding =
            "13px 20px";
        toast.style.borderRadius =
            "15px";
        toast.style.fontWeight =
            "700";
        toast.style.zIndex =
            "9999";
        toast.style.transition =
            ".3s";


        document.body.appendChild(toast);

    }


    toast.textContent = message;


    requestAnimationFrame(() => {

        toast.style.transform =
            "translate(-50%, 0)";

    });


    clearTimeout(
        toast.hideTimer
    );


    toast.hideTimer =
        setTimeout(() => {

            toast.style.transform =
                "translate(-50%, 100px)";

        }, 2200);

}


/* =========================================
   INITIAL LOAD
========================================= */

showStickers(stickers);

showFavorites();


console.log(
    "🐾 Purrfect Stickers is ready!"
);

