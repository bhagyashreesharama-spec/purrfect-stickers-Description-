```javascript
/* =========================================================
   PURRFECT STICKERS
   Main JavaScript
========================================================= */


/* =========================================================
   1. STICKER DATA
========================================================= */

const stickers = [

    {
        id: 1,
        title: "Please Feed Me",
        category: "cute",
        caption: "I have been starving for approximately 3 minutes. 🥺",
        emoji: "🥺🐱"
    },

    {
        id: 2,
        title: "Tiny Happiness",
        category: "cute",
        caption: "Just a little cat having a very good day. 💕",
        emoji: "😽🐾"
    },

    {
        id: 3,
        title: "What?!",
        category: "funny",
        caption: "When someone says something completely unexpected.",
        emoji: "😳🐱"
    },

    {
        id: 4,
        title: "Bro...",
        category: "meme",
        caption: "There are no words. Just bro...",
        emoji: "🐱💀"
    },

    {
        id: 5,
        title: "Suspicious Cat",
        category: "meme",
        caption: "I am watching you. 👀",
        emoji: "🤨🐱"
    },

    {
        id: 6,
        title: "Tiny Rage",
        category: "angry",
        caption: "Small body. Extremely large anger.",
        emoji: "😾🔥"
    },

    {
        id: 7,
        title: "Do Not Disturb",
        category: "angry",
        caption: "Come back after I have calmed down.",
        emoji: "😼💢"
    },

    {
        id: 8,
        title: "Five More Minutes",
        category: "sleepy",
        caption: "Five more minutes means five more hours.",
        emoji: "😴🐱"
    },

    {
        id: 9,
        title: "Sleep Mode",
        category: "sleepy",
        caption: "Currently unavailable. Try tomorrow.",
        emoji: "💤🐈"
    },

    {
        id: 10,
        title: "Love You",
        category: "love",
        caption: "Sending a whole truckload of cat love. 💕",
        emoji: "🥰🐱"
    },

    {
        id: 11,
        title: "Heart Eyes",
        category: "love",
        caption: "When the cuteness is simply too much.",
        emoji: "😍🐾"
    },

    {
        id: 12,
        title: "Feed Me Again",
        category: "food",
        caption: "That snack was approximately two seconds ago.",
        emoji: "🍕🐱"
    },

    {
        id: 13,
        title: "Snack Time",
        category: "food",
        caption: "Everything is better with snacks.",
        emoji: "😋🐾"
    },

    {
        id: 14,
        title: "Coding Cat",
        category: "coding",
        caption: "Writing code. Breaking code. Fixing code.",
        emoji: "💻🐱"
    },

    {
        id: 15,
        title: "404 Motivation",
        category: "coding",
        caption: "Motivation not found. Please try again.",
        emoji: "💻💀"
    },

    {
        id: 16,
        title: "Deadline Cat",
        category: "coding",
        caption: "Everything is fine. The deadline is tomorrow.",
        emoji: "😰💻"
    },

    {
        id: 17,
        title: "Cool Cat",
        category: "funny",
        caption: "Too cool to explain myself.",
        emoji: "😎🐱"
    },

    {
        id: 18,
        title: "Brain Loading",
        category: "funny",
        caption: "Please wait while my brain loads.",
        emoji: "🌀🐱"
    },

    {
        id: 19,
        title: "Drama Cat",
        category: "meme",
        caption: "Everything is a dramatic event.",
        emoji: "😭🐱"
    },

    {
        id: 20,
        title: "Good Night",
        category: "sleepy",
        caption: "Go to sleep. The cats have spoken. 🌙",
        emoji: "🌙🐱"
    },

    {
        id: 21,
        title: "Happy Cat",
        category: "cute",
        caption: "Today is officially a happy cat day!",
        emoji: "😸✨"
    },

    {
        id: 22,
        title: "Big Hug",
        category: "love",
        caption: "Emergency cat hug incoming!",
        emoji: "🤗🐱"
    },

    {
        id: 23,
        title: "Hungry Again",
        category: "food",
        caption: "I ate already. But I can eat again.",
        emoji: "🍔🐱"
    },

    {
        id: 24,
        title: "Nope",
        category: "angry",
        caption: "Absolutely not. Try another cat.",
        emoji: "🙅🐱"
    }

];


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const gallery = document.getElementById("stickerGallery");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const searchInput =
    document.getElementById("searchInput");

const randomStickerBtn =
    document.getElementById("randomStickerBtn");

const randomStickerBtn2 =
    document.getElementById("randomStickerBtn2");

const randomResult =
    document.getElementById("randomResult");

const favoriteGallery =
    document.getElementById("favoriteGallery");

const favoriteCount =
    document.getElementById("favoriteCount");

const modal =
    document.getElementById("stickerModal");

const modalSticker =
    document.getElementById("modalSticker");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalCaption =
    document.getElementById("modalCaption");

const closeModal =
    document.getElementById("closeModal");

const modalOverlay =
    document.querySelector(".modal-overlay");

const downloadSticker =
    document.getElementById("downloadSticker");

const clearSearch =
    document.getElementById("clearSearch");

const noResults =
    document.getElementById("noResults");

const resetSearchBtn =
    document.getElementById("resetSearchBtn");

const menuBtn =
    document.querySelector(".menu-btn");

const navbar =
    document.querySelector(".navbar");

const pageLoader =
    document.querySelector(".page-loader");

const heroRandomBtn =
    document.getElementById("heroRandomBtn");


/* =========================================================
   3. APP STATE
========================================================= */

let currentCategory = "all";

let currentSearch = "";

let currentSticker = null;

let favorites =
    JSON.parse(localStorage.getItem("purrfectFavorites")) || [];


/* =========================================================
   4. CREATE STICKER CARD
========================================================= */

function createStickerCard(sticker) {

    const isFavorite =
        favorites.includes(sticker.id);

    const card =
        document.createElement("article");

    card.className = "sticker-card";

    card.dataset.id = sticker.id;

    card.dataset.category =
        sticker.category;


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
                    type="button"
                    class="preview-btn"
                    data-action="preview"
                >
                    👀 View
                </button>

                <button
                    type="button"
                    class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
                    data-action="favorite"
                >
                    ${isFavorite ? "❤️ Saved" : "♡ Favorite"}
                </button>

                <button
                    type="button"
                    class="download-card-btn"
                    data-action="download"
                >
                    ⬇️ Save
                </button>

            </div>

        </div>

    `;


    return card;
}


