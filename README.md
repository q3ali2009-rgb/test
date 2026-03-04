حياكمم
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>متجر كوالا ستور | Koala Store Official</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Kufi Arabic', sans-serif; background-color: #f4f6f9; color: #333; }
        .navbar { background-color: #ffffff; border-bottom: 2px solid #eee; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .navbar-brand { color: #2d3436 !important; font-weight: 700; letter-spacing: 1px; }
        
        .hero-section { background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: white; padding: 60px 0; margin-bottom: 40px; border-radius: 0 0 50px 50px; }
        
        .game-card { 
            border: none; 
            border-radius: 20px; 
            transition: all 0.3s ease; 
            background: white; 
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .game-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        
        .card-img-container { background: #f9f9f9; padding: 20px; text-align: center; }
        .card-img-top { width: 150px; height: 150px; object-fit: contain; }
        
        .price-tag { color: #6c5ce7; font-size: 1.2rem; font-weight: 700; }
        .btn-buy { background-color: #6c5ce7; color: white; border: none; border-radius: 12px; padding: 10px 20px; font-weight: 600; width: 100%; }
        .btn-buy:hover { background-color: #5849c4; color: white; }
        
        .cart-btn { background: #2d3436; color: white; border-radius: 50px; padding: 8px 20px; border: none; }
        .cart-count { background: #ff7675; color: white; border-radius: 50%; padding: 2px 8px; font-size: 0.8rem; margin-right: 5px; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
        <a class="navbar-brand" href="#">KOALA STORE 🐨</a>
        <button class="cart-btn" data-bs-toggle="offcanvas" data-bs-target="#cartSidebar">
             السلة <span class="cart-count" id="cartCount">0</span>
        </button>
    </div>
</nav>

<div class="hero-section text-center">
    <div class="container">
        <h1 class="display-5 fw-bold">مجموعة دمى كوالا الحصرية</h1>
        <p class="lead">اختر شخصيتك المفضلة بلمسة رسمية وأنيقة</p>
    </div>
</div>

<div class="container">
    <div class="row g-4" id="productsContainer">
        </div>
</div>

<div class="offcanvas offcanvas-start" tabindex="-1" id="cartSidebar">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title fw-bold">مشترياتك 🛍️</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
        <div id="cartItems" class="flex-grow-1">
            </div>
        <div class="border-top pt-3">
            <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">الإجمالي الكلي:</span>
                <span class="fw-bold text-primary" id="cartTotal">0</span> <span class="fw-bold text-primary">ريال</span>
            </div>
            <button class="btn btn-success w-100 py-3 fw-bold shadow-sm" onclick="checkout()">
                 إتمام الدفع عبر بوابة Stripe الآمنة 💳
            </button>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // بيانات المنتجات (دمية كوالا بملابس مختلفة)
    const koalas = [
        { id: 1, name: "كوالا رائد فضاء", price: 120, img: "👨‍🚀" },
        { id: 2, name: "كوالا رجل أعمال", price: 150, img: "💼" },
        { id: 3, name: "كوالا رياضي", price: 95, img: "⚽" },
        { id: 4, name: "كوالا الشتاء (جاكيت)", price: 110, img: "🧥" },
        { id: 5, name: "كوالا طباخ", price: 85, img: "👨‍🍳" },
        { id: 6, name: "كوالا بزي التخرج", price: 140, img: "🎓" },
        { id: 7, name: "كوالا الطبيب", price: 130, img: "🩺" },
        { id: 8, name: "كوالا بزي السباحة", price: 75, img: "🩱" },
        { id: 9, name: "كوالا الفنان (رسام)", price: 105, img: "🎨" },
        { id: 10, name: "كوالا المهندس", price: 125, img: "👷" }
    ];

    let cart = [];

    // عرض المنتجات في الصفحة
    function displayProducts() {
        const container = document.getElementById('productsContainer');
        container.innerHTML = koalas.map(k => `
            <div class="col-md-3 col-6">
                <div class="card game-card h-100">
                    <div class="card-img-container">
                        <div style="font-size: 80px;">🐨${k.img}</div>
                    </div>
                    <div class="card-body text-center">
                        <h6 class="fw-bold mb-2">${k.name}</h6>
                        <p class="price-tag mb-3">${k.price} ر.س</p>
                        <button class="btn btn-buy" onclick="addToCart(${k.id})">إضافة للسلة</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function addToCart(id) {
        const product = koalas.find(p => p.id === id);
        cart.push(product);
        updateCartUI();
        // تأثير بسيط للتنبيه
        const toast = document.createElement('div');
        toast.style = "position:fixed; bottom:20px; right:20px; background:#2ecc71; color:white; padding:10px 20px; border-radius:10px; z-index:3000;";
        toast.innerText = `تم إضافة ${product.name} بنجاح!`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    function updateCartUI() {
        document.getElementById('cartCount').innerText = cart.length;
        const itemsDiv = document.getElementById('cartItems');
        let total = 0;
        
        itemsDiv.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `
                <div class="d-flex justify-content-between align-items-center mb-3 bg-light p-2 rounded">
                    <div>
                        <small class="d-block fw-bold">${item.name}</small>
                        <small class="text-muted">${item.price} ريال</small>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="removeFromCart(${index})">حذف</button>
                </div>
            `;
        }).join('');
        
        document.getElementById('cartTotal').innerText = total;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    function checkout() {
        if (cart.length === 0) {
            alert("السلة فارغة حالياً!");
            return;
        }
        // هنا يتم الربط مع API البوابة الحقيقية
        alert("سيتم تحويلك الآن إلى بوابة Stripe المشفرة لإتمام عملية الدفع بأمان.");
        // window.location.href = "رابط_بوابة_الدفع_الخاص_بك";
    }

    displayProducts();
</script>

</body>
</html>
