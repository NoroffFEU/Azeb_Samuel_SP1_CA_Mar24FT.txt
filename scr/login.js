// index.js
const NOROFF_API_BLOGPOSTS = "https://v2.api.noroff.dev/blog/posts"; // (Unused here, but available if needed)

async function fetchBlog() {
  try {
    // Fetch blog data from the JSON file (change to NOROFF_API_BLOGPOSTS if needed)
    const response = await fetch("blog.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched JSON data:", data);

    // Validate that data is an array.
    if (!Array.isArray(data)) {
      console.error("ERROR: Data is not an array", data);
      throw new Error("Data is not an array");
    }

    // Map the data to a blog posts array.
    const blogPosts = data.map((item) => ({
      title: item.title || "Untitled Post",
      body: item.body || "No content available.",
      media: {
        url:
          (item.media && item.media.url) ||
          "https://placehold.co/600x400?text=Blog+Image",
        alt: (item.media && item.media.alt) || "Blog image",
      },
    }));

    return blogPosts;
  } catch (error) {
    console.error("ERROR: Could not fetch blogs", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) {
    console.error("ERROR: 'blogContainer' div is missing in index.html");
    return;
  }

  // Clear previous content
  blogContainer.innerHTML = "";

  const blogPosts = await fetchBlog();
  const fragment = document.createDocumentFragment();

  blogPosts.forEach((post) => {
    fragment.appendChild(createBlogCard(post));
  });

  blogContainer.appendChild(fragment);
});

// Helper function to create a blog card element.
function createBlogCard(post) {
  const blogCard = document.createElement("div");
  blogCard.classList.add("blog-card");

  blogCard.innerHTML = `
    <img src="${post.media.url}" alt="${post.media.alt}">
    <h3>${post.title}</h3>
    <p>${post.body.substring(0, 150)}...</p>
    <a href="post.html?name=${encodeURIComponent(post.title)}">Read More</a>
  `;
  return blogCard;
}
