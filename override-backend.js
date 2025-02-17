// Override API calls to use Cloudflare Workers backend
(function () {
    const NEW_BACKEND_URL = "https://telegram-form-final.philip20grujic.workers.dev/";

    // Override fetch API
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        if (typeof input === "string" && input.includes("http")) {
            input = input.replace(/https?:\/\/[^\/]+/, NEW_BACKEND_URL);
        }

        // Ensure the request method is allowed
        if (init && init.method === "POST") {
            init.headers = {
                ...init.headers,
                "Content-Type": "application/json",
            };
        }

        return originalFetch(input, init);
    };

    // Override XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
        if (url.includes("http")) {
            url = url.replace(/https?:\/\/[^\/]+/, NEW_BACKEND_URL);
        }
        return originalOpen.apply(this, [method, url, ...args]);
    };
})();
