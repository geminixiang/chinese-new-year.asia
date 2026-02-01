// --- 1. 倒數計時器 Logic ---
function updateCountdown() {
    // 設定目標日期：2026年農曆除夕 (2026-02-16)
    const targetDate = new Date("February 16, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<div class='time-value' style='width:auto; padding:0 20px'>本宮已回宮</div>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatTime = (val) => val < 10 ? `0${val}` : val;

    const template = `
        <div class="time-box">
            <div class="time-value">${days}</div>
            <div class="time-label">天</div>
        </div>
        <div class="time-box">
            <div class="time-value">${formatTime(hours)}</div>
            <div class="time-label">時</div>
        </div>
        <div class="time-box">
            <div class="time-value">${formatTime(minutes)}</div>
            <div class="time-label">分</div>
        </div>
        <div class="time-box">
            <div class="time-value">${formatTime(seconds)}</div>
            <div class="time-label">秒</div>
        </div>
    `;
    
    document.getElementById("countdown").innerHTML = template;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// --- 2. 店家資料與渲染 Logic ---
const lobsterStores = [
    {
        name: "饗 A Joy",
        address: "台北市信義區信義路五段7號86樓 (台北101)",
        price: "午餐 $3280 / 晚餐 $3880",
        tags: ["現烤龍蝦", "帝王蟹腳", "高空景觀", "全台最貴"],
        keyword: "饗 A Joy"
    },
    {
        name: "台北寒舍艾美 · 探索廚房",
        address: "台北市信義區松仁路38號",
        price: "假日約 $2190",
        tags: ["炭烤龍蝦", "廣式燒臘", "信義區", "舒芙蕾"],
        keyword: "台北寒舍艾美探索廚房"
    },
    {
        name: "君品酒店 · 雲軒西餐廳",
        address: "台北市大同區承德路一段3號6樓",
        price: "龍蝦套餐 $2580 起",
        tags: ["活龍蝦現做", "宮廷風裝潢", "極致奢華", "約會首選"],
        keyword: "君品酒店雲軒西餐廳"
    },
    {
        name: "豐FOOD 海陸百匯",
        address: "台北市中山區植福路8號 (大直典華)",
        price: "龍蝦之夜 $2399",
        tags: ["清蒸龍蝦", "高CP值", "大直美食", "多國料理"],
        keyword: "豐FOOD海陸百匯"
    },
    {
        name: "台北喜來登 · 十二廚",
        address: "台北市中正區忠孝東路一段12號",
        price: "假日 $1690",
        tags: ["松葉蟹腳", "甜點強", "老字號", "交通便利"],
        keyword: "台北喜來登十二廚"
    },
    {
        name: "漢來海港 (敦化/天母)",
        address: "台北市大安區敦化南路一段246號6F",
        price: "假日約 $1280",
        tags: ["高CP值", "旭蟹", "排隊名店", "海鮮豐富"],
        keyword: "漢來海港餐廳敦化店"
    }
];

function renderStores() {
    const container = document.getElementById("store-container");
    
    const html = lobsterStores.map(store => {
        // 生成 Google Maps Embed 連結
        const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(store.keyword)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        
        // 生成 Tags HTML
        const tagsHtml = store.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        return `
            <div class="store-card">
                <div class="store-info">
                    <h3 class="store-name royal-font">${store.name}</h3>
                    <div class="store-tags">${tagsHtml}</div>
                    <div class="store-price">御膳金：${store.price}</div>
                    <div class="store-address">
                        <span>📍</span> ${store.address}
                    </div>
                    <p style="font-size: 0.9rem; color: #888; margin-top: auto;">
                        * 價格僅供參考，請以御膳房公告為準。
                    </p>
                </div>
                <div class="store-map">
                    <iframe 
                        src="${mapSrc}" 
                        loading="lazy" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// 初始化渲染
document.addEventListener('DOMContentLoaded', renderStores);
