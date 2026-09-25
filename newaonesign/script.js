/* =========================================================
   ENU ONE SIGN
   COMPLETE PREMIUM JAVASCRIPT
   VERSION 1.1
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let currentProduct = null;
    let currentDetailQuantity = 1;
    let currentFilter = "all";
    let visibleProducts = 8;
    let currentGalleryIndex = 0;

    let currentOrderProduct = null;
    let currentOrderQuantity = 1;

    let heroCurrentSlide = 0;
    let heroTimer = null;

    let categoryTimer = null;
    let top10Timer = null;

    const SHIPPING_CHARGE = 200;

    const STORE_WHATSAPP = "";


    /* =====================================================
       SAFE HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    function safeJSONParse(value, fallback = []) {

        try {

            const parsed = JSON.parse(value);

            return parsed ?? fallback;

        } catch (error) {

            return fallback;

        }

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function formatPKR(amount) {

        return `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

    }


    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

    }


    function getProduct(productId) {

        return products.find(
            product => String(product.id) === String(productId)
        );

    }


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    let cart = safeJSONParse(
        localStorage.getItem("enuOneSignCart"),
        []
    );

    let wishlist = safeJSONParse(
        localStorage.getItem("enuOneSignWishlist"),
        []
    );


    if (!Array.isArray(cart)) cart = [];
    if (!Array.isArray(wishlist)) wishlist = [];


    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const products = [

        {
            id: 1,
            name: "Personalized Couple Mug",
            category: "mugs",
            categoryLabel: "Customized Mugs",
            price: 1499,
            oldPrice: 1999,
            discount: "25% OFF",
            rating: 5,
            reviews: 128,
            badge: "Best Seller",
            top10: true,
            customizable: true,
            sizes: ["Standard"],
            colors: ["White", "Black", "Red", "Pink"],
            tags: [
                "mugs",
                "couples",
                "boyfriend",
                "girlfriend",
                "husband",
                "wife",
                "valentines"
            ],
            description:
                "A premium personalized mug designed for couples and meaningful moments. Add names, photos or a special message.",
            images: [
                "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 2,
            name: "3D Memory Photo Frame",
            category: "frames",
            categoryLabel: "Photo Frames",
            price: 2499,
            oldPrice: 3299,
            discount: "24% OFF",
            rating: 4.9,
            reviews: 94,
            badge: "Premium",
            top10: true,
            customizable: true,
            sizes: ["Small", "Medium", "Large"],
            colors: ["Black", "White", "Gold", "Silver"],
            tags: [
                "frames",
                "home",
                "photo-gifts",
                "couples",
                "birthday",
                "anniversary",
                "wedding"
            ],
            description:
                "A premium memory frame made to display your favorite photograph in an elegant personalized design.",
            images: [
                "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 3,
            name: "Personalized Name Keychain",
            category: "keychains",
            categoryLabel: "Keychains",
            price: 899,
            oldPrice: 1199,
            discount: "25% OFF",
            rating: 4.8,
            reviews: 76,
            badge: "Popular",
            top10: true,
            customizable: true,
            sizes: ["Standard"],
            colors: ["Black", "Gold", "Silver"],
            tags: [
                "keychains",
                "accessories",
                "couples",
                "best-friend",
                "brother",
                "sister"
            ],
            description:
                "A stylish personalized keychain with your name or special text. Small, elegant and meaningful.",
            images: [
                "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 4,
            name: "Custom Name Water Bottle",
            category: "bottles",
            categoryLabel: "Water Bottles",
            price: 1799,
            oldPrice: 2299,
            discount: "22% OFF",
            rating: 4.8,
            reviews: 65,
            badge: "New",
            top10: true,
            customizable: true,
            sizes: ["500ml", "750ml", "1000ml"],
            colors: ["Black", "White", "Blue", "Pink"],
            tags: [
                "bottles",
                "accessories",
                "birthday",
                "best-friend"
            ],
            description:
                "A premium personalized bottle designed for everyday use with your name or custom message.",
            images: [
                "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1544003484-3cd181d17917?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 5,
            name: "Personalized Leather Wallet",
            category: "wallets",
            categoryLabel: "Leather Wallets",
            price: 2299,
            oldPrice: 2999,
            discount: "23% OFF",
            rating: 4.9,
            reviews: 81,
            badge: "Premium",
            top10: true,
            customizable: true,
            sizes: ["Standard"],
            colors: ["Black", "Brown"],
            tags: [
                "wallets",
                "accessories",
                "father",
                "husband",
                "boyfriend",
                "brother"
            ],
            description:
                "A premium leather wallet personalized with a name, initials or special message.",
            images: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 6,
            name: "Magic Mirror Photo Gift",
            category: "magic-mirror",
            categoryLabel: "Magic Mirror",
            price: 2999,
            oldPrice: 3999,
            discount: "25% OFF",
            rating: 5,
            reviews: 52,
            badge: "Exclusive",
            top10: true,
            customizable: true,
            sizes: ["Medium", "Large"],
            colors: ["Black", "Gold", "Silver"],
            tags: [
                "magic-mirror",
                "home",
                "photo-gifts",
                "couples",
                "anniversary",
                "birthday"
            ],
            description:
                "A beautiful personalized mirror-style gift that reveals a special memory and message.",
            images: [
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 7,
            name: "Luxury Couple Gift Hamper",
            category: "hampers",
            categoryLabel: "Hamper Gifts",
            price: 4999,
            oldPrice: 5999,
            discount: "17% OFF",
            rating: 4.9,
            reviews: 112,
            badge: "Best Seller",
            top10: true,
            customizable: true,
            sizes: ["Standard"],
            colors: ["Black", "White", "Pink"],
            tags: [
                "hampers",
                "couples",
                "valentines",
                "anniversary",
                "birthday",
                "home"
            ],
            description:
                "A premium curated gift hamper combining personalized pieces for a complete gifting experience.",
            images: [
                "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 8,
            name: "Premium Ribbon Bouquet",
            category: "bouquets",
            categoryLabel: "Ribbon Bouquets",
            price: 3499,
            oldPrice: 4499,
            discount: "22% OFF",
            rating: 4.9,
            reviews: 71,
            badge: "Trending",
            top10: true,
            customizable: true,
            sizes: ["Standard", "Large"],
            colors: ["Red", "Pink", "White", "Gold"],
            tags: [
                "bouquets",
                "accessories",
                "couples",
                "girlfriend",
                "wife",
                "mother",
                "valentines",
                "birthday"
            ],
            description:
                "An elegant ribbon bouquet designed to make your special occasion feel extraordinary.",
            images: [
                "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 9,
            name: "LED Photo Memory Lamp",
            category: "led-lamps",
            categoryLabel: "LED Photo Lamp",
            price: 2799,
            oldPrice: 3599,
            discount: "22% OFF",
            rating: 4.8,
            reviews: 59,
            badge: "Premium",
            top10: true,
            customizable: true,
            sizes: ["Medium", "Large"],
            colors: ["White", "Warm White"],
            tags: [
                "led-lamps",
                "home",
                "photo-gifts",
                "couples",
                "birthday",
                "anniversary"
            ],
            description:
                "Turn your favorite photograph into a glowing personalized memory lamp.",
            images: [
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 10,
            name: "Customized Premium T-Shirt",
            category: "tshirts",
            categoryLabel: "Customized T-Shirts",
            price: 1999,
            oldPrice: 2599,
            discount: "23% OFF",
            rating: 4.8,
            reviews: 87,
            badge: "Popular",
            top10: true,
            customizable: true,
            sizes: ["Small", "Medium", "Large", "XL", "XXL"],
            colors: ["Black", "White", "Red", "Blue", "Pink"],
            tags: [
                "tshirts",
                "couples",
                "boyfriend",
                "girlfriend",
                "brother",
                "sister",
                "birthday"
            ],
            description:
                "Premium personalized T-shirt with your own name, photo, quote or custom design.",
            images: [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 11,
            name: "Personalized Jewelry Box",
            category: "jewelry-box",
            categoryLabel: "Jewelry Box",
            price: 2399,
            oldPrice: 2999,
            discount: "20% OFF",
            rating: 4.8,
            reviews: 43,
            badge: "New",
            top10: false,
            customizable: true,
            sizes: ["Small", "Medium"],
            colors: ["Pink", "White", "Black"],
            tags: [
                "jewelry-box",
                "accessories",
                "girlfriend",
                "wife",
                "mother",
                "sister"
            ],
            description:
                "A beautiful personalized jewelry box made to keep special accessories organized in style.",
            images: [
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 12,
            name: "Personalized Photo Cushion",
            category: "cushions",
            categoryLabel: "Customized Cushions",
            price: 1599,
            oldPrice: 2099,
            discount: "24% OFF",
            rating: 4.7,
            reviews: 38,
            badge: "Gift Pick",
            top10: false,
            customizable: true,
            sizes: ["Small", "Medium", "Large"],
            colors: ["White", "Pink", "Red"],
            tags: [
                "cushions",
                "home",
                "couples",
                "best-friend",
                "birthday",
                "anniversary"
            ],
            description:
                "A soft personalized cushion printed with your favorite photo, name or special message.",
            images: [
                "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 13,
            name: "Personalized Gift Watch",
            category: "watches",
            categoryLabel: "Watches",
            price: 3199,
            oldPrice: 3999,
            discount: "20% OFF",
            rating: 4.7,
            reviews: 31,
            badge: "Elegant",
            top10: false,
            customizable: true,
            sizes: ["Standard"],
            colors: ["Black", "Brown", "Gold"],
            tags: [
                "watches",
                "accessories",
                "husband",
                "father",
                "boyfriend",
                "brother"
            ],
            description:
                "An elegant watch gift with personalized packaging and custom details.",
            images: [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=1000&q=90"
            ]
        },

        {
            id: 14,
            name: "Customized Hoodie",
            category: "hoodies",
            categoryLabel: "Customized Hoodies",
            price: 2999,
            oldPrice: 3799,
            discount: "21% OFF",
            rating: 4.8,
            reviews: 46,
            badge: "Winter Pick",
            top10: false,
            customizable: true,
            sizes: ["Small", "Medium", "Large", "XL", "XXL"],
            colors: ["Black", "White", "Blue", "Red"],
            tags: [
                "hoodies",
                "couples",
                "boyfriend",
                "girlfriend",
                "best-friend"
            ],
            description:
                "A premium personalized hoodie designed around your name, photo or custom artwork.",
            images: [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90",
                "https://images.unsplash.com/photo-1508175800969-525c72a047dd?auto=format&fit=crop&w=1000&q=90"
            ]
        }

    ];


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer = null;

    function showToast(message) {

        const toast = $("#toast");
        const toastMessage = $("#toastMessage");

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

    }


    /* =====================================================
       BODY LOCK
    ===================================================== */

    function updateBodyLock() {

        const states = [
            $("#mobileNav")?.classList.contains("open"),
            $("#searchOverlay")?.classList.contains("open"),
            $("#productDetailOverlay")?.classList.contains("open"),
            $("#orderOverlay")?.classList.contains("open"),
            $("#cartPanel")?.classList.contains("open")
        ];

        document.body.classList.toggle(
            "no-scroll",
            states.some(Boolean)
        );

    }


    /* =====================================================
       GLOBAL OVERLAY
    ===================================================== */

    function updateGlobalOverlay() {

        const overlay = $("#globalOverlay");

        if (!overlay) return;

        const active =
            $("#cartPanel")?.classList.contains("open");

        overlay.classList.toggle("active", active);

    }


    /* =====================================================
       OFFER BAR AUTO SLIDER
    ===================================================== */

    function initOfferSlider() {

        const textElement = $("#offerSliderText");

        if (!textElement) return;

        const phrases = [
            "Personalized Gifts With Love",
            "Premium Customized Gifts",
            "Made For Every Moment",
            "Crafted With Love",
            "COD Available"
        ];

        let index = 0;

        setInterval(() => {

            textElement.classList.add("changing");

            setTimeout(() => {

                index =
                    (index + 1) % phrases.length;

                textElement.textContent =
                    phrases[index];

                textElement.classList.remove(
                    "changing"
                );

            }, 350);

        }, 3000);

    }


    /* =====================================================
       LOADER
    ===================================================== */

    function initLoader() {

        const loader = $("#loader");

        if (!loader) return;

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("hidden");

                setTimeout(() => {

                    loader.style.display = "none";

                }, 700);

            }, 1000);

        });

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function initHeader() {

        const header = $("#siteHeader");

        if (!header) return;

        const update = () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );

        };

        update();

        window.addEventListener(
            "scroll",
            update,
            { passive: true }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileNav() {

        const mobileNav = $("#mobileNav");
        const menuButton = $("#menuButton");

        if (!mobileNav) return;

        mobileNav.classList.remove("open");

        mobileNav.setAttribute(
            "aria-hidden",
            "true"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        /* Close all mobile category submenus */

        $$(".mobile-nav-group-title").forEach(title => {

            title.classList.remove("active");

            title.setAttribute(
                "aria-expanded",
                "false"
            );

        });


        $$(".mobile-nav-submenu").forEach(submenu => {

            submenu.classList.remove("open");
            submenu.classList.remove("active");

        });


        updateBodyLock();

    }


    function initMobileMenu() {

        const menuButton = $("#menuButton");
        const mobileNav = $("#mobileNav");

        if (!menuButton || !mobileNav) return;


        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("open");

            mobileNav.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            updateBodyLock();

        });


        /*
         * Mobile submenu buttons
         * Personalized / Customized Products /
         * By Relation / Gifts
         */

        $$(".mobile-nav-group-title", mobileNav)
            .forEach(title => {

                title.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();


                        const controls =
                            title.getAttribute(
                                "aria-controls"
                            );

                        if (!controls) return;

                        const submenu =
                            document.getElementById(
                                controls
                            );

                        if (!submenu) return;


                        const isOpen =
                            title.getAttribute(
                                "aria-expanded"
                            ) === "true";


                        /*
                         * Close other mobile submenus
                         */

                        $$(".mobile-nav-group-title", mobileNav)
                            .forEach(otherTitle => {

                                if (otherTitle !== title) {

                                    otherTitle.classList.remove(
                                        "active"
                                    );

                                    otherTitle.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }

                            });


                        $$(".mobile-nav-submenu", mobileNav)
                            .forEach(otherMenu => {

                                if (otherMenu !== submenu) {

                                    otherMenu.classList.remove(
                                        "open"
                                    );

                                    otherMenu.classList.remove(
                                        "active"
                                    );

                                }

                            });


                        /*
                         * Toggle selected submenu
                         */

                        title.setAttribute(
                            "aria-expanded",
                            String(!isOpen)
                        );

                        title.classList.toggle(
                            "active",
                            !isOpen
                        );

                        submenu.classList.toggle(
                            "open",
                            !isOpen
                        );

                        submenu.classList.toggle(
                            "active",
                            !isOpen
                        );

                    }
                );

            });


        /*
         * Normal mobile links
         */

        $$("#mobileNav a").forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileNav();

                }
            );

        });

    }


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    function initHeroSlider() {

        const slides = $$(".hero-slide");
        const dots = $$(".hero-dot");

        if (!slides.length) return;

        function showHeroSlide(index) {

            heroCurrentSlide =
                (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === heroCurrentSlide
                );

            });

            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === heroCurrentSlide
                );

            });

        }


        dots.forEach(dot => {

            dot.addEventListener("click", () => {

                const index =
                    Number(dot.dataset.slide || 0);

                showHeroSlide(index);

                restartHeroTimer();

            });

        });


        function startHeroTimer() {

            clearInterval(heroTimer);

            heroTimer = setInterval(() => {

                showHeroSlide(
                    heroCurrentSlide + 1
                );

            }, 5000);

        }


        function restartHeroTimer() {

            startHeroTimer();

        }


        showHeroSlide(0);

        startHeroTimer();

    }


    /* =====================================================
       CATEGORY FILTER MATCHING
    ===================================================== */

    function productMatchesFilter(product, filter) {

        filter = normalize(filter);

        if (filter === "all") return true;

        if (filter === "wishlist") {

            return wishlist.includes(product.id);

        }

        const category =
            normalize(product.category);

        const filterCategory =
            normalize(product.filterCategory);

        const tags =
            Array.isArray(product.tags)
                ? product.tags.map(normalize)
                : [];

        return (
            category === filter ||
            filterCategory === filter ||
            tags.includes(filter)
        );

    }


    /* =====================================================
       PRODUCT CARD HTML
    ===================================================== */

    function productCardHTML(product) {

        const isWishlisted =
            wishlist.includes(product.id);

        const image =
            product.images?.[0] || "";

        return `

            <article
                class="product-card reveal tilt-card"
                data-product-id="${product.id}"
            >

                <div
                    class="product-image-wrap"
                    data-action="order"
                    data-product-id="${product.id}"
                    role="button"
                    tabindex="0"
                    aria-label="Order ${escapeHTML(product.name)}"
                >

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                    >

                    ${
                        product.badge
                            ? `
                                <span class="product-badge">
                                    ${escapeHTML(product.badge)}
                                </span>
                              `
                            : ""
                    }

                    <button
                        type="button"
                        class="product-wishlist ${
                            isWishlisted ? "active" : ""
                        }"
                        data-action="wishlist"
                        data-product-id="${product.id}"
                        aria-label="Add to wishlist"
                    >

                        <i class="${
                            isWishlisted
                                ? "fa-solid"
                                : "fa-regular"
                        } fa-heart"></i>

                    </button>

                </div>


                <div class="product-content">

                    <span class="product-category">
                        ${escapeHTML(product.categoryLabel)}
                    </span>

                    <h3 class="product-name">
                        ${escapeHTML(product.name)}
                    </h3>

                    <div class="product-rating">

                        <span>
                            ${"★".repeat(Math.round(product.rating))}
                        </span>

                        <small>
                            ${product.rating} (${product.reviews})
                        </small>

                    </div>

                    <div class="product-price-row">

                        <strong>
                            ${formatPKR(product.price)}
                        </strong>

                        ${
                            product.oldPrice
                                ? `
                                    <del>
                                        ${formatPKR(product.oldPrice)}
                                    </del>
                                  `
                                : ""
                        }

                    </div>


                    <div class="product-actions">

                        <button
                            type="button"
                            class="product-view-button"
                            data-action="view"
                            data-product-id="${product.id}"
                        >
                            View Product
                        </button>

                        <button
                            type="button"
                            class="product-order-button"
                            data-action="order"
                            data-product-id="${product.id}"
                        >
                            Order Now
                        </button>

                    </div>

                </div>

            </article>

        `;

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts(showLoading = false) {

        const grid = $("#productGrid");
        const loading = $("#productsLoading");

        if (!grid) return;

        const filtered =
            products.filter(product =>
                productMatchesFilter(
                    product,
                    currentFilter
                )
            );

        const visible =
            filtered.slice(0, visibleProducts);

        if (showLoading && loading) {

            loading.classList.add("active");

        }


        setTimeout(() => {

            if (!visible.length) {

                grid.innerHTML = `

                    <div class="empty-products">

                        <i class="fa-regular fa-face-frown"></i>

                        <h3>
                            No Products Found
                        </h3>

                        <p>
                            Try another category.
                        </p>

                    </div>

                `;

            } else {

                grid.innerHTML =
                    visible.map(productCardHTML).join("");

            }


            if (loading) {

                loading.classList.remove("active");

            }


            updateViewMoreButton(
                filtered.length
            );

            initRevealAnimations();
            initTiltCards();

        }, showLoading ? 650 : 0);

    }


    /* =====================================================
       VIEW MORE
    ===================================================== */

    function updateViewMoreButton(total) {

        const button =
            $("#viewMoreProducts");

        if (!button) return;

        const wrap =
            button.closest(".section-button-wrap");

        if (visibleProducts >= total) {

            if (wrap) wrap.style.display = "none";

        } else {

            if (wrap) wrap.style.display = "";

        }

    }


    function initViewMore() {

        const button =
            $("#viewMoreProducts");

        if (!button) return;

        button.addEventListener("click", () => {

            visibleProducts += 4;

            renderProducts(true);

        });

    }


    /* =====================================================
       APPLY FILTER
    ===================================================== */

    function applyFilter(filter, shouldScroll = true) {

        currentFilter =
            normalize(filter || "all");

        visibleProducts = 8;

        $$(".filter-button").forEach(button => {

            button.classList.toggle(
                "active",
                normalize(button.dataset.filter) ===
                currentFilter
            );

        });


        renderProducts(true);


        if (shouldScroll) {

            setTimeout(() => {

                $("#products")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }


    /* =====================================================
       PRODUCT FILTER BUTTONS
    ===================================================== */

    function initProductFilters() {

        $$(".filter-button").forEach(button => {

            button.addEventListener("click", () => {

                applyFilter(
                    button.dataset.filter,
                    false
                );

            });

        });

    }


    /* =====================================================
       PRODUCT EVENT DELEGATION
    ===================================================== */

    function initProductEvents() {

        const productGrid =
            $("#productGrid");

        if (!productGrid) return;

        productGrid.addEventListener(
            "click",
            event => {

                const target =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!target) return;

                const action =
                    target.dataset.action;

                const productId =
                    target.dataset.productId;

                if (!productId) return;

                if (action === "view") {

                    event.preventDefault();

                    openProductDetail(productId);

                }

                if (action === "order") {

                    event.preventDefault();

                    openOrderPanel(
                        productId,
                        1
                    );

                }

                if (action === "wishlist") {

                    event.preventDefault();

                    toggleWishlist(productId);

                }

            }
        );


        productGrid.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Enter" &&
                    event.key !== " "
                ) {
                    return;
                }

                const target =
                    event.target.closest(
                        '[data-action="order"]'
                    );

                if (!target) return;

                event.preventDefault();

                openOrderPanel(
                    target.dataset.productId,
                    1
                );

            }
        );

    }


    /* =====================================================
       WISHLIST
    ===================================================== */

    function saveWishlist() {

        localStorage.setItem(
            "enuOneSignWishlist",
            JSON.stringify(wishlist)
        );

    }


    function updateWishlistCount() {

        const count =
            $("#wishlistCount");

        if (count) {

            count.textContent =
                wishlist.length;

        }

    }


    function toggleWishlist(productId) {

        const id =
            Number(productId);

        const index =
            wishlist.indexOf(id);

        if (index >= 0) {

            wishlist.splice(index, 1);

            showToast(
                "Removed from wishlist"
            );

        } else {

            wishlist.push(id);

            showToast(
                "Added to wishlist"
            );

        }


        saveWishlist();

        updateWishlistCount();

        renderProducts(false);

        updateDetailWishlist();

    }


    function updateDetailWishlist() {

        const button =
            $("#detailWishlistButton");

        if (!button || !currentProduct) return;

        const active =
            wishlist.includes(
                Number(currentProduct.id)
            );

        button.classList.toggle(
            "active",
            active
        );

        button.innerHTML = `

            <i class="${
                active
                    ? "fa-solid"
                    : "fa-regular"
            } fa-heart"></i>

        `;

    }


    function initWishlistButton() {

        const button =
            $("#wishlistButton");

        if (!button) return;

        button.addEventListener("click", () => {

            if (!wishlist.length) {

                showToast(
                    "Your wishlist is empty"
                );

                return;

            }

            applyFilter(
                "wishlist",
                true
            );

            showToast(
                "Showing your wishlist"
            );

        });

    }


    /* =====================================================
       CATEGORY SLIDER
    ===================================================== */

    function initCategorySlider() {

        const slider =
            $("#categorySlider");

        if (!slider) return;

        const prev =
            $("#categoryPrev");

        const next =
            $("#categoryNext");


        function move(amount) {

            slider.scrollBy({
                left: amount,
                behavior: "smooth"
            });

        }


        prev?.addEventListener(
            "click",
            () => {

                move(
                    -(slider.clientWidth * 0.8)
                );

            }
        );


        next?.addEventListener(
            "click",
            () => {

                move(
                    slider.clientWidth * 0.8
                );

            }
        );


        $$(".category-card", slider)
            .forEach(card => {

                card.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const category =
                            card.dataset.category;

                        if (!category) return;

                        applyFilter(
                            category,
                            true
                        );

                    }
                );

            });


        slider.addEventListener(
            "mouseenter",
            () => clearInterval(categoryTimer)
        );

        slider.addEventListener(
            "mouseleave",
            startCategoryAutoSlide
        );


        startCategoryAutoSlide();

    }


    function startCategoryAutoSlide() {

        const slider =
            $("#categorySlider");

        if (!slider) return;

        clearInterval(categoryTimer);

        categoryTimer =
            setInterval(() => {

                const maxScroll =
                    slider.scrollWidth -
                    slider.clientWidth;

                if (
                    slider.scrollLeft >=
                    maxScroll - 10
                ) {

                    slider.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });

                } else {

                    slider.scrollBy({
                        left: 260,
                        behavior: "smooth"
                    });

                }

            }, 4000);

    }


    /* =====================================================
       NAV CATEGORY LINKS
       MOBILE + DESKTOP FIX
    ===================================================== */

    function initCategoryLinks() {

        /*
         * IMPORTANT:
         * We use event delegation instead of adding
         * separate click events to every category.
         *
         * This makes the mobile Personalized submenu
         * buttons reliably clickable.
         */

        const mobileNav =
            $("#mobileNav");

        if (mobileNav) {

            if (
                mobileNav.dataset.categoryLinksReady !== "true"
            ) {

                mobileNav.dataset.categoryLinksReady =
                    "true";


                mobileNav.addEventListener(
                    "click",
                    event => {

                        const element =
                            event.target.closest(
                                "[data-category]"
                            );

                        if (!element) return;


                        /*
                         * Ignore the category group title.
                         * Only actual category items should
                         * apply a product filter.
                         */

                        if (
                            element.classList.contains(
                                "mobile-nav-group-title"
                            )
                        ) {
                            return;
                        }


                        const category =
                            element.dataset.category;

                        if (!category) return;


                        /*
                         * Stop any parent mobile-menu
                         * handler from interfering.
                         */

                        event.preventDefault();
                        event.stopPropagation();


                        /*
                         * Apply selected category.
                         */

                        applyFilter(
                            category,
                            false
                        );


                        /*
                         * Close mobile submenu/menu.
                         */

                        closeMobileNav();


                        /*
                         * Scroll after menu closes.
                         */

                        setTimeout(() => {

                            const productsSection =
                                $("#products");

                            if (productsSection) {

                                productsSection.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            }

                        }, 150);

                    }
                );

            }

        }


        /*
         * Desktop navigation + footer + occasion cards
         *
         * Do NOT bind mobile category items here,
         * because mobileNav has its own delegated handler.
         */

        $$("[data-category]").forEach(element => {

            if (
                element.closest("#mobileNav")
            ) {
                return;
            }


            /*
             * Category cards already have their own
             * click handler in initCategorySlider().
             */

            if (
                element.classList.contains(
                    "category-card"
                )
            ) {
                return;
            }


            /*
             * Occasion cards get their own handler below.
             */

            if (
                element.classList.contains(
                    "occasion-card"
                )
            ) {
                return;
            }


            if (
                element.dataset.categoryBound === "true"
            ) {
                return;
            }


            element.dataset.categoryBound =
                "true";


            element.addEventListener(
                "click",
                event => {

                    const category =
                        element.dataset.category;

                    if (!category) return;

                    event.preventDefault();

                    applyFilter(
                        category,
                        true
                    );

                    closeMobileNav();

                }
            );

        });


        /*
         * Occasion cards
         */

        $$(".occasion-card").forEach(card => {

            if (
                card.dataset.categoryBound === "true"
            ) {
                return;
            }


            card.dataset.categoryBound =
                "true";


            card.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const category =
                        card.dataset.category;

                    if (!category) return;

                    applyFilter(
                        category,
                        true
                    );

                }
            );

        });

    }


    /* =====================================================
       PRODUCT DETAIL MODAL
    ===================================================== */

    function openProductDetail(productId) {

        const product =
            getProduct(productId);

        if (!product) {

            showToast(
                "Product could not be found"
            );

            return;

        }


        currentProduct = product;

        currentDetailQuantity = 1;

        currentGalleryIndex = 0;


        const overlay =
            $("#productDetailOverlay");

        if (!overlay) return;


        const category =
            $("#detailCategory");

        const name =
            $("#detailName");

        const rating =
            $("#detailRating");

        const price =
            $("#detailPrice");

        const oldPrice =
            $("#detailOldPrice");

        const discount =
            $("#detailDiscount");

        const description =
            $("#detailDescription");

        const mainImage =
            $("#detailMainImage");

        const quantity =
            $("#detailQuantity");


        if (category)
            category.textContent =
                product.categoryLabel;

        if (name)
            name.textContent =
                product.name;

        if (rating)
            rating.innerHTML = `

                <span>
                    ${"★".repeat(
                        Math.round(product.rating)
                    )}
                </span>

                <small>
                    ${product.rating}
                    (${product.reviews})
                </small>

            `;


        if (price)
            price.textContent =
                formatPKR(product.price);


        if (oldPrice) {

            oldPrice.textContent =
                product.oldPrice
                    ? formatPKR(product.oldPrice)
                    : "";

        }


        if (discount)
            discount.textContent =
                product.discount || "";


        if (description)
            description.textContent =
                product.description;


        if (quantity)
            quantity.textContent = "1";


        if (mainImage) {

            mainImage.src =
                product.images[0];

            mainImage.alt =
                product.name;

        }


        renderDetailThumbnails();

        updateGallery();

        populateCustomizationOptions();

        resetDetailCustomization();

        updateDetailWishlist();


        overlay.classList.add("open");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        updateBodyLock();

    }


    function renderDetailThumbnails() {

        const thumbs =
            $("#detailThumbs");

        if (!thumbs || !currentProduct) return;

        thumbs.innerHTML =
            currentProduct.images
                .slice(0, 5)
                .map((image, index) => `

                    <button
                        type="button"
                        class="detail-thumb ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-index="${index}"
                    >

                        <img
                            src="${escapeHTML(image)}"
                            alt="Product image ${
                                index + 1
                            }"
                            loading="lazy"
                        >

                    </button>

                `)
                .join("");


        $$(".detail-thumb", thumbs)
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentGalleryIndex =
                            Number(
                                button.dataset.index
                            );

                        updateGallery();

                    }
                );

            });

    }


    function updateGallery() {

        if (!currentProduct) return;

        const images =
            currentProduct.images || [];

        if (!images.length) return;


        currentGalleryIndex =
            (
                currentGalleryIndex +
                images.length
            ) % images.length;


        const mainImage =
            $("#detailMainImage");

        const counter =
            $("#detailImageCounter");


        if (mainImage) {

            mainImage.style.opacity = "0";

            setTimeout(() => {

                mainImage.src =
                    images[currentGalleryIndex];

                mainImage.style.opacity = "1";

            }, 120);

        }


        if (counter) {

            counter.textContent =
                `${currentGalleryIndex + 1} / ${images.length}`;

        }


        $$(".detail-thumb").forEach(
            (thumb, index) => {

                thumb.classList.toggle(
                    "active",
                    index === currentGalleryIndex
                );

            }
        );

    }


    function initDetailGallery() {

        $("#detailGalleryPrev")
            ?.addEventListener(
                "click",
                () => {

                    if (!currentProduct) return;

                    currentGalleryIndex--;

                    updateGallery();

                }
            );


        $("#detailGalleryNext")
            ?.addEventListener(
                "click",
                () => {

                    if (!currentProduct) return;

                    currentGalleryIndex++;

                    updateGallery();

                }
            );

    }


    function populateCustomizationOptions() {

        if (!currentProduct) return;

        const colorSelect =
            $("#customColor");

        const sizeSelect =
            $("#customSize");


        if (colorSelect && currentProduct.colors) {

            colorSelect.innerHTML = `

                <option value="">
                    Select Color
                </option>

                ${currentProduct.colors
                    .map(color => `
                        <option value="${escapeHTML(color)}">
                            ${escapeHTML(color)}
                        </option>
                    `)
                    .join("")}

            `;

        }


        if (sizeSelect && currentProduct.sizes) {

            sizeSelect.innerHTML = `

                <option value="">
                    Select Size
                </option>

                ${currentProduct.sizes
                    .map(size => `
                        <option value="${escapeHTML(size)}">
                            ${escapeHTML(size)}
                        </option>
                    `)
                    .join("")}

            `;

        }

    }


    function resetDetailCustomization() {

        const fields = [
            "#customName",
            "#customColor",
            "#customSize",
            "#customNote"
        ];

        fields.forEach(selector => {

            const element =
                $(selector);

            if (element) {

                element.value = "";

            }

        });


        const photo =
            $("#customPhoto");

        if (photo) {

            photo.value = "";

        }

    }


    function getDetailCustomization() {

        return {

            name:
                $("#customName")?.value.trim() || "",

            color:
                $("#customColor")?.value || "",

            size:
                $("#customSize")?.value || "",

            note:
                $("#customNote")?.value.trim() || "",

            photoName:
                $("#customPhoto")?.files?.[0]?.name || ""

        };

    }


    function initDetailQuantity() {

        $("#detailQtyMinus")
            ?.addEventListener(
                "click",
                () => {

                    currentDetailQuantity =
                        Math.max(
                            1,
                            currentDetailQuantity - 1
                        );

                    $("#detailQuantity").textContent =
                        currentDetailQuantity;

                }
            );


        $("#detailQtyPlus")
            ?.addEventListener(
                "click",
                () => {

                    currentDetailQuantity++;

                    $("#detailQuantity").textContent =
                        currentDetailQuantity;

                }
            );

    }


    function initDetailActions() {

        $("#detailOrderButton")
            ?.addEventListener(
                "click",
                () => {

                    if (!currentProduct) return;

                    const customization =
                        getDetailCustomization();

                    openOrderPanel(
                        currentProduct,
                        currentDetailQuantity,
                        customization
                    );

                }
            );


        $("#detailAddCartButton")
            ?.addEventListener(
                "click",
                () => {

                    if (!currentProduct) return;

                    const customization =
                        getDetailCustomization();

                    addToCart(
                        currentProduct,
                        currentDetailQuantity,
                        customization
                    );

                }
            );


        $("#detailWishlistButton")
            ?.addEventListener(
                "click",
                () => {

                    if (!currentProduct) return;

                    toggleWishlist(
                        currentProduct.id
                    );

                }
            );

    }


    function closeProductDetail() {

        const overlay =
            $("#productDetailOverlay");

        if (!overlay) return;

        overlay.classList.remove("open");

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        updateBodyLock();

    }


    function initDetailClose() {

        $("#detailClose")
            ?.addEventListener(
                "click",
                closeProductDetail
            );


        $("#productDetailOverlay")
            ?.addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "productDetailOverlay"
                    ) {

                        closeProductDetail();

                    }

                }
            );

    }


    /* =====================================================
       DETAIL TABS
    ===================================================== */

    function initDetailTabs() {

        $$(".detail-tab").forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    const target =
                        tab.dataset.tab;

                    $$(".detail-tab")
                        .forEach(button => {

                            button.classList.toggle(
                                "active",
                                button === tab
                            );

                        });


                    $$("[data-content]")
                        .forEach(content => {

                            content.classList.toggle(
                                "active",
                                content.dataset.content ===
                                target
                            );

                        });

                }
            );

        });

    }


    /* =====================================================
       CART
    ===================================================== */

    function customizationKey(customization = {}) {

        return [
            customization.name || "",
            customization.color || "",
            customization.size || "",
            customization.note || "",
            customization.photoName || ""
        ]
            .join("|")
            .toLowerCase();

    }


    function addToCart(
        product,
        quantity = 1,
        customization = {}
    ) {

        if (!product) return;

        const key =
            customizationKey(customization);


        const existingIndex =
            cart.findIndex(item =>

                Number(item.id) ===
                Number(product.id) &&

                customizationKey(
                    item.customization || {}
                ) === key

            );


        if (existingIndex >= 0) {

            cart[existingIndex].quantity +=
                Number(quantity);

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.images?.[0] || "",

                quantity: Number(quantity),

                customization: {
                    ...customization
                }

            });

        }


        saveCart();

        renderCart();

        showToast(
            "Product added to your bag"
        );

    }


    function saveCart() {

        localStorage.setItem(
            "enuOneSignCart",
            JSON.stringify(cart)
        );

    }


    function updateCartCount() {

        const count =
            $("#cartCount");

        if (!count) return;

        const total =
            cart.reduce(
                (sum, item) =>
                    sum + Number(item.quantity || 0),
                0
            );

        count.textContent =
            total;

    }


    function renderCart() {

        const container =
            $("#cartItems");

        if (!container) return;

        if (!cart.length) {

            container.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-bag-shopping"></i>

                    <h3>
                        Your Bag Is Empty
                    </h3>

                    <p>
                        Add something special to your bag.
                    </p>

                </div>

            `;

        } else {

            container.innerHTML =
                cart.map((item, index) => `

                    <article
                        class="cart-item"
                        data-cart-index="${index}"
                    >

                        <div class="cart-item-image">

                            <img
                                src="${escapeHTML(item.image)}"
                                alt="${escapeHTML(item.name)}"
                            >

                        </div>


                        <div class="cart-item-content">

                            <span>
                                ${escapeHTML(item.name)}
                            </span>

                            <strong>
                                ${formatPKR(
                                    item.price
                                )}
                            </strong>

                            <small>
                                Qty: ${item.quantity}
                            </small>

                            ${
                                item.customization?.name
                                    ? `
                                        <small>
                                            Name:
                                            ${escapeHTML(
                                                item.customization.name
                                            )}
                                        </small>
                                      `
                                    : ""
                            }

                            <button
                                type="button"
                                class="cart-remove"
                                data-cart-remove="${index}"
                            >
                                Remove
                            </button>

                        </div>

                    </article>

                `)
                .join("");

        }


        const subtotal =
            cart.reduce(
                (sum, item) =>
                    sum +
                    (
                        Number(item.price) *
                        Number(item.quantity)
                    ),
                0
            );


        const shipping =
            cart.length
                ? SHIPPING_CHARGE
                : 0;

        const total =
            subtotal + shipping;


        $("#cartSubtotal").textContent =
            formatPKR(subtotal);

        $("#cartShipping").textContent =
            formatPKR(shipping);

        $("#cartGrandTotal").textContent =
            formatPKR(total);


        updateCartCount();

    }


    function openCart() {

        const panel =
            $("#cartPanel");

        if (!panel) return;

        panel.classList.add("open");

        panel.setAttribute(
            "aria-hidden",
            "false"
        );

        updateGlobalOverlay();
        updateBodyLock();

    }


    function closeCart() {

        const panel =
            $("#cartPanel");

        if (!panel) return;

        panel.classList.remove("open");

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

        updateGlobalOverlay();
        updateBodyLock();

    }


    function initCart() {

        $("#cartButton")
            ?.addEventListener(
                "click",
                openCart
            );


        $("#cartClose")
            ?.addEventListener(
                "click",
                closeCart
            );


        $("#globalOverlay")
            ?.addEventListener(
                "click",
                closeCart
            );


        $("#cartItems")
            ?.addEventListener(
                "click",
                event => {

                    const button =
                        event.target.closest(
                            "[data-cart-remove]"
                        );

                    if (!button) return;

                    const index =
                        Number(
                            button.dataset.cartRemove
                        );

                    if (
                        Number.isNaN(index) ||
                        !cart[index]
                    ) {
                        return;
                    }

                    cart.splice(index, 1);

                    saveCart();

                    renderCart();

                    showToast(
                        "Product removed from bag"
                    );

                }
            );


        $("#checkoutButton")
            ?.addEventListener(
                "click",
                () => {

                    if (!cart.length) {

                        showToast(
                            "Your bag is empty"
                        );

                        return;

                    }

                    const firstItem =
                        cart[0];

                    const product =
                        getProduct(
                            firstItem.id
                        );

                    if (!product) return;

                    openOrderPanel(
                        product,
                        firstItem.quantity,
                        firstItem.customization || {}
                    );

                }
            );

    }


    /* =====================================================
       ORDER PANEL
    ===================================================== */

    function buildCustomizationText(customization = {}) {

        const parts = [];

        if (customization.name)
            parts.push(
                `Name: ${customization.name}`
            );

        if (customization.color)
            parts.push(
                `Color: ${customization.color}`
            );

        if (customization.size)
            parts.push(
                `Size: ${customization.size}`
            );

        if (customization.note)
            parts.push(
                `Note: ${customization.note}`
            );

        if (customization.photoName)
            parts.push(
                `Photo: ${customization.photoName}`
            );

        return parts.join(" | ");

    }


    function openOrderPanel(
        productOrId,
        quantity = 1,
        customization = {}
    ) {

        const product =
            typeof productOrId === "object"
                ? productOrId
                : getProduct(productOrId);


        if (!product) {

            showToast(
                "Product could not be found"
            );

            return;

        }


        currentOrderProduct =
            product;

        currentOrderQuantity =
            Math.max(
                1,
                Number(quantity) || 1
            );


        closeProductDetail();

        closeCart();


        const summary =
            $("#orderProductSummary");


        if (summary) {

            const customizationText =
                buildCustomizationText(
                    customization
                );


            summary.innerHTML = `

                <div class="order-summary-image">

                    <img
                        src="${escapeHTML(
                            product.images?.[0] || ""
                        )}"
                        alt="${escapeHTML(
                            product.name
                        )}"
                    >

                </div>


                <div class="order-summary-info">

                    <span>
                        ${escapeHTML(
                            product.categoryLabel
                        )}
                    </span>

                    <strong>
                        ${escapeHTML(
                            product.name
                        )}
                    </strong>

                    <small>
                        Quantity:
                        ${currentOrderQuantity}
                    </small>

                    ${
                        customizationText
                            ? `
                                <small>
                                    ${escapeHTML(
                                        customizationText
                                    )}
                                </small>
                              `
                            : ""
                    }

                </div>


                <div class="order-summary-price">

                    ${formatPKR(
                        product.price *
                        currentOrderQuantity
                    )}

                </div>

            `;

        }


        const quantityInput =
            $("#orderQuantity");

        if (quantityInput) {

            quantityInput.value =
                currentOrderQuantity;

        }


        populateOrderSizeOptions(product);


        const personalization =
            $("#orderPersonalization");

        if (personalization) {

            personalization.value =
                customizationTextForOrder(
                    customization
                );

        }


        const overlay =
            $("#orderOverlay");

        if (!overlay) return;


        calculateOrderTotals();


        overlay.classList.add("open");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        updateBodyLock();

    }


    function customizationTextForOrder(
        customization = {}
    ) {

        const lines = [];

        if (customization.name)
            lines.push(
                `Name / Text: ${customization.name}`
            );

        if (customization.color)
            lines.push(
                `Color: ${customization.color}`
            );

        if (customization.size)
            lines.push(
                `Size: ${customization.size}`
            );

        if (customization.note)
            lines.push(
                `Special Note: ${customization.note}`
            );

        if (customization.photoName)
            lines.push(
                `Photo selected in product customization: ${customization.photoName}`
            );

        return lines.join("\n");

    }


    function populateOrderSizeOptions(product) {

        const select =
            $("#orderSize");

        if (!select) return;

        const sizes =
            product.sizes?.length
                ? product.sizes
                : [
                    "Small",
                    "Medium",
                    "Large",
                    "XL",
                    "XXL"
                ];


        select.innerHTML = `

            <option value="">
                Select Size
            </option>

            ${sizes.map(size => `

                <option value="${escapeHTML(size)}">
                    ${escapeHTML(size)}
                </option>

            `).join("")}

        `;

    }


    function calculateOrderTotals() {

        if (!currentOrderProduct) return;

        const quantityInput =
            $("#orderQuantity");

        const quantity =
            Math.max(
                1,
                Number(
                    quantityInput?.value ||
                    currentOrderQuantity ||
                    1
                )
            );


        currentOrderQuantity =
            quantity;


        const subtotal =
            Number(
                currentOrderProduct.price
            ) *
            quantity;


        const shipping =
            SHIPPING_CHARGE;

        const total =
            subtotal + shipping;


        if ($("#orderSubtotal")) {

            $("#orderSubtotal").textContent =
                formatPKR(subtotal);

        }

        if ($("#orderShipping")) {

            $("#orderShipping").textContent =
                formatPKR(shipping);

        }

        if ($("#orderTotal")) {

            $("#orderTotal").textContent =
                formatPKR(total);

        }


        updateOrderSummaryQuantity();

    }


    function updateOrderSummaryQuantity() {

        const summary =
            $("#orderProductSummary");

        if (!summary || !currentOrderProduct) {
            return;
        }

        const smalls =
            $(
                ".order-summary-info small",
                summary
            );

        if (smalls.length) {

            smalls[0].textContent =
                `Quantity: ${currentOrderQuantity}`;

        }

        const price =
            $(".order-summary-price", summary);

        if (price) {

            price.textContent =
                formatPKR(
                    currentOrderProduct.price *
                    currentOrderQuantity
                );

        }

    }


    function closeOrderPanel() {

        const overlay =
            $("#orderOverlay");

        if (!overlay) return;

        overlay.classList.remove("open");

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        updateBodyLock();

    }


    function initOrderPanel() {

        $("#orderClose")
            ?.addEventListener(
                "click",
                closeOrderPanel
            );


        $("#orderOverlay")
            ?.addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "orderOverlay"
                    ) {

                        closeOrderPanel();

                    }

                }
            );


        $("#orderQuantity")
            ?.addEventListener(
                "input",
                calculateOrderTotals
            );


        $("#orderQuantity")
            ?.addEventListener(
                "change",
                calculateOrderTotals
            );


        $("#orderPhoto")
            ?.addEventListener(
                "change",
                event => {

                    const file =
                        event.target.files?.[0];

                    if (!file) return;

                    showToast(
                        `Photo selected: ${file.name}`
                    );

                }
            );


        $("#customPhoto")
            ?.addEventListener(
                "change",
                event => {

                    const file =
                        event.target.files?.[0];

                    if (!file) return;

                    showToast(
                        `Photo selected: ${file.name}`
                    );

                }
            );


        $("#orderForm")
            ?.addEventListener(
                "submit",
                handleOrderSubmit
            );

    }


    /* =====================================================
       ORDER SUBMIT
    ===================================================== */

    function handleOrderSubmit(event) {

        event.preventDefault();

        if (!currentOrderProduct) {

            showToast(
                "Please select a product first"
            );

            return;

        }


        const name =
            $("#customerName")?.value.trim() || "";

        const phone =
            $("#customerPhone")?.value.trim() || "";

        const email =
            $("#customerEmail")?.value.trim() || "";

        const city =
            $("#customerCity")?.value.trim() || "";

        const address =
            $("#customerAddress")?.value.trim() || "";

        const landmark =
            $("#customerLandmark")?.value.trim() || "";

        const postalCode =
            $("#customerPostalCode")?.value.trim() || "";

        const quantity =
            Math.max(
                1,
                Number(
                    $("#orderQuantity")?.value || 1
                )
            );

        const size =
            $("#orderSize")?.value || "";

        const personalization =
            $("#orderPersonalization")
                ?.value.trim() || "";

        const photoFile =
            $("#orderPhoto")
                ?.files?.[0];


        if (!name) {

            showToast(
                "Please enter your full name"
            );

            $("#customerName")?.focus();

            return;

        }


        if (!phone) {

            showToast(
                "Please enter your mobile number"
            );

            $("#customerPhone")?.focus();

            return;

        }


        if (!city) {

            showToast(
                "Please enter your city"
            );

            $("#customerCity")?.focus();

            return;

        }


        if (!address) {

            showToast(
                "Please enter your complete address"
            );

            $("#customerAddress")?.focus();

            return;

        }


        if (!personalization) {

            showToast(
                "Please enter customization details"
            );

            $("#orderPersonalization")?.focus();

            return;

        }


        const payment =
            $(
                'input[name="paymentMethod"]:checked'
            )?.value || "cod";


        const subtotal =
            currentOrderProduct.price *
            quantity;

        const shipping =
            SHIPPING_CHARGE;

        const total =
            subtotal + shipping;


        const orderNumber =
            `ENU-${Date.now()
                .toString()
                .slice(-8)}`;


        const order = {

            orderNumber,

            createdAt:
                new Date().toISOString(),

            product: {

                id:
                    currentOrderProduct.id,

                name:
                    currentOrderProduct.name,

                price:
                    currentOrderProduct.price,

                image:
                    currentOrderProduct.images?.[0] || ""

            },

            quantity,

            customer: {

                name,

                phone,

                email,

                city,

                address,

                landmark,

                postalCode

            },

            orderDetails: {

                size,

                personalization,

                photoName:
                    photoFile?.name || ""

            },

            payment,

            subtotal,

            shipping,

            total

        };


        const savedOrders =
            safeJSONParse(
                localStorage.getItem(
                    "enuOneSignOrders"
                ),
                []
            );


        savedOrders.push(order);


        localStorage.setItem(
            "enuOneSignOrders",
            JSON.stringify(
                savedOrders
            )
        );


        if (STORE_WHATSAPP) {

            const message = [

                `ENU ONE SIGN ORDER`,
                ``,
                `Order: ${orderNumber}`,
                `Product: ${currentOrderProduct.name}`,
                `Quantity: ${quantity}`,
                `Total: ${formatPKR(total)}`,
                ``,
                `Customer: ${name}`,
                `Phone: ${phone}`,
                `City: ${city}`,
                `Address: ${address}`,
                `Personalization: ${personalization}`

            ].join("\n");


            const whatsappURL =
                `https://wa.me/${STORE_WHATSAPP}?text=` +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        }


        closeOrderPanel();

        showToast(
            `Order ${orderNumber} saved successfully`
        );


        $("#orderForm")?.reset();

        currentOrderProduct = null;

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function openSearch() {

        const overlay =
            $("#searchOverlay");

        if (!overlay) return;

        overlay.classList.add("open");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        updateBodyLock();

        setTimeout(() => {

            $("#searchInput")?.focus();

        }, 150);

    }


    function closeSearch() {

        const overlay =
            $("#searchOverlay");

        if (!overlay) return;

        overlay.classList.remove("open");

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        updateBodyLock();

    }


    function renderSearchResults(query = "") {

        const results =
            $("#searchResults");

        if (!results) return;

        const search =
            normalize(query).replace(/-/g, " ");


        if (!search) {

            results.innerHTML = `

                <div class="search-empty">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <p>
                        Search for your perfect gift.
                    </p>

                </div>

            `;

            return;

        }


        const matches =
            products.filter(product => {

                const text = [

                    product.name,

                    product.categoryLabel,

                    product.category,

                    ...(product.tags || [])

                ]
                    .join(" ")
                    .toLowerCase();

                return text.includes(search);

            });


        if (!matches.length) {

            results.innerHTML = `

                <div class="search-empty">

                    <i class="fa-regular fa-face-frown"></i>

                    <p>
                        No gifts found for "${escapeHTML(query)}".
                    </p>

                </div>

            `;

            return;

        }


        results.innerHTML =
            matches.slice(0, 8)
                .map(product => `

                    <button
                        type="button"
                        class="search-result-item"
                        data-search-product="${product.id}"
                    >

                        <img
                            src="${escapeHTML(
                                product.images?.[0] || ""
                            )}"
                            alt="${escapeHTML(
                                product.name
                            )}"
                        >

                        <span>

                            <strong>
                                ${escapeHTML(
                                    product.name
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    product.categoryLabel
                                )}
                            </small>

                        </span>

                        <b>
                            ${formatPKR(
                                product.price
                            )}
                        </b>

                    </button>

                `)
                .join("");

    }


    function initSearch() {

        $("#searchButton")
            ?.addEventListener(
                "click",
                openSearch
            );


        $("#searchClose")
            ?.addEventListener(
                "click",
                closeSearch
            );


        $("#searchInput")
            ?.addEventListener(
                "input",
                event => {

                    renderSearchResults(
                        event.target.value
                    );

                }
            );


        $("#searchResults")
            ?.addEventListener(
                "click",
                event => {

                    const result =
                        event.target.closest(
                            "[data-search-product]"
                        );

                    if (!result) return;

                    const productId =
                        result.dataset.searchProduct;

                    closeSearch();

                    openProductDetail(
                        productId
                    );

                }
            );


        $("#searchOverlay")
            ?.addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "searchOverlay"
                    ) {

                        closeSearch();

                    }

                }
            );


        renderSearchResults("");

    }


    /* =====================================================
       TOP 10 COLLECTION
    ===================================================== */

    function renderTop10() {

        const track =
            $("#highQualityGrid");

        if (!track) return;


        const topProducts =
            products
                .filter(product => product.top10)
                .slice(0, 10);


        track.innerHTML =
            topProducts
                .map(productCardHTML)
                .join("");


        initRevealAnimations();
        initTiltCards();

    }


    function initTop10Events() {

        const track =
            $("#highQualityGrid");

        if (!track) return;


        if (
            track.dataset.eventsReady === "true"
        ) {
            return;
        }

        track.dataset.eventsReady = "true";


        track.addEventListener(
            "click",
            event => {

                const target =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!target) return;

                const action =
                    target.dataset.action;

                const productId =
                    target.dataset.productId;

                if (action === "view") {

                    openProductDetail(
                        productId
                    );

                }

                if (action === "order") {

                    openOrderPanel(
                        productId,
                        1
                    );

                }

                if (action === "wishlist") {

                    toggleWishlist(
                        productId
                    );

                }

            }
        );


        $("#topCollectionPrev")
            ?.addEventListener(
                "click",
                () => {

                    moveTop10(-1);

                }
            );


        $("#topCollectionNext")
            ?.addEventListener(
                "click",
                () => {

                    moveTop10(1);

                }
            );


        track.addEventListener(
            "mouseenter",
            () => {

                clearInterval(top10Timer);

            }
        );


        track.addEventListener(
            "mouseleave",
            startTop10AutoSlide
        );


        startTop10AutoSlide();

    }


    function getTop10Amount() {

        const track =
            $("#highQualityGrid");

        if (!track) return 300;

        const card =
            $(".product-card", track);

        if (!card) return 300;

        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 20;

        return (
            card.getBoundingClientRect().width +
            gap
        );

    }


    function moveTop10(direction) {

        const track =
            $("#highQualityGrid");

        if (!track) return;

        const amount =
            getTop10Amount() *
            direction;


        const max =
            track.scrollWidth -
            track.clientWidth;


        if (
            direction > 0 &&
            track.scrollLeft >=
            max - 10
        ) {

            track.scrollTo({
                left: 0,
                behavior: "smooth"
            });

            return;

        }


        if (
            direction < 0 &&
            track.scrollLeft <= 10
        ) {

            track.scrollTo({
                left: max,
                behavior: "smooth"
            });

            return;

        }


        track.scrollBy({
            left: amount,
            behavior: "smooth"
        });

    }


    function startTop10AutoSlide() {

        const track =
            $("#highQualityGrid");

        if (!track) return;

        clearInterval(top10Timer);

        top10Timer =
            setInterval(() => {

                moveTop10(1);

            }, 3500);

    }


    function initTop10Button() {

        $("#topCollectionViewMore")
            ?.addEventListener(
                "click",
                () => {

                    $("#topCollection")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    showToast(
                        "Explore the Top 10 Collection"
                    );

                }
            );

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    function initNewsletter() {

        $("#newsletterForm")
            ?.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const input =
                        $("#newsletterEmail");

                    const email =
                        input?.value.trim() || "";

                    if (!email) {

                        showToast(
                            "Please enter your email"
                        );

                        return;

                    }


                    showToast(
                        "You're on the list!"
                    );

                    if (input) {

                        input.value = "";

                    }

                }
            );

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function initWhatsApp() {

        const button =
            $("#whatsappButton");

        if (!button) return;

        button.addEventListener(
            "click",
            event => {

                if (!STORE_WHATSAPP) {

                    event.preventDefault();

                    showToast(
                        "WhatsApp number will be connected soon"
                    );

                    return;

                }


                event.preventDefault();

                const url =
                    `https://wa.me/${STORE_WHATSAPP}`;

                window.open(
                    url,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    let revealObserver = null;

    function initRevealAnimations() {

        const elements =
            $$(".reveal");

        if (!elements.length) return;


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {

                element.classList.add(
                    "visible"
                );

            });

            return;

        }


        if (!revealObserver) {

            revealObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );

        }


        elements.forEach(element => {

            if (
                !element.classList.contains(
                    "visible"
                )
            ) {

                revealObserver.observe(
                    element
                );

            }

        });

    }


    /* =====================================================
       3D TILT EFFECT
    ===================================================== */

    function initTiltCards() {

        const cards =
            $$(".tilt-card");

        if (
            !window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {
            return;
        }


        cards.forEach(card => {

            if (
                card.dataset.tiltReady === "true"
            ) {
                return;
            }


            card.dataset.tiltReady =
                "true";


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 5;


                    const rotateX =
                        (
                            (centerY - y) /
                            centerY
                        ) * 5;


                    card.style.transform = `

                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-6px)

                    `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       CATEGORY 3D INTERACTION
    ===================================================== */

    function initCategory3D() {

        const cards =
            $$(".category-card");

        if (
            !window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {
            return;
        }


        cards.forEach(card => {

            if (
                card.dataset.category3dReady === "true"
            ) {
                return;
            }

            card.dataset.category3dReady =
                "true";


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        ((x / rect.width) - 0.5) * 8;

                    const rotateX =
                        ((0.5 - y / rect.height) * 8);


                    card.style.transform = `

                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        scale(1.025)

                    `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    function initSmoothLinks() {

        $$('a[href^="#"]').forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        $(href);

                    if (!target) return;


                    if (
                        link.dataset.category
                    ) {
                        return;
                    }


                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

    }


    /* =====================================================
       KEYBOARD ESCAPE
    ===================================================== */

    function initEscapeKey() {

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Escape"
                ) {
                    return;
                }


                closeSearch();

                closeProductDetail();

                closeOrderPanel();

                closeCart();

                closeMobileNav();

            }
        );

    }


    /* =====================================================
       PRODUCT IMAGE ERROR HANDLING
    ===================================================== */

    function initImageFallbacks() {

        document.addEventListener(
            "error",
            event => {

                const image =
                    event.target;

                if (
                    image.tagName !== "IMG"
                ) {
                    return;
                }


                if (
                    image.dataset.fallbackApplied
                ) {
                    return;
                }


                image.dataset.fallbackApplied =
                    "true";


                image.src =
                    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80";

            },
            true
        );

    }


    /* =====================================================
       INITIALIZE EVERYTHING
    ===================================================== */

    function initializeWebsite() {

        initOfferSlider();

        initLoader();

        initHeader();

        initMobileMenu();

        initHeroSlider();

        initCategorySlider();

        initCategoryLinks();

        initProductFilters();

        initViewMore();

        initProductEvents();

        initWishlistButton();

        initDetailGallery();

        initDetailQuantity();

        initDetailActions();

        initDetailClose();

        initDetailTabs();

        initCart();

        initOrderPanel();

        initSearch();

        /*
         * Top 10 event initialization is done
         * safely after rendering.
         */

        initTop10Button();

        initNewsletter();

        initWhatsApp();

        initRevealAnimations();

        initTiltCards();

        initCategory3D();

        initSmoothLinks();

        initEscapeKey();

        initImageFallbacks();


        renderProducts(false);

        renderCart();

        renderTop10();

        updateWishlistCount();

        updateCartCount();


        /*
         * Top 10 cards are generated dynamically,
         * so initialize events after rendering.
         */

        initTop10Events();

        initTiltCards();

        initRevealAnimations();

    }


    /* =====================================================
       START
    ===================================================== */

    initializeWebsite();

});