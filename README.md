# Recipe App

Welcome to the Recipe App! This is a project developed with the goal of creating a platform for sharing and discovering high-quality recipes. As a pastry chef, I understand the challenges of finding reliable and professional recipes. This app aims to bridge that gap and provide a platform where everyone can access and cook like a pro.

# Motivation

The idea for this project originated from my own experiences in the culinary world. I wanted to create a space where people, whether professional chefs or home cooks, could access a diverse range of reliable and well-crafted recipes. By sharing my knowledge and passion for cooking, I hope to make the culinary experience enjoyable and accessible to everyone.

# Project Overview

## Features

Recipes: Browse a collection of recipes with detailed instructions and ingredients.
Categories: Organize recipes into categories for easy navigation.
Users: Create an account, log in, and contribute recipes to the community.

## Technology Stack

TypeORM: Utilizes various relationships (ManyToOne, OneToMany) to model complex database relationships.
Express.js: A backend framework for handling HTTP requests.
TRPC (Typed RPC): A typed RPC library used for communication between the client and server.
Database: Implements a relational database to store recipes, users, categories.

## Getting Started

1. Clone the repository to your local machine.
2. 3. Install dependencies using npm install.

`npm install`

3. Setup `.env` files in `server` based on `.env.example` files.

```bash
Note: This project focuses on the backend functionality, and there is currently few frontend. The backend provides a robust foundation, and frontend development is considered in the future.
```

## Tests

Go to cd server

```bash
npm run test
```

# Future Development

The Recipe App is an evolving project, and future developments may include:

Review System: Allowing users to leave reviews and ratings for recipes.
Comments: Adding a comment section for users to share their tips and experiences.
Frontend: Developing a user-friendly frontend to enhance the overall user experience.
Feel free to contribute, suggest improvements, or share your favorite recipes to make this platform even better! Happy cooking!
