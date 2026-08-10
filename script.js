```javascript
/* =========================================
   🐾 PURRFECT STICKERS
   COMPLETE JAVASCRIPT
========================================= */


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



/* =========================================
   ELEMENTS
========================================= */

const stickerGrid =
    document.getElementById("stickerGrid");

const favoriteGrid =
    document.getElementById("favoriteGrid");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const resultCount =
    document.getElementById("resultCount");

const categoryButtons =
    document.querySelectorAll(".category-btn");


const modal =
    document.getElementById("modal");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeBtn =
    document.getElementById("closeBtn");

const modalEmoji =
    document.getElementById("modalEmoji");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalCaption =
    document.getElementById("modalCaption");

const downloadBtn =
    document.getElementById("downloadBtn");

const favoriteModalBtn =
    document.getElementById("favoriteModalBtn");


const randomBtn =
    document.getElementById("randomBtn");

const randomBtn2 =
    document.getElementById("randomBtn2");

const randomResult =
    document.getElementById("randomResult");


const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");



/* =========================================
   STATE
========================================= */

let activeCategory = "all";

let currentSticker = null;


let favorites =
    JSON.parse(
        localStorage.getItem(
            "purrfectFavorites"
        )
    ) || [];



/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    clearTimeout(toastTimer);

    toastText.textContent = message;

    toast.classList.add("show");


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}



/* =========================================
   FAVORITE CHECK
========================================= */

function isFavorite(id) {

    return favorites.includes(id);

}



/* =========================================
   FILTER
========================================= */

function getFilteredStickers() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    return stickers.filter(sticker => {

        const categoryMatch =
            activeCategory === "all" ||
            sticker.category === activeCategory;


        const searchMatch =
            sticker.title
                .toLowerCase()
                .includes(search) ||

            sticker.caption
                .toLowerCase()
                .includes(search) ||

            sticker.category
                .toLowerCase()
                .includes(search);


        return categoryMatch && searchMatch;

    });

}



/* =========================================
   SHOW STICKERS
========================================= */

function showStickers(list) {

    stickerGrid.innerHTML = "";


    resultCount.textContent =
        `${list.length} cute cat${list.length !== 1 ? "s" : ""} found 🐱`;


    if (list.length === 0) {

        stickerGrid.innerHTML = `

            <div class="loading">

                🥺

                <br><br>

                No cats found!

                <br>

                Try another search
                or category. 🐾

            </div>

        `;

        return;
    }


    list.forEach((sticker, index) => {

        const card =
            document.createElement("article");


        card.className =
            "sticker-card";


        card.style.animationDelay =
            `${index * 0.04}s`;


        const saved =
            isFavorite(sticker.id);


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
                        data-id="${sticker.id}">

                        👀 View

                    </button>


                    <button
                        class="favorite-btn
                        ${saved ? "is-favorite" : ""}"
                        data-id="${sticker.id}">

                        ${saved
                            ? "💖 Saved"
                            : "❤️ Favorite"}

                    </button>


                    <button
                        class="download-card-btn"
                        data-id="${sticker.id}">

                        ⬇️ Save

                    </button>

                </div>

            </div>
        `;


        stickerGrid.appendChild(card);

    });


    attachCardEvents();

}



/* =========================================
   CARD EVENTS
========================================= */

function attachCardEvents() {


    document
        .querySelectorAll(
            ".preview-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openModal(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".favorite-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    toggleFavorite(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".download-card-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    saveSticker(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}



/* =========================================
   SEARCH
========================================= */

function refreshStickers() {

    showStickers(
        getFilteredStickers()
    );

}


searchInput.addEventListener(
    "input",
    refreshStickers
);


clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        activeCategory = "all";


        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        document
            .querySelector(
                '[data-category="all"]'
            )
            .classList.add("active");


        refreshStickers();

        searchInput.focus();

    }
);



/* =========================================
   CATEGORY BUTTONS
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add("active");


            activeCategory =
                button.dataset.category;


            refreshStickers();


            document
                .getElementById("stickers")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});



/* =========================================
   OPEN MODAL
========================================= */

function openModal(id) {

    const sticker =
        stickers.find(
            item => item.id === id
        );


    if (!sticker) return;


    currentSticker = sticker;


    modalEmoji.textContent =
        sticker.emoji;


    modalCategory.textContent =
        sticker.category;


    modalTitle.textContent =
        sticker.title;


    modalCaption.textContent =
        sticker.caption;


    updateModalFavorite();


    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    currentSticker = null;

}


closeBtn.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);



