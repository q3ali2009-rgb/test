# test
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>متجر GamesZone | للألعاب الإلكترونية</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #833ab4;
            --secondary: #fd1d1d;
            --dark: #0f0f0f;
            --card-bg: #1a1a1a;
            --text: #ffffff;
        }

        body {
            font-family: 'Cairo', sans-serif;
            background-color: var(--dark);
            color: var(--text);
            margin: 0;
            padding: 0;
        }

        /* الهيدر */
        header {
            background: rgba(0,0,0,0.9);
            padding: 15px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 2px solid var(--primary);
        }

        .logo { font-size: 24px; font-weight: bold; color: var(--primary); }

        .cart-icon {
            cursor: pointer;
            position: relative;
            background: var(--primary);
            padding: 8px 15px;
            border-radius: 5px;
        }

        #cart-count {
            background: white;
            color: black;
            border-radius: 50%;
            padding: 2px 7px;
            font-size: 12px;
            margin-right: 5px;
        }

        /* شبكة الألعاب */
        .container {
            padding: 40px 5%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
        }

        .game-card {
            background: var(--card-bg);
            border-radius: 15px;
            overflow: hidden;
            transition: 0.3s;
            border: 1px solid #333;
        }

        .game-card:hover { transform: translateY(-10px); border-color: var(--primary); }

        .game-img {
            width: 100%;
            height: 200px;
            background: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
        }

        .game-info { padding: 15px; text-align: center; }

        .price { color: var(--secondary); font-weight: bold; font-size: 20px; }

        .add-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            font-family: 'Cairo';
        }

        /* السلة وبوابة الدفع */
        .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
        }

        .modal-content {
            background: var(--card-bg);
            margin: 5% auto;
            padding: 30px;
            width: 90%;
            max-width: 500px;
            border-radius: 15px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #333;
        }

        .checkout-form input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            background: #333;
            border: 1px solid #444;
            color: white;
            border-radius: 5px;
            box-sizing: border-box;
        }

        .pay-btn {
            background: #2ecc71;
            color: white;
            border: none;
            padding: 15px;
            width: 100%;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 20px;
        }

        .close { float: left; cursor: pointer; font-size: 28px; }
    </style>
</head>
<body>

<header>
    <div class="logo">GAMES ZONE 🎮</div>
    <div class="cart-icon" onclick="toggleCart()">
        🛒 السلة <span id="cart-count">0</span>
    </div>
</header>

<div class="container" id="products-grid">
    </div>

<div id="cartModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="toggleCart()">&times;</span>
        <h2>سلة المشتريات 🛍️</h2>
        <div id="cart-items"></div>
        <hr>
        <h3>إجمالي: <span id="total-price">0</span> ريال</h3>
        
        <div class="checkout-form">
            <h4>بوابة دفع آمنة 💳</h4>
            <input type="text" placeholder="اسم حامل البطاقة">
            <input type="text" placeholder="رقم البطاقة (16 رقم)">
            <div style="display:flex; gap:10px;">
                <input type="text" placeholder="MM/YY">
                <input type="text" placeholder="CVV">
            </div>
            <button class="pay-btn" onclick="processPayment()">إتمام الدفع الآن</button>
        </div>
    </div>
</div>

<script>
    const games = [
        { id: 1, name: "Elden Ring", price: 250, icon: "⚔️" },
        { id: 2, name: "FIFA 24", price: 290, icon: "⚽" },
        { id: 3, name: "GTA V", price: 120, icon: "🚗" },
        { id: 4, name: "Spider-Man 2", price: 280, icon: "🕷️" },
        { id: 5, name: "Minecraft", price: 90, icon: "🧱" },
        { id: 6, name: "Resident Evil 4", price: 200, icon: "🧟" },
        { id: 7, name: "Call of Duty", price: 300, icon: "🔫" },
        { id: 8, name: "God of War", price: 240, icon: "🪓" },
        { id: 9, name: "Red Dead 2", price: 180, icon: "🤠" },
        { id: 10, name: "Cyberpunk 2077", price: 150, icon: "🤖" }
    ];

    let cart = [];

    // عرض الألعاب
    const grid = document.getElementById('products-grid');
    games.forEach(game => {
        grid.innerHTML += `
            <div class="game-card">
                <div class="game-img">${game.icon}</div>
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <p class="price">${game.price} ريال</p>
                    <button class="add-btn" onclick="addToCart(${game.id})">إضافة للسلة</button>
                </div>
            </div>
        `;
    });

    function addToCart(id) {
        const game = games.find(g => g.id === id);
        cart.push(game);
        updateCartUI();
        alert(`تم إضافة ${game.name} للسلة!`);
    }

    function updateCartUI() {
        document.getElementById('cart-count').innerText = cart.length;
        const cartItems = document.getElementById('cart-items');
        const totalSpan = document.getElementById('total-price');
        
        cartItems.innerHTML = "";
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.price} ريال</span>
                </div>
            `;
        });
        totalSpan.innerText = total;
    }

    function toggleCart() {
        const modal = document.getElementById('cartModal');
        modal.style.display = (modal.style.display === "block") ? "none" : "block";
    }

    function processPayment() {
        if (cart.length === 0) {
            alert("السلة فارغة!");
            return;
        }
        alert("جاري التحقق من البطاقة... تم الدفع بنجاح! شكراً لشرائك.");
        cart = [];
        updateCartUI();
        toggleCart();
    }
</script>

</body>
</html>
