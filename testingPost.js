// temp file create a new blog post

fetch("/api/blogs", {
  method: "POST",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title: "My titile", content: "My content" }),
});

() => {
    return fetch("/api/blogs", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
}
