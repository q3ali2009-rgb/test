<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>المتجر الرسمي للألعاب | Official Game Store</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Kufi Arabic', sans-serif; background-color: #f8f9fa; }
        .navbar { background-color: #1a1d20; }
        .game-card { border: none; border-radius: 12px; transition: 0.3s; background: white; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .game-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .btn-primary { background-color: #0d6efd; border: none; padding: 10px 25px; border-radius: 8px; }
        .cart-badge { position: absolute; top: -5px; right: -10px; background: #ffc107; color: #000; border-radius: 50%; padding: 2px 6px; font-size: 12px; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">GAME STORE</a>
        <button class="btn btn-outline-light position-relative" data-bs-toggle="offcanvas" data-bs-target="#cartSidebar">
            السلة 🛒
            <span class="cart-badge" id="cartCount">0</span>
        </button>
    </div>
</nav>

<div class="bg-dark text-white text-center py-5 mb-5">
    <h1 class="display-4 fw-bold">أحدث الألعاب الرقمية</h1>
    <p class="lead">تسليم فوري وآمن 100%</p>
</div>

<div class="container">
    <div class="row g-4" id="gamesContainer">
        </div>
</div>

<div class="offcanvas offcanvas-start" tabindex="-1" id="cartSidebar">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title">سلة المشتريات</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
        <div id="cartItems"></div>
        <div class="mt-4 border-top pt-3">
            <h5>الإجمالي: <span id="cartTotal">0</span> ريال</h5>
            <button class="btn btn-success w-100 mt-3 py-3 fw-bold" onclick="goToCheckout()">الانتقال للدفع الآمن</button>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
    const games = [
        { id: 1, name: "Elden Ring: Shadow of the Erdtree", price: 150, img: "https://placehold.co/400x500/1a1d20/white?text=Elden+Ring" },
        { id: 2, name: "FC 24 Ultimate Edition", price: 299, img: "https://placehold.co/400x500/1a1d20/white?text=FC+24" },
        { id: 3, name: "GTA V Premium Edition", price: 80, img: "https://placehold.co/400x500/1a1d20/white?text=GTA+V" },
        { id: 4, name: "Spider-Man 2 PS5", price: 250, img: "https://placehold.co/400x500/1a1d20/white?text=Spider-Man" },
        { id: 5, name: "Minecraft Java Edition", price: 95, img: "https://placehold.co/400x500/1a1d20/white?text=Minecraft" },
        { id: 6, name: "Resident Evil 4 Remake", price: 180, img: "https://placehold.co/400x500/1a1d20/white?text=RE+4" },
        { id: 7, name: "Call of Duty: Modern Warfare III", price: 280, img: "https://placehold.co/400x500/1a1d20/white?text=COD+MW3" },
        { id: 8, name: "God of War Ragnarok", price: 220, img: "https://placehold.co/400x500/1a1d20/white?text=God+of+War" },
        { id: 9, name: "Red Dead Redemption 2", price: 110, img: "https://placehold.co/400x500/1a1d20/white?text=RDR+2" },
        { id: 10, name: "Cyberpunk 2077: Ultimate", price: 140, img: "https://placehold.co/400x500/1a1d20/white?text=Cyberpunk" }
    ];

    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    function renderGames() {
        const container = document.getElementById('gamesContainer');
        container.innerHTML = games.map(game => `
            <div class="col-md-3 col-6">
                <div class="card game-card h-100">
                    <img src="${game.img}" class="card-img-top p-2" alt="${game.name}">
                    <div class="card-body text-center">
                        <h6 class="card-title fw-bold">${game.name}</h6>
                        <p class="text-danger fw-bold">${game.price} ر.س</p>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${game.id})">أضف للسلة</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function addToCart(id) {
        const game = games.find(g => g.id === id);
        cart.push(game);
        saveCart();
        updateUI();
    }

    function updateUI() {
        document.getElementById('cartCount').innerText = cart.length;
        const cartItems = document.getElementById('cartItems');
        let total = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `<div class="d-flex justify-content-between mb-2"><span>${item.name}</span><b>${item.price}</b></div>`;
        }).join('');
        document.getElementById('cartTotal').innerText = total;
    }

    function saveCart() {
        localStorage.setItem('myCart', JSON.stringify(cart));
    }

    function goToCheckout() {
        if(cart.length === 0) return alert("السلة فارغة");
        // هنا يتم توجيه المستخدم لصفحة الدفع الحقيقية
        alert("سيتم توجيهك الآن إلى بوابة الدفع الآمنة (Stripe/PayTabs)");
    }

    renderGames();
    updateUI();
</script>
</body>
</html>
