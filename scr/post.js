async function fetchPost() {
  // ✅ Added a function to encapsulate the fetch operation
  try {
    const response = await fetch("/api/posts/1"); // ✅ Now response is defined after an HTTP fetch
    if (!response.ok) {
      // ✅ Check if the response is successful
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const postData = await response.json();
    console.log("✅ Fetched Blog Post:", postData);

    // ✅ Extracting post data
    const post = postData.data;

    // ✅ Check if HTML elements exist before updating
    const titleElement = document.getElementById("postTitle");
    const bodyElement = document.getElementById("postBody");
    const imageElement = document.getElementById("postImage");
    const idElement = document.getElementById("postId"); // Display ID

    if (titleElement && bodyElement && imageElement && idElement) {
      titleElement.innerText = post.title;
      bodyElement.innerText = post.body;
      imageElement.src = post.media.url;
      imageElement.alt = post.media.alt;
      idElement.innerText = `Post ID: ${post.id}`; // ✅ Show ID
    } else {
      console.error(" HTML elements missing in post.html");
    }
  } catch (error) {
    // ✅ Added error handling
    console.error(" Fetch Error:", error);
  }
}
// ✅ Call function on page load
fetchPost();
