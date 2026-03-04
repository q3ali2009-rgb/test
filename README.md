<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KOALA KW | متجر كوالا الكويت</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary-gold: #c5a059; --dark-navy: #1a1d23; }
        body { font-family: 'Noto Kufi Arabic', sans-serif; background-color: #fafafa; }
        
        .navbar { background: var(--dark-navy); padding: 20px 0; }
        .navbar-brand { color: var(--primary-gold) !important; font-size: 1.5rem; font-weight: 700; }
        
        .hero { background: var(--dark-navy); color: white; padding: 80px 0; border-bottom: 5px solid var(--primary-gold); }
        
        .product-card { 
            border: none; border-radius: 15px; transition: 0.4s; background: white; 
            box-shadow: 0 5px 15px rgba(0,0,0,0.05); overflow: hidden;
        }
        .product-card:hover { transform: scale(1.03); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        
        .img-box { background: #fdfdfd; padding: 30px; font-size: 70px; text-align: center; }
        
        .price { color: #27ae60; font-weight: 700; font-size: 1.1rem; }
        .btn-add { 
            background: var(--dark-navy); color: white; border: none; 
            width: 100%; padding: 12px; border-radius: 10px; font-weight: 600;
        }
        .btn-add:hover { background: var(--primary-gold); color: white; }
        
        .cart-status { background: var(--primary-gold); color: white; padding: 8px 20px; border-radius: 50px; cursor: pointer; border: none; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
        <a class="navbar-brand" href="#">KOALA KW 🐨</a>
        <button class="cart-status" data-bs-toggle="offcanvas" data-bs-target="#cart">
             السلة (<span id="count">0</span>)
        </button>
    </div>
</nav>

<div class="hero text-center">
    <div class="container">
        <h1 class="display-5 fw-bold">إصدارات كوالا المحدودة 🇰🇼</h1>
        <p class="lead">دمى كوالا فاخرة بملابس الشخصيات - توصيل سريع لجميع مناطق الكويت</p>
    </div>
</div>



<div class="container my-5">
    <div class="row g-4" id="shop">
        </div>
</div>

<div class="offcanvas offcanvas-start" id="cart">
    <div class="offcanvas-header border-bottom">
        <h5 class="fw-bold">حقيبة التسوق</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
        <div id="items" class="flex-grow-1"></div>
        <div class="border-top pt-3">
            <h4 class="d-flex justify-content-between">
                <span>الإجمالي:</span>
                <span><span id="total">0.000</span> د.ك</span>
            </h4>
            <button class="btn btn-primary w-100 py-3 mt-3 fw-bold" onclick="pay()">
                إتمام الدفع (K-NET / VISA) 💳
            </button>
        </div>
    </div>
</div>

<script>
    const products = [
        { id: 1, name: "كوالا المهندس الكويتي", price: 12.500, emoji: "👷" },
        { id: 2, name: "كوالا رائد فضاء", price: 15.000, emoji: "👨‍🚀" },
        { id: 3, name: "كوالا رياضي (أزرق)", price: 9.750, emoji: "⚽" },
        { id: 4, name: "كوالا بزي التخرج", price: 14.250, emoji: "🎓" },
        { id: 5, name: "كوالا رجل أعمال", price: 13.000, emoji: "💼" },
        { id: 6, name: "كوالا الطباخ الماهر", price: 8.500, emoji: "👨‍🍳" },
        { id: 7, name: "كوالا الطبيب", price: 12.000, emoji: "🩺" },
        { id: 8, name: "كوالا الشتاء والبر", price: 11.500, emoji: "🧥" },
        { id: 9, name: "كوالا الرسام المبدع", price: 10.000, emoji: "🎨" },
        { id: 10, name: "كوالا الغواص", price: 13.500, emoji: "🤿" }
    ];

    let cart = [];

    function draw() {
        const shop = document.getElementById('shop');
        shop.innerHTML = products.map(p => `
            <div class="col-md-3 col-6">
                <div class="card product-card h-100">
                    <div class="img-box">🐨${p.emoji}</div>
                    <div class="card-body text-center">
                        <h6 class="fw-bold">${p.name}</h6>
                        <p class="price">${p.price.toFixed(3)} د.ك</p>
                        <button class="btn-add" onclick="add(${p.id})">أضف للسلة</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function add(id) {
        const p = products.find(x => x.id === id);
        cart.push(p);
        update();
    }

    function update() {
        document.getElementById('count').innerText = cart.length;
        const list = document.getElementById('items');
        let total = 0;
        list.innerHTML = cart.map((item, i) => {
            total += item.price;
            return `<div class="p-2 mb-2 bg-light d-flex justify-content-between">
                <span>${item.name}</span>
                <b>${item.price.toFixed(3)} د.ك</b>
            </div>`;
        }).join('');
        document.getElementById('total').innerText = total.toFixed(3);
    }

    function pay() {
        if(cart.length === 0) return alert("سلتك فارغة!");
        alert("جاري تحويلك لصفحة الدفع الآمنة.. سنستخدم كي نت (K-NET) لإتمام العملية.");
    }

    draw();
</script>
</body>
</html>
