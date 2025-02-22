// index.js

// (Optional) API endpoint constant – currently unused in favor of blog.json
const NOROFF_API_BLOGPOSTS = "https://v2.api.noroff.dev/blog/posts";

// --------------------
// Carousel Setup
// --------------------
// Static data for the three carousel slides. Each slide includes an H2, H3, a paragraph (truncated to 150 characters), and a button.
const carouselSlides = [
  {
    title: "Welcome to Our Site",
    subtitle: "Discover Amazing Content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.",
    buttonText: "Learn More",
    buttonLink: "#learn-more",
  },
  {
    title: "Latest Trends",
    subtitle: "Stay Updated",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    buttonText: "Discover",
    buttonLink: "#discover",
  },
  {
    title: "Join Our Community",
    subtitle: "Connect and Grow",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    buttonText: "Get Started",
    buttonLink: "#get-started",
  },
];

// Helper function to create a carousel slide element.
function createCarouselSlide(slide) {
  const slideElem = document.createElement("div");
  slideElem.classList.add("carousel-slide");
  slideElem.innerHTML = `
    <h2>${slide.title}</h2>
    <h3>${slide.subtitle}</h3>
    <p>${slide.content.substring(0, 150)}...</p>
    <a href="${slide.buttonLink}">
      <button>${slide.buttonText}</button>
    </a>
  `;
  return slideElem;
}

// --------------------
// Blog Posts Fetching
// --------------------
async function fetchBlog() {
  try {
    // Change 'blog.json' to NOROFF_API_BLOGPOSTS if needed.
    const response = await fetch("blog.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched JSON data:", data);

    if (!Array.isArray(data)) {
      console.error("ERROR: Data is not an array", data);
      throw new Error("Data is not an array");
    }

    // Map the data into a blog posts array.
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

// Helpefunction to create a blog card element.
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

// --------------------
// DOM Content Loaded: Initialize Carousel and Blog Grid
// --------------------
document.addEventListener("DOMContentLoaded", async () => {
  // --- Carousel Section ---
  const carouselContainer = document.getElementById("carouselContainer");
  if (!carouselContainer) {
    console.error("ERROR: 'carouselContainer' div is missing in index.html");
    return;
  }
  carouselContainer.innerHTML = "";
  // Create and append each carousel slide.
  carouselSlides.forEach((slide) => {
    carouselContainer.appendChild(createCarouselSlide(slide));
  });

  // --- Blog Posts Grid Section ---
  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) {
    console.error("ERROR: 'blogContainer' div is missing in index.html");
    return;
  }
  blogContainer.innerHTML = "";

  // Fetch blog posts and limit to 12 items.
  const blogPosts = await fetchBlog();
  const limitedBlogPosts = blogPosts.slice(0, 12);

  // Create a document fragment for performance.
  const fragment = document.createDocumentFragment();
  limitedBlogPosts.forEach((post) => {
    fragment.appendChild(createBlogCard(post));
  });

  blogContainer.appendChild(fragment);
});
