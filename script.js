/* =========================================
   PURRFECT STICKERS
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. STICKER DATA
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
        emoji: "😹",
        title: "Meme Cat",
        caption: "This is fine. Everything is totally fine 💀",
        category: "meme"
    },
    {
        id: 11,
        emoji: "😸",
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
        emoji: "😎",
        title: "Cool Cat",
        caption: "Too cool to explain myself. 😎",
        category: "funny"
    },
    {
        id: 14,
        emoji: "🤨",
        title: "Judging Cat",
        caption: "Interesting choice... very interesting. 👀",
        category: "meme"
    },
    {
        id: 15,
        emoji: "🥰",
        title: "Cuddle Cat",
        caption: "Emergency cuddle required! 💕",
        category: "love"
    },
    {
        id: 16,
        emoji: "🍔",
        title: "Snack Cat",
        caption: "I ate already. But I can eat again. 😋",
        category: "food"
    },
    {
        id: 17,
        emoji: "🔥",
        title: "Coding Boss",
        caption: "One bug down. Twenty-seven more to go. 💻",
        category: "coding"
    },
    {
        id: 18,
        emoji: "💀",
        title: "Deadline Cat",
        caption: "The deadline is tomorrow. I am totally fine.",
        category: "coding"
    }
];


/* =========================================
   2. GET HTML ELEMENTS
========================================= */

const gallery =
    document.getElementById("stickerGrid");

const favoriteGallery =
    document.getElementById("favoriteGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const randomBtn =
    document.getElementById("randomBtn");

const randomBtn2 =
    document.getElementById("randomBtn2");

const randomResult =
    document.getElementById("randomResult");

const modal =
    document.getElementById("modal");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeBtn =
    document.getElementById("closeBtn");

const modalEmoji =
    document.getElementById("modalEmoji");

const modalTitle =
    document.getElementById("modalTitle");

const modalCaption =
    document.getElementById("modalCaption");

const modalCategory =
    document.getElementById("modalCategory");

const downloadBtn =
    document.getElementById("downloadBtn");

const favoriteModalBtn =
    document.getElementById("favoriteModalBtn");

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.querySelector(".nav");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


/* =========================================
   3. APP STATE
========================================= */

let currentSticker = null;

let currentCategory = "all";

let favorites =
    JSON.parse(
        localStorage.getItem("purrfectFavorites")
    ) || [];


/* =========================================
   4. CREATE STICKER CARD
========================================= */

function createStickerCard(sticker) {

    const card =
        document.createElement("article");

    card.className = "sticker-card";

    const isFavorite =
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
                    class="favorite-btn ${
                        isFavorite ? "is-favorite" : ""
                    }"
                    data-action="favorite"
                >
                    ${
                        isFavorite
                            ? "❤️ Saved"
                            : "♡ Favorite"
                    }
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


/* =========================================
   5. SHOW STICKERS
========================================= */

function showStickers(list) {

    gallery.innerHTML = "";

    if (list.length === 0) {

        gallery.innerHTML = `
            <div class="loading">
                🥺 No cats found!
                <br>
                Try another search.
            </div>
        `;

        return;
    }

    list.forEach(sticker => {

        gallery.appendChild(
            createStickerCard(sticker)
        );

    });
}


/* =========================================
   6. FILTER STICKERS
========================================= */

function filterStickers() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    let filtered = stickers.filter(sticker => {

        const matchesCategory =
            currentCategory === "all" ||
            sticker.category === currentCategory;

        const matchesSearch =
            sticker.title
                .toLowerCase()
                .includes(search) ||

            sticker.caption
                .toLowerCase()
                .includes(search) ||

            sticker.category
                .toLowerCase()
                .includes(search);

        return matchesCategory && matchesSearch;
    });

    showStickers(filtered);
}


/* =========================================
   7. CATEGORY BUTTONS
========================================= */

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


/* =========================================
   8. SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        filterStickers();

    }
);


/* =========================================
   9. GALLERY BUTTONS
========================================= */

gallery.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");

        if (!button) return;

        const card =
            event.target.closest(".sticker-card");

        if (!card) return;

        const id =
            Number(card.dataset.id);

        const sticker =
            stickers.find(
                item => item.id === id
            );

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

            downloadSticker(sticker);

        }

    }
);


