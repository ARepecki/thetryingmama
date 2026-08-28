// ===============================
// The Trying Mama - main.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // NEWSLETTER SIGNUP HANDLER
    // -------------------------------
    const form = document.getElementById("newsletter-form");
    const message = document.getElementById("newsletter-message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();

            if (!name || !email) {
                message.style.color = "red";
                message.textContent = "Please enter both your name and email.";
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                message.style.color = "red";
                message.textContent = "Please enter a valid email address.";
                return;
            }

            message.style.color = "green";
            message.textContent = `Thank you, ${name}! You're now subscribed to The Trying Mama newsletter.`;
            form.reset();
        });
    }

    // -------------------------------
    // BLOG FROM JSON
    // -------------------------------
    const blogPreview = document.getElementById("blog-preview");
    const blogList = document.getElementById("blog-list");
    const postTitle = document.getElementById("post-title");

    fetch("data/blog.json")
        .then(res => res.json())
        .then(posts => {
            if (blogPreview) {
                blogPreview.innerHTML = posts.slice(0, 2).map(post => `
                    <div class="card">
                        <h3>${post.title}</h3>
                        <p class="tagline">${post.date}</p>
                        <p>${post.excerpt}</p>
                        <a class="btn" href="post.html?id=${post.id}">Read More</a>
                    </div>
                `).join("");
            }

            if (blogList) {
                blogList.innerHTML = posts.map(post => `
                    <div class="card">
                        <h2>${post.title}</h2>
                        <p class="tagline">${post.date}</p>
                        <p>${post.excerpt}</p>
                        <a class="btn" href="post.html?id=${post.id}">Read More</a>
                    </div>
                `).join("");
            }

            if (postTitle) {
                const params = new URLSearchParams(window.location.search);
                const id = params.get("id");
                const post = posts.find(p => String(p.id) === String(id)) || posts[0];

                document.getElementById("post-title").textContent = post.title;
                document.getElementById("post-date").textContent = post.date;
                document.getElementById("post-content").innerHTML =
                    post.content.map(paragraph => `<p>${paragraph}</p>`).join("");
            }
        })
        .catch(() => {
            if (blogPreview) blogPreview.textContent = "Unable to load blog posts.";
            if (blogList) blogList.textContent = "Unable to load blog posts.";
        });

    // -------------------------------
    // RECIPES FROM JSON
    // -------------------------------
    const recipeList = document.getElementById("recipe-list");
    const recipeTitle = document.getElementById("recipe-title");
    const featuredRecipe = document.getElementById("featured-recipe");

    fetch("data/recipes.json")
        .then(res => res.json())
        .then(recipes => {
            if (recipeList) {
                recipeList.innerHTML = recipes.map(recipe => `
                    <div class="card">
                        <h2>${recipe.title}</h2>
                        <p class="tagline">${recipe.description}</p>
                        <a class="btn" href="recipe.html?id=${recipe.id}">View Recipe</a>
                    </div>
                `).join("");
            }

            if (recipeTitle) {
                const params = new URLSearchParams(window.location.search);
                const id = params.get("id");
                const recipe = recipes.find(r => String(r.id) === String(id)) || recipes[0];

                document.getElementById("recipe-title").textContent = recipe.title;
                document.getElementById("recipe-description").textContent = recipe.description;
                document.getElementById("recipe-image").src = recipe.image;

                document.getElementById("recipe-ingredients").innerHTML =
                    recipe.ingredients.map(item => `<li>${item}</li>`).join("");

                document.getElementById("recipe-instructions").innerHTML =
                    recipe.instructions.map(step => `<li>${step}</li>`).join("");
            }

            if (featuredRecipe) {
                const recipe = recipes[0];
                featuredRecipe.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p class="tagline">${recipe.description}</p>
                    <a class="btn" href="recipe.html?id=${recipe.id}">View Recipe</a>
                `;
            }
        })
        .catch(() => {
            if (recipeList) recipeList.textContent = "Unable to load recipes.";
            if (featuredRecipe) featuredRecipe.textContent = "Unable to load featured recipe.";
        });
});
