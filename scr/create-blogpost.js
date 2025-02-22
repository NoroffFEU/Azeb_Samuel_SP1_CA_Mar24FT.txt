const NOROFF_API_BLOGPOSTS_CREATE =
  "https://v2.api.noroff.dev/blog/posts/create";
async function createBlogPost() {
  const newPost = {
    title: "New Blog Title",
    body: "This is a dynamically created blog post.",
    tags: ["New", "Dynamic"],
    media: {
      url: "https://wudasi.com/newimage.jpg",
      alt: "New Image",
    },
    author: {
      name: "John Doe",
      email: "john@wudasi.com",
      bio: "Developer",
      avatar: {
        url: "https://wudasi.com/avatar.jpg",
        alt: "JD",
      },
      banner: {
        url: "https://wudasi.com/banner.jpg",
        alt: "AI banner",
      },
    },
  };

  try {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) throw new Error("Failed to create post");

    console.log("Post Created Successfully");
    getBlogPosts(); // Refresh posts
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
