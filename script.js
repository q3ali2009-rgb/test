const correctPassword = "kw2026";
let loginTime = null;

function login() {
    const input = document.getElementById("passwordInput").value;

    if (input === correctPassword) {
        loginTime = new Date();
        document.getElementById("loginPage").classList.remove("active");
        document.getElementById("mainPage").classList.add("active");
        document.getElementById("welcomeMsg").innerText =
            "حياك 👋 (الكود صالح لمدة ٦ ساعات)";
    } else {
        alert("لا يا وحش ❌ الباسورد غلط");
    }
}

function checkSession() {
    if (!loginTime) return false;
    const now = new Date();
    const diff = (now - loginTime) / 1000 / 60 / 60;
    if (diff > 6) {
        alert("انتهت صلاحية الجلسة ⏳");
        location.reload();
    }
}

function showRecorder() {
    checkSession();
    document.getElementById("mainPage").classList.remove("active");
    document.getElementById("recorderPage").classList.add("active");
}

function showAI() {
    checkSession();
    document.getElementById("mainPage").classList.remove("active");
    document.getElementById("aiPage").classList.add("active");
}

function goHome() {
    location.reload();
}

function goMain() {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("mainPage").classList.add("active");
}

// 🎙️ التسجيل
let mediaRecorder;
let audioChunks = [];

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioURL = URL.createObjectURL(blob);
        document.getElementById("audioPlayback").src = audioURL;
        audioChunks = [];
    };

    alert("يلا بدأنا التسجيل 🔴");
}

function stopRecording() {
    mediaRecorder.stop();
    alert("تم حفظ التسجيل 👌");
}

// 🤖 AI بسيط (محلي)
function sendMessage() {
    const input = document.getElementById("userInput").value;
    const chatBox = document.getElementById("chatBox");

    const userMsg = `<p><b>أنت:</b> ${input}</p>`;
    const aiMsg = `<p><b>AI:</b> ترى سؤالك رهيب 😎 بس هذي نسخة تجريبية</p>`;

    chatBox.innerHTML += userMsg + aiMsg;
    document.getElementById("userInput").value = "";
}