/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );


        showToast(
            "💔 Removed from favorites"
        );

    } else {

        favorites.push(id);


        showToast(
            "💖 Added to favorites!"
        );

    }


    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );


    updateFavorites();

    refreshStickers();

    updateModalFavorite();

}



/* =========================================
   MODAL FAVORITE
========================================= */

function updateModalFavorite() {

    if (!currentSticker) return;


    if (
        isFavorite(
            currentSticker.id
        )
    ) {

        favoriteModalBtn.textContent =
            "💖 Saved to Favorites";

    } else {

        favoriteModalBtn.textContent =
            "❤️ Favorite";

    }

}


favoriteModalBtn.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;


        toggleFavorite(
            currentSticker.id
        );

    }
);



/* =========================================
   FAVORITES SECTION
========================================= */

function updateFavorites() {

    favoriteGrid.innerHTML = "";


    if (favorites.length === 0) {

        favoriteGrid.innerHTML = `

            <div class="empty-favorites">

                <div>🥺</div>

                <h3>
                    No favorite cats yet!
                </h3>

                <p>
                    Click ❤️ on a sticker
                    to save it here.
                </p>

            </div>

        `;

        return;

    }


    const favoriteStickers =
        stickers.filter(
            sticker =>
                favorites.includes(
                    sticker.id
                )
        );


    favoriteStickers.forEach(
        sticker => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "sticker-card";


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
                            data-id="${sticker.id}">

                            👀 View

                        </button>


                        <button
                            class="favorite-btn is-favorite"
                            data-id="${sticker.id}">

                            💖 Saved

                        </button>

                    </div>

                </div>
            `;


            favoriteGrid.appendChild(card);

        }
    );


    favoriteGrid
        .querySelectorAll(
            ".preview-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openModal(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    favoriteGrid
        .querySelectorAll(
            ".favorite-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    toggleFavorite(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}



/* =========================================
   RANDOM CAT
========================================= */

function pickRandomCat() {

    const index =
        Math.floor(
            Math.random() *
            stickers.length
        );


    const sticker =
        stickers[index];


    randomResult.textContent =
        sticker.emoji;


    randomResult.style.transform =
        "scale(.75) rotate(-8deg)";


    setTimeout(() => {

        randomResult.style.transform =
            "scale(1) rotate(0)";

    }, 150);


    showToast(
        `🎲 ${sticker.title} picked!`
    );

}


randomBtn.addEventListener(
    "click",
    () => {

        pickRandomCat();


        document
            .querySelector(
                ".random-section"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


randomBtn2.addEventListener(
    "click",
    pickRandomCat
);



/* =========================================
   SAVE STICKER
   Creates a simple PNG-like SVG sticker
========================================= */

function saveSticker(id) {

    const sticker =
        stickers.find(
            item => item.id === id
        );


    if (!sticker) return;


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="600"
            height="600"
            viewBox="0 0 600 600">

            <rect
                width="600"
                height="600"
                rx="70"
                fill="#ffe5ef"/>

            <circle
                cx="300"
                cy="260"
                r="170"
                fill="#fff7fb"/>

            <text
                x="300"
                y="330"
                text-anchor="middle"
                font-size="170">

                ${sticker.emoji}

            </text>

            <text
                x="300"
                y="470"
                text-anchor="middle"
                font-family="Arial"
                font-size="32"
                font-weight="bold"
                fill="#d84d84">

                ${sticker.title}

            </text>

            <text
                x="300"
                y="520"
                text-anchor="middle"
                font-family="Arial"
                font-size="22"
                fill="#765b68">

                🐾 Purrfect Stickers

            </text>

        </svg>
    `;


    const blob =
        new Blob(
            [svg],
            {
                type:
                    "image/svg+xml"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        `${sticker.title
            .toLowerCase()
            .replaceAll(" ", "-")}-sticker.svg`;


    document.body.appendChild(link);

    link.click();

    link.remove();


    URL.revokeObjectURL(url);


    showToast(
        "🐾 Sticker saved!"
    );

}


downloadBtn.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;


        saveSticker(
            currentSticker.id
        );

    }
);



/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle(
            "open"
        );

    }
);


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "open"
                );

            }
        );

    });



/* =========================================
   INITIAL LOAD
========================================= */

showStickers(stickers);

updateFavorites();


console.log(
    "🐾 Purrfect Stickers loaded successfully!"
);
```
