
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KOALA KW | متجر بني كوالا الفاخر</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&display=swap" rel="stylesheet">
    
    <style>
        :root { --gold: #c5a059; --dark: #121418; --accent: #27ae60; }
        body { font-family: 'Noto Kufi Arabic', sans-serif; background-color: #fcfcfc; overflow-x: hidden; }
        
        /* Navbar */
        .navbar { background: var(--dark); padding: 15px 0; border-bottom: 3px solid var(--gold); }
        .navbar-brand { color: var(--gold) !important; font-size: 1.8rem; font-weight: 700; }
        
        /* Hero Section */
        .hero { 
            background: linear-gradient(rgba(18,20,24,0.8), rgba(18,20,24,0.8)), url('https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1964&auto=format&fit=crop');
            background-size: cover; background-attachment: fixed;
            color: white; padding: 120px 0; border-bottom: 5px solid var(--gold);
        }

        /* Product Cards */
        .product-card { 
            border: none; border-radius: 20px; transition: 0.5s; background: white; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.05); overflow: hidden; height: 100%;
        }
        .product-card:hover { transform: translateY(-15px); box-shadow: 0 20px 40px rgba(197,160,89,0.2); }
        
        .img-box { 
            background: #f8f9fa; padding: 40px; font-size: 85px; text-align: center;
            transition: 0.5s; cursor: pointer;
        }
        .product-card:hover .img-box { transform: scale(1.1) rotate(5deg); }
        
        .price { color: var(--accent); font-weight: 800; font-size: 1.3rem; }
        .btn-add { 
            background: var(--dark); color: white; border: 2px solid var(--gold); 
            width: 100%; padding: 12px; border-radius: 12px; font-weight: 600;
            transition: 0.3s;
        }
        .btn-add:hover { background: var(--gold); color: var(--dark); transform: scale(1.05); }
        
        /* Cart Sidebar */
        .offcanvas { background: var(--dark); color: white; border-right: 2px solid var(--gold); }
        .cart-status { 
            background: var(--gold); color: var(--dark); padding: 10px 25px; 
            border-radius: 50px; cursor: pointer; border: none; font-weight: bold;
            box-shadow: 0 0 15px rgba(197,160,89,0.4);
        }

        /* Payment Modal */
        .modal-content { border-radius: 25px; border: none; overflow: hidden; }
        .payment-method { 
            border: 2px solid #eee; border-radius: 15px; padding: 15px; 
            cursor: pointer; transition: 0.3s; text-align: center;
        }
        .payment-method:hover { border-color: var(--gold); background: #fef9ef; }
        .payment-method.active { border-color: var(--gold); background: #fef9ef; box-shadow: 0 0 10px rgba(197,160,89,0.2); }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg sticky-top animate__animated animate__fadeInDown">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">KOALA KW 🐨</a>
        <button class="cart-status animate__animated animate__pulse animate__infinite" data-bs-toggle="offcanvas" data-bs-target="#cart">
             حقيبة التسوق (<span id="count">0</span>)
        </button>
    </div>
</nav>

<div class="hero text-center">
    <div class="container" data-aos="zoom-in">
        <h1 class="display-3 fw-bold animate__animated animate__backInDown">إصدارات كوالا المحدودة 🇰🇼</h1>
        <p class="lead opacity-75">الفخامة في كل دمية - توصيل ملكي لجميع مناطق الكويت</p>
    </div>
</div>

<div class="container my-5">
    <div class="row g-4" id="shop">
        </div>
</div>

<div class="offcanvas offcanvas-start" id="cart">
    <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="fw-bold text-gold" style="color:var(--gold)">حقيبة المشتريات 🛍️</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
        <div id="items" class="flex-grow-1"></div>
        <div class="border-top border-secondary pt-3">
            <h4 class="d-flex justify-content-between">
                <span>الإجمالي الكلي:</span>
                <span style="color:var(--gold)"><span id="total">0.000</span> د.ك</span>
            </h4>
            <button class="btn-add py-3 mt-3 fw-bold" onclick="showPayment()">
                الانتقال للدفع الآمن 🔒
            </button>
        </div>
    </div>
</div>

<div class="modal fade" id="paymentModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-dark">
            <div class="modal-header bg-light">
                <h5 class="modal-title fw-bold">بوابة الدفع الإلكترونية 💳</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p class="text-center text-muted mb-4">اختر وسيلة الدفع المناسبة لك</p>
                <div class="row g-3">
                    <div class="col-6">
                        <div class="payment-method" onclick="selectPay(this)">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" width="40" class="mb-2"><br>
                            <b>K-NET</b>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="payment-method" onclick="selectPay(this)">
                            <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" width="40" class="mb-2"><br>
                            <b>VISA/MASTER</b>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <input type="text" class="form-control mb-2" placeholder="رقم البطاقة">
                    <div class="row">
                        <div class="col-6"><input type="text" class="form-control" placeholder="MM/YY"></div>
                        <div class="col-6"><input type="text" class="form-control" placeholder="CVV"></div>
                    </div>
                </div>
                <button class="btn btn-dark w-100 mt-4 py-3 fw-bold" style="background:var(--accent); border:none;" onclick="confirmPay()">
                    تأكيد دفع <span id="payAmount"></span> د.ك
                </button>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
    AOS.init({ duration: 1000, once: true });

    const products = [
        { id: 1, name: "كوالا المهندس الكويتي", price: 12.500, emoji: "👷", delay: 100 },
        { id: 2, name: "كوالا رائد فضاء", price: 15.000, emoji: "👨‍🚀", delay: 200 },
        { id: 3, name: "كوالا رياضي (أزرق)", price: 9.750, emoji: "⚽", delay: 300 },
        { id: 4, name: "كوالا بزي التخرج", price: 14.250, emoji: "🎓", delay: 400 },
        { id: 5, name: "كوالا رجل أعمال", price: 13.000, emoji: "💼", delay: 100 },
        { id: 6, name: "كوالا الطباخ الماهر", price: 8.500, emoji: "👨‍🍳", delay: 200 },
        { id: 7, name: "كوالا الطبيب", price: 12.000, emoji: "🩺", delay: 300 },
        { id: 8, name: "كوالا الشتاء والبر", price: 11.500, emoji: "🧥", delay: 400 },
        { id: 9, name: "كوالا الرسام المبدع", price: 10.000, emoji: "🎨", delay: 100 },
        { id: 10, name: "كوالا الغواص", price: 13.500, emoji: "🤿", delay: 200 }
    ];

    let cart = [];

    function draw() {
        const shop = document.getElementById('shop');
        shop.innerHTML = products.map(p => `
            <div class="col-md-3 col-6" data-aos="fade-up" data-aos-delay="${p.delay}">
                <div class="card product-card">
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
        // تأثير اهتزاز للسلة عند الإضافة
        const btn = document.querySelector('.cart-status');
        btn.classList.add('animate__shakeX');
        setTimeout(() => btn.classList.remove('animate__shakeX'), 500);
    }

    function update() {
        document.getElementById('count').innerText = cart.length;
        const list = document.getElementById('items');
        let total = 0;
        list.innerHTML = cart.map((item, i) => {
            total += item.price;
            return `<div class="p-3 mb-2 rounded animate__animated animate__fadeInLeft" style="background:rgba(255,255,255,0.1); border-right:4px solid var(--gold)">
                <div class="d-flex justify-content-between">
                    <span>${item.name}</span>
                    <b style="color:var(--gold)">${item.price.toFixed(3)} د.ك</b>
                </div>
            </div>`;
        }).join('');
        document.getElementById('total').innerText = total.toFixed(3);
        document.getElementById('payAmount').innerText = total.toFixed(3);
    }

    const payModal = new bootstrap.Modal(document.getElementById('paymentModal'));

    function showPayment() {
        if(cart.length === 0) return alert("سلتك فارغة!");
        payModal.show();
    }

    function selectPay(el) {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        el.classList.add('active');
    }

    function confirmPay() {
        alert("جاري الاتصال بالبنك... تمت العملية بنجاح! شكراً لثقتك بمتجر بني كوالا.");
        cart = [];
        update();
        payModal.hide();
    }

    draw();
</script>
</body>
</html>