/* =========================================================
   5. DISPLAY STICKERS
========================================================= */

function displayStickers(list = stickers) {

    gallery.innerHTML = "";

    if (list.length === 0) {

        noResults.hidden = false;

        return;

    }

    noResults.hidden = true;


    const fragment =
        document.createDocumentFragment();


    list.forEach(sticker => {

        fragment.appendChild(
            createStickerCard(sticker)
        );

    });


    gallery.appendChild(fragment);

}


/* =========================================================
   6. FILTER STICKERS
========================================================= */

function filterStickers() {

    let filtered =
        [...stickers];


    if (currentCategory !== "all") {

        filtered =
            filtered.filter(sticker =>
                sticker.category === currentCategory
            );

    }


    if (currentSearch.trim() !== "") {

        const search =
            currentSearch.toLowerCase().trim();


        filtered =
            filtered.filter(sticker =>

                sticker.title
                    .toLowerCase()
                    .includes(search)

                ||

                sticker.category
                    .toLowerCase()
                    .includes(search)

                ||

                sticker.caption
                    .toLowerCase()
                    .includes(search)

            );

    }


    displayStickers(filtered);

}


/* =========================================================
   7. CATEGORY BUTTONS
========================================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterStickers();

    });

});


/* =========================================================
   8. SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            currentSearch =
                event.target.value;

            filterStickers();

        }
    );

}


/* =========================================================
   9. CLEAR SEARCH
========================================================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            currentSearch = "";

            filterStickers();

            searchInput.focus();

        }
    );

}


/* =========================================================
   10. STICKER GALLERY ACTIONS
========================================================= */

gallery.addEventListener("click", event => {

    const button =
        event.target.closest("button");

    if (!button) return;


    const card =
        event.target.closest(".sticker-card");

    if (!card) return;


    const stickerId =
        Number(card.dataset.id);


    const sticker =
        stickers.find(
            item => item.id === stickerId
        );


    if (!sticker) return;


    const action =
        button.dataset.action;


    if (action === "preview") {

        openModal(sticker);

    }


    if (action === "favorite") {

        toggleFavorite(sticker);

    }


    if (action === "download") {

        showToast(
            "🐱 Sticker download system is ready for real PNG assets!"
        );

    }

});


/* =========================================================
   11. FAVORITES
========================================================= */

function toggleFavorite(sticker) {

    const index =
        favorites.indexOf(sticker.id);


    if (index === -1) {

        favorites.push(sticker.id);

        showToast(
            "❤️ Added to your favorite cats!"
        );

    } else {

        favorites.splice(index, 1);

        showToast(
            "💔 Removed from favorites."
        );

    }


    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );


    updateFavoriteCount();

    filterStickers();

    renderFavorites();

}


