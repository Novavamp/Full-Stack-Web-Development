import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Function to ensure the posts directory exists
function ensurePostsDirectory() {
	const postsDir = path.join(__dirname, "posts");
	if (!fs.existsSync(postsDir)) {
		fs.mkdirSync(postsDir);
	}
}

// Function to read all posts
function readPosts() {
	const posts = [];
	const postsDir = path.join(__dirname, "posts");
	ensurePostsDirectory(); // Ensure the directory exists
	const files = fs.readdirSync(postsDir);

	files.forEach((file) => {
		const filePath = path.join(postsDir, file);
		try {
			const post = fs.readFileSync(filePath, "utf8");
			const [title, author, detail] = post.split("\n");
			if (title && author && detail) {
				// Ensure all parts are present
				posts.push({ title, author, detail });
			} else {
				console.warn(`File ${file} is not in the expected format.`);
			}
		} catch (err) {
			console.error(`Error reading file ${file}:`, err);
		}
	});

	return posts;
}

// Routes
app.get("/", (req, res) => {
	const posts = readPosts();
	res.render("index.ejs", { posts });
});

app.get("/post", (req, res) => {
	res.render("post-blog.ejs");
});

app.get("/blog", (req, res) => {
	const postId = parseInt(req.query.postId, 10);
	const posts = readPosts();
	const post = posts[postId];
	if (post) {
		res.render("blog.ejs", { post });
	} else {
		res.status(404).send("Post not found");
	}
});

app.get("/posts", (req, res) => {
	const posts = readPosts(); // Get the list of posts
	res.render("posts.ejs", { posts }); // Pass the posts variable to the template
});

app.post("/submit", (req, res) => {
	const { title, author, "post-detail": detail } = req.body;
	if (title && author && detail) {
		const postsDir = path.join(__dirname, "posts");
		ensurePostsDirectory(); // Ensure the directory exists
		const postCount = fs.readdirSync(postsDir).length;
		const filename = `post${postCount + 1}.txt`;
		const content = `${title}\n${author}\n${detail}`;
		try {
			fs.writeFileSync(path.join(postsDir, filename), content);
			res.redirect("/");
		} catch (err) {
			console.error("Error writing file:", err);
			res.status(500).send("Error saving post");
		}
	} else {
		res.status(400).send("All fields are required");
	}
});

// Route to show the edit form for a post
app.get('/edit-post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index, 10);
    const posts = readPosts();
    const post = posts[postIndex];
    if (post) {
        res.render('edit-post.ejs', { post, index: postIndex });
    } else {
        res.status(404).send('Post not found');
    }
});

// Route to handle the post update
app.post('/update-post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index, 10);
    const { title, author, 'post-detail': detail } = req.body;
    if (title && author && detail) {
        const postsDir = path.join(__dirname, 'posts');
        ensurePostsDirectory(); // Ensure the directory exists
        const files = fs.readdirSync(postsDir);
        const filename = files[postIndex];
        const content = `${title}\n${author}\n${detail}`;
        try {
            fs.writeFileSync(path.join(postsDir, filename), content);
            res.redirect('/');
        } catch (err) {
            console.error('Error updating file:', err);
            res.status(500).send('Error updating post');
        }
    } else {
        res.status(400).send('All fields are required');
    }
});

// Route to handle the post deletion
app.post('/delete-post/:index', (req, res) => {
    const postIndex = parseInt(req.params.index, 10);
    const postsDir = path.join(__dirname, 'posts');
    ensurePostsDirectory(); // Ensure the directory exists
    const files = fs.readdirSync(postsDir);
    const filename = files[postIndex];
    try {
        fs.unlinkSync(path.join(postsDir, filename));
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting file:', err);
        res.status(500).send('Error deleting post');
    }
});


app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
