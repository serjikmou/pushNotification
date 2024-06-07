console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log(`Push Recieved...${JSON.stringify(e.data.json())}`);

  self.registration.showNotification(data.title, {
    body: "Buzz! Buzz!",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    actions: [
      { action: "open_google", title: "باز کردن گوگل" },
      { action: "Button two", title: "Button two text" },
    ],
  });
});

self.addEventListener("notificationclick", function (event) {
  if (event.action === "open_google") {
    event.waitUntil(clients.openWindow("https://www.google.com"));
  }
});