/* =========================================================
   12. FAVORITE COUNT
========================================================= */

function updateFavoriteCount() {

    if (favoriteCount) {

        favoriteCount.textContent =
            favorites.length;

    }

}


/* =========================================================
   13. RENDER FAVORITES
========================================================= */

function renderFavorites() {

    favoriteGallery.innerHTML = "";


    if (favorites.length === 0) {

        favoriteGallery.innerHTML = `

            <div class="empty-favorites">

                <div class="empty-cat">
                    🥺
                </div>

                <h3>
                    No favorite cats yet!
                </h3>

                <p>
                    Tap ❤️ on a sticker and it'll appear here.
                </p>

                <a
                    href="#stickers"
                    class="primary-btn"
                >
                    Find Some Cats 🐾
                </a>

            </div>

        `;

        return;

    }


    const favoriteStickers =
        stickers.filter(
            sticker =>
                favorites.includes(sticker.id)
        );


    favoriteStickers.forEach(sticker => {

        favoriteGallery.appendChild(
            createStickerCard(sticker)
        );

    });

}


/* =========================================================
   14. FAVORITE GALLERY ACTIONS
========================================================= */

favoriteGallery.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");

        if (!button) return;


        const card =
            event.target.closest(".sticker-card");

        if (!card) return;


        const stickerId =
            Number(card.dataset.id);


        const sticker =
            stickers.find(
                item => item.id === stickerId
            );


        if (!sticker) return;


        const action =
            button.dataset.action;


        if (action === "preview") {

            openModal(sticker);

        }


        if (action === "favorite") {

            toggleFavorite(sticker);

        }


        if (action === "download") {

            showToast(
                "🐱 Sticker download system is ready for real PNG assets!"
            );

        }

    }
);


/* =========================================================
   15. OPEN MODAL
========================================================= */

function openModal(sticker) {

    currentSticker = sticker;


    modalSticker.innerHTML =
        sticker.emoji;


    modalCategory.textContent =
        sticker.category.toUpperCase();


    modalTitle.textContent =
        sticker.title;


    modalCaption.textContent =
        sticker.caption;


    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );

}


/* =========================================================
   16. CLOSE MODAL
========================================================= */

function closeStickerModal() {

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeStickerModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeStickerModal
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeStickerModal();

        }

    }
);


/* =========================================================
   17. MODAL FAVORITE BUTTON
========================================================= */

const modalFavoriteBtn =
    document.getElementById(
        "modalFavoriteBtn"
    );


if (modalFavoriteBtn) {

    modalFavoriteBtn.addEventListener(
        "click",
        () => {

            if (!currentSticker) return;

            toggleFavorite(
                currentSticker
            );

            updateModalFavoriteButton();

        }
    );

}


function updateModalFavoriteButton() {

    if (!modalFavoriteBtn ||
        !currentSticker) return;


    const saved =
        favorites.includes(
            currentSticker.id
        );


    modalFavoriteBtn.textContent =
        saved
            ? "❤️ Saved"
            : "♡ Add to Favorites";

}


/* =========================================================
   18. RANDOM STICKER
========================================================= */

function getRandomSticker() {

    const randomIndex =
        Math.floor(
            Math.random() * stickers.length
        );


    return stickers[randomIndex];

}


function showRandomSticker() {

    const sticker =
        getRandomSticker();


    currentSticker =
        sticker;


    if (randomResult) {

        randomResult.innerHTML = `

            <div class="random-result-inner">

                <div
                    class="random-sticker-emoji"
                    style="font-size: 100px;"
                >
                    ${sticker.emoji}
                </div>

                <h3>
                    ${sticker.title}
                </h3>

                <p>
                    ${sticker.caption}
                </p>

            </div>

        `;

    }

}


if (randomStickerBtn) {

    randomStickerBtn.addEventListener(
        "click",
        showRandomSticker
    );

}


if (randomStickerBtn2) {

    randomStickerBtn2.addEventListener(
        "click",
        showRandomSticker
    );

}


if (heroRandomBtn) {

    heroRandomBtn.addEventListener(
        "click",
        () => {

            showRandomSticker();

            document
                .querySelector(".random-section")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


/* =========================================================
   19. RESET SEARCH
========================================================= */

if (resetSearchBtn) {

    resetSearchBtn.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            currentSearch = "";

            currentCategory = "all";


            categoryButtons.forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.category === "all"
                    );

                }
            );


            filterStickers();

        }
    );

}


/* =========================================================
   20. MOBILE MENU
========================================================= */