/* =========================================
   10. FAVORITES
========================================= */

function toggleFavorite(sticker) {

    const index =
        favorites.indexOf(sticker.id);


    if (index === -1) {

        favorites.push(sticker.id);

        showToast(
            "❤️ Cat added to favorites!"
        );

    } else {

        favorites.splice(index, 1);

        showToast(
            "💔 Cat removed from favorites!"
        );

    }


    localStorage.setItem(
        "purrfectFavorites",
        JSON.stringify(favorites)
    );


    showStickers(
        getFilteredStickers()
    );

    showFavorites();


    if (currentSticker &&
        currentSticker.id === sticker.id) {

        updateModalFavoriteButton();

    }
}


/* =========================================
   11. GET FILTERED STICKERS
========================================= */

function getFilteredStickers() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    return stickers.filter(sticker => {

        const categoryMatch =
            currentCategory === "all" ||
            sticker.category === currentCategory;

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
   12. SHOW FAVORITES
========================================= */

function showFavorites() {

    favoriteGallery.innerHTML = "";

    if (favorites.length === 0) {

        favoriteGallery.innerHTML = `

            <div class="empty-favorites">

                <div>
                    🥺
                </div>

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


/* =========================================
   13. FAVORITE GALLERY BUTTONS
========================================= */

favoriteGallery.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");

        if (!button) return;

        const card =
            event.target.closest(".sticker-card");

        if (!card) return;

        const id =
            Number(card.dataset.id);

        const sticker =
            stickers.find(
                item => item.id === id
            );

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

            downloadSticker(sticker);

        }

    }
);


/* =========================================
   14. OPEN MODAL
========================================= */

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


/* =========================================
   15. CLOSE MODAL
========================================= */

function closeModalFunction() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


closeBtn.addEventListener(
    "click",
    closeModalFunction
);


modalOverlay.addEventListener(
    "click",
    closeModalFunction
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModalFunction();

        }

    }
);


/* =========================================
   16. MODAL FAVORITE
========================================= */

favoriteModalBtn.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;

        toggleFavorite(currentSticker);

    }
);


function updateModalFavoriteButton() {

    if (!currentSticker) return;

    const saved =
        favorites.includes(
            currentSticker.id
        );

    favoriteModalBtn.textContent =
        saved
            ? "❤️ Saved"
            : "❤️ Favorite";
}


/* =========================================
   17. DOWNLOAD STICKER
========================================= */

function downloadSticker(sticker) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 600;
    canvas.height = 600;

    const ctx =
        canvas.getContext("2d");


    /* Background */

    ctx.fillStyle = "#fff0f6";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Sticker */

    ctx.font = "180px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText(
        sticker.emoji,
        300,
        260
    );


    /* Title */

    ctx.font =
        "bold 34px Arial";

    ctx.fillStyle =
        "#3d2633";

    ctx.fillText(
        sticker.title,
        300,
        450
    );


    /* Caption */

    ctx.font =
        "20px Arial";

    ctx.fillStyle =
        "#765b68";

    ctx.fillText(
        "🐾 Purrfect Stickers",
        300,
        510
    );


    const link =
        document.createElement("a");

    link.download =
        sticker.title
            .replace(/\s+/g, "-")
            .toLowerCase() +
        "-sticker.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();


    showToast(
        "⬇️ Sticker downloaded!"
    );
}


/* =========================================
   18. DOWNLOAD FROM MODAL
========================================= */

downloadBtn.addEventListener(
    "click",
    () => {

        if (!currentSticker) return;

        downloadSticker(
            currentSticker
        );

    }
);


/* =========================================
   19. RANDOM CAT
========================================= */

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
                    "scale(0.7) rotate(-10deg)"
            },
            {
                transform:
                    "scale(1.1) rotate(10deg)"
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


/* =========================================
   20. MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("open");

    }
);


nav.querySelectorAll("a").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

            }
        );

    }
);


/* =========================================
   21. TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toastText.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);
}


/* =========================================
   22. INITIAL LOAD
========================================= */

showStickers(stickers);

showFavorites();


console.log(
    "🐾 Purrfect Stickers is ready!"
);
