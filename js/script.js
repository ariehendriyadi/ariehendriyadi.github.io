/* Register Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("[script.js][ServiceWorker] Service Worker belum didukung browser ini.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("[script.js][registerServiceWorker] Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(function(err) {
            console.error("[script.js][registerServiceWorker] Registrasi Service Worker gagal.", err);
        });
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("[script.js][requestPermission] Fitur notifikasi tidak diizinkan.");
                return;
            }
            else if (result === "default") {
                console.error("[script.js][requestPermission] Pengguna menutup kotak dialog permintaan izin.");
                return;
            }
    
            // navigator.serviceWorker.getRegistration().then(function(reg) {
            //     reg.showNotification("[mySript.js][requestPermission] Notifikasi diizinkan!");
            // });
            navigator.serviceWorker.ready.then(() => {
            if (("PushManager") in window) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BEIFxdrbBqQBPzfNulKP6GojjVLHotKs8wweEfg1BGVDFAO16BBRnb2zWv-twykppEk6u0sYLDLamOWD5E7KF20")
                    }).then(function(subscribe) {
                        console.log("[script.js][requestPermission] Berhasil melakukan subscribe");
                        console.log("[Endpoint]: ", subscribe.endpoint);
                        console.log("[p256dh key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("[Auth key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                    }).catch(function(e) {
                        console.error("[script.js][requestPermission] Tidak dapat melakukan subscribe", e.message);
                    });
                });
            }
        });
        });
    }
}

function convertDate(dateString) {
    var date = new Date(dateString);

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "December"];

    let day = String(date.getDate()).padStart(2, '0');
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    let result = day + " " + month + " " + year;

    return result
}

function back() {
    window.history.back();
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}