if (menuBtn && navbar) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                navbar.classList.toggle("open");


            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    navbar
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navbar.classList.remove(
                        "open"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   21. TOAST MESSAGE
========================================================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

let toastTimer;


function showToast(message) {

    if (!toast) return;


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);

}


/* =========================================================
   22. DOWNLOAD SUPPORT
========================================================= */

if (downloadSticker) {

    downloadSticker.addEventListener(
        "click",
        () => {

            if (!currentSticker) return;


            showToast(
                "🐾 Real PNG download will activate when we add the sticker images!"
            );

        }
    );

}


/* =========================================================
   23. INITIALIZE
========================================================= */

function initializeApp() {

    displayStickers();

    updateFavoriteCount();

    renderFavorites();


    const heroCount =
        document.getElementById(
            "heroStickerCount"
        );


    if (heroCount) {

        heroCount.textContent =
            `${stickers.length}+`;

    }

}


initializeApp();


/* =========================================================
   24. PAGE LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            if (pageLoader) {

                pageLoader.classList.add(
                    "hide"
                );

            }

        }, 500);

    }
);
```
// ===============================
// PURRFECT STICKERS - JAVASCRIPT
// ===============================

// Sticker Collection
const stickers = [
    {
        emoji: "😺",
        title: "Happy Cat",
        caption: "Me when everything finally works 😂",
        category: "cute"
    },
    {
        emoji: "😹",
        title: "Laughing Cat",
        caption: "I said I wouldn't laugh... but here we are 😭",
        category: "funny"
    },
    {
        emoji: "😼",
        title: "Suspicious Cat",
        caption: "I know what you did... 👀",
        category: "meme"
    },
    {
        emoji: "😾",
        title: "Angry Cat",
        caption: "Don't talk to me right now 😾",
        category: "angry"
    },
    {
        emoji: "😴",
        title: "Sleepy Cat",
        caption: "My only plan today: SLEEP 💤",
        category: "sleepy"
    },
    {
        emoji: "😻",
        title: "Love Cat",
        caption: "Sending you virtual meows 💕",
        category: "love"
    },
    {
        emoji: "😋",
        title: "Hungry Cat",
        caption: "Did someone say food? 🍕",
        category: "food"
    },
    {
        emoji: "😿",
        title: "Sad Cat",
        caption: "Nobody asked if I'm okay 🥺",
        category: "cute"
    },
    {
        emoji: "🙀",
        title: "Shocked Cat",
        caption: "WAIT... WHAT?! 😳",
        category: "funny"
    },
    {
        emoji: "😹",
        title: "Meme Cat",
        caption: "This is fine. Everything is totally fine 💀",
        category: "meme"
    },
    {
        emoji: "😸",
        title: "Coding Cat",
        caption: "Just one more bug... famous last words 💻",
        category: "coding"
    },
    {
        emoji: "🐱",
        title: "Tiny Cat",
        caption: "Small cat. BIG attitude. 🐾",
        category: "cute"
    }
];


// ===============================
// GET HTML ELEMENTS
// ===============================

const gallery = document.getElementById("stickerGallery");
const favoriteGallery = document.getElementById("favoriteGallery");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("stickerModal");
const modalSticker = document.getElementById("modalSticker");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const modalCategory = document.getElementById("modalCategory");

const closeModal = document.getElementById("closeModal");
const downloadSticker = document.getElementById("downloadSticker");


// ===============================
// FAVORITES
// ===============================

let favorites = [];


// ===============================
// SHOW STICKERS
// ===============================

function showStickers(list) {

    gallery.innerHTML = "";

    if (list.length === 0) {
        gallery.innerHTML = `
            <div class="loading-message">
                🥺 No cats found!
                <br>
                Try another search.
            </div>
        `;
        return;
    }

    list.forEach((sticker, index) => {

        const card = document.createElement("div");

        card.className = "sticker-card";

        const isFavorite = favorites.includes(index);

        card.innerHTML = `
            <div class="sticker-image">
                ${sticker.emoji}
            </div>

            <button 
                class="favorite-btn ${isFavorite ? "liked" : ""}"
                onclick="toggleFavorite(${index})"
                aria-label="Favorite"
            >
                ${isFavorite ? "❤️" : "🤍"}
            </button>

            <div class="sticker-info">

                <span class="sticker-category">
                    ${sticker.category}
                </span>

                <h3>${sticker.title}</h3>

                <p>${sticker.caption}</p>

                <button 
                    class="view-btn"
                    onclick="openSticker(${index})"
                >
                    View Sticker 👀
                </button>

            </div>
        `;

        gallery.appendChild(card);
    });
}


// ===============================
// FAVORITE FUNCTION
// ===============================

function toggleFavorite(index) {

    if (favorites.includes(index)) {

        favorites = favorites.filter(
            item => item !== index
        );

    } else {

        favorites.push(index);

    }

    showStickers(stickers);
    showFavorites();
}


// ===============================
// SHOW FAVORITES
// ===============================

function showFavorites() {

    if (favorites.length === 0) {

        favoriteGallery.innerHTML = `
            <div class="empty-favorites">

                <div class="empty-cat">🥺</div>

                <h3>No favorite cats yet!</h3>

                <p>
                    Tap ❤️ on a sticker and it'll appear here.
                </p>

            </div>
        `;

        return;
    }

    favoriteGallery.innerHTML = "";

    favorites.forEach(index => {

        const sticker = stickers[index];

        const card = document.createElement("div");

        card.className = "sticker-card favorite-card";

        card.innerHTML = `

            <div class="sticker-image">
                ${sticker.emoji}
            </div>

            <div class="sticker-info">

                <span class="sticker-category">
                    ${sticker.category}
                </span>

                <h3>${sticker.title}</h3>

                <p>${sticker.caption}</p>

                <button
                    class="view-btn"
                    onclick="openSticker(${index})"
                >
                    View Sticker 👀
                </button>

            </div>
        `;

        favoriteGallery.appendChild(card);
    });
}


// ===============================
// CATEGORY FILTER
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
            button.getAttribute("data-category");

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
// SEARCH
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const search =
            searchInput.value.toLowerCase().trim();

        const results =
            stickers.filter(sticker =>
                sticker.title.toLowerCase().includes(search) ||
                sticker.caption.toLowerCase().includes(search) ||
                sticker.category.toLowerCase().includes(search)
            );

        showStickers(results);
    });
}


// ===============================
// OPEN STICKER MODAL
// ===============================

function openSticker(index) {

    const sticker = stickers[index];

    modalSticker.textContent = sticker.emoji;

    modalTitle.textContent = sticker.title;

    modalCaption.textContent = sticker.caption;

    modalCategory.textContent =
        sticker.category.toUpperCase();

    modal.classList.add("show");

    // Remember currently opened sticker
    modal.dataset.index = index;
}


// ===============================
// CLOSE MODAL
// ===============================

function closeStickerModal() {

    modal.classList.remove("show");

}

closeModal.addEventListener(
    "click",
    closeStickerModal
);


// Click outside modal
document.querySelector(".modal-overlay")
    .addEventListener("click", closeStickerModal);


// ===============================
// DOWNLOAD STICKER
// ===============================

downloadSticker.addEventListener("click", () => {

    const index =
        Number(modal.dataset.index);

    const sticker = stickers[index];

    // Create canvas
    const canvas =
        document.createElement("canvas");

    canvas.width = 600;
    canvas.height = 600;

    const ctx =
        canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#fff0f6";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Sticker
    ctx.font = "250px Arial";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        sticker.emoji,
        300,
        280
    );

    // Title
    ctx.font = "bold 32px Arial";

    ctx.fillStyle = "#3b2432";

    ctx.fillText(
        sticker.title,
        300,
        500
    );

    // Download
    const link =
        document.createElement("a");

    link.download =
        `${sticker.title.replaceAll(" ", "-")}.png`;

    link.href =
        canvas.toDataURL("image/png");

    link.click();
});


// ===============================
// RANDOM STICKER
// ===============================

function randomSticker() {

    const randomIndex =
        Math.floor(
            Math.random() * stickers.length
        );

    const sticker =
        stickers[randomIndex];

    const result =
        document.getElementById("randomResult");

    result.textContent =
        sticker.emoji;

    // little animation
    result.style.transform =
        "scale(1.3) rotate(10deg)";

    setTimeout(() => {

        result.style.transform =
            "scale(1) rotate(0deg)";

    }, 300);

}


// First random button
const randomButton =
    document.getElementById("randomStickerBtn");

if (randomButton) {

    randomButton.addEventListener(
        "click",
        randomSticker
    );

}


// Second random button
const randomButton2 =
    document.getElementById("randomStickerBtn2");

if (randomButton2) {

    randomButton2.addEventListener(
        "click",
        randomSticker
    );

}


// ===============================
// MOBILE MENU
// ===============================

const menuButton =
    document.querySelector(".menu-btn");

const navbar =
    document.querySelector(".navbar");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("open");

    });

}


// ===============================
// INITIAL LOAD
// ===============================

showStickers(stickers);

showFavorites();

console.log(
    "🐾 Purrfect Stickers loaded successfully!"
);
