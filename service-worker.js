importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: "/", revision: "2" },
    { url: "/manifest.json", revision: "1"},
    { url: "/index.html", revision: "1"},
    { url: "/nav.html", revision: "1"},
    { url: "/favicon.ico", revision: "1"},
    { url: "/icon.png", revision: "1"},
    { url: "/pages/detail-pages/detailTeam.html", revision: "2"},
    { url: "/pages/detail-pages/detailMatch.html", revision: "2"},
    { url: "/pages/detail-pages/detailPlayer.html", revision: "2"},
    { url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: "1"},
    { url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: "1"},
    { url: "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/js/materialize.min.js", revision: "1"},
    { url: "https://code.jquery.com/jquery-2.1.1.min.js", revision: "1"},
    { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
    { url: "/css/materialize.min.css", revision: "1"},
    { url: "/css/style.css", revision: "1"},
    { url: "/js/api.js", revision: "1"},
    { url: "/js/db.js", revision: "1"},
    { url: "/js/idb.js", revision: "1"},
    { url: "/js/materialize.min.js", revision: "1"},
    { url: "/js/script.js", revision: "1"},
    { url: "/js/nav.js", revision: "1"},
    { url: "/js/matches.js", revision: "1"},
    { url: "/js/standings.js", revision: "1"},
    { url: "/js/teams.js", revision: "1"},
    { url: "/pages/favorites.html", revision: "1"},
    { url: "/pages/home.html", revision: "1"},
    { url: "/pages/matches.html", revision: "1"},
    { url: "/icons/icon-16.png", revision: "1"},
    { url: "/icons/icon-32.png", revision: "1"},
    { url: "/icons/icon-192.png", revision: "1"},
    { url: "/icons/icon-512.png", revision: "1"},
    { url: "/icons/maskable_icon.png", revision: "1"},

], {
    // Ignore all URL parameters.
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

self.addEventListener("push", event => {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "icons/icon-512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});