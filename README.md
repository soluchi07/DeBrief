# DeBrief – Fandom Social Media Web App

**Author:** Soluchi Fidel-Ibeabuchi
**Role:** Developer | Computer Science Student @ Howard University

DeBrief is a **modern fandom-focused social platform** built with **React, Supabase, and Tailwind CSS**. It allows users to share posts about TV shows, movies, and fandoms with **episode-specific discussions, spoiler tagging, authentication, and community-driven interactions**.

This project was developed as my **final submission for a Web Development course**, and demonstrates my ability to design and implement **full-stack applications with authentication, CRUD functionality, and responsive UI/UX.** Deployed on Netlify at 'https://debrief.netlify.app/'

---

## 🚀 Features

### Core Functionality

* **Post Creation:** Users can create posts with a title, optional text, and image URL.
* **Dynamic Feed:** Home feed displays all posts with creation time, title, and upvotes.
* **Sorting & Search:** Users can sort posts by creation time or upvotes, and search by title.
* **Post Pages:** Each post has its own page with detailed content, images, comments, and interactions.
* **User Interaction:** Users can comment and upvote posts, with real-time updates.
* **Edit/Delete:** Authors can edit or delete their own posts.

### Extended Functionality

* **Authentication:** Secure email/password authentication with Supabase.
* **Authorization:** Row-Level Security ensures only post authors can edit/delete.
* **Spoiler Control:** Posts can be flagged for spoilers and tagged with season/episode.
* **Filters:** Users can filter posts by spoiler flags for safe browsing.
* **Dark Mode:** Customizable light/dark theme toggle.
* **Loading States:** Smooth loading animations while fetching data.
* **Sidebar Navigation:** Quick access to fandoms, homepage, and post history.

---

## 🛠️ Tech Stack

* **Frontend:** React, React Router
* **Backend & Database:** Supabase (Postgres, RLS policies, Authentication)
* **Hosting/Deployment:** Netlify
* **Version Control:** Git/GitHub

---

## 📸 Demo & Walkthrough

### Screenshots

<img src='./landing-page.png' alt='Landing Page' />  
<img src='./signin-page.png' alt='Sign-in Page' />  

### Core Functionality in Action

* **Home Page:**

  <img src='./home-page.gif' alt='Home Page' />  

* **Adding Posts:**

  <img src='./add-post.gif' alt='Add Post' />  

* **Authentication & Authorization:**

  <img src='./authorization.gif' alt='Login Required' />  

<img src='./authorized-edits-only.gif' alt='Edit Restrictions' />  

* **Editing & Deleting:**

  <img src='./edit-post.gif' alt='Edit Post' />  

<img src='./more-w-posts.gif' alt='Post Deletion & Interactions' />  

---

## ⚡ Challenges & Learnings

During development, I strengthened my skills in:

* **Authentication & Security:** Implemented RLS policies to enforce data ownership and prevent unauthorized access.
* **State Management:** Balanced client-side vs. server-side rendering for efficient filtering and sorting.
* **Async Handling:** Debugged Supabase queries, managed loading states, and avoided null/undefined errors.
* **UI/UX:** Designed responsive layouts with dark mode and intuitive navigation.
* **Routing & Data Flow:** Integrated React Router with protected routes while ensuring smooth user experience.

This project highlighted the importance of **secure coding practices, scalable database design, and user-centric features** in modern web apps.

---

## 📚 Key Takeaways

* Built and deployed a **production-ready full-stack web application** with about **10 registered users** as a solo developer.
* Applied **industry-standard tools** (React, Supabase) to solve real-world problems.
* Gained hands-on experience with **authentication, CRUD operations, and state management**.
* Strengthened **problem-solving, debugging, and UI/UX design skills**.

---

## 📄 License

Apache 2.0 License © 2025 Soluchi Fidel-Ibeabuchi
