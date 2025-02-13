# pokemon-app-backend

# Pokémon App - Full-Stack Application

A full-stack application that lets you browse, view details, and manage a list of Pokémon—built with a modern tech stack and deployed live on Vercel (frontend) and Render (backend).

[![chrome-capture-2025-2-13.gif](https://i.postimg.cc/HL8H7Cm2/chrome-capture-2025-2-13.gif)](https://postimg.cc/Y47TJZhG)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demos](#live-demos)
- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a full-stack Pokémon management app developed as part of a home assignment. The app uses the [PokéAPI](https://pokeapi.co/) to fetch and display the first 150 Pokémon, and it allows users to view details, search, filter, and manage their list of favorite Pokémon.

The frontend is built with **React** (using Vite and TypeScript) and leverages libraries such as **Zustand** for state management, **Framer Motion** for animations (including a custom Pokéball animation), and **Tailwind CSS** for styling. It efficiently handles API calls and manages loading/error states to provide a smooth user experience.

The backend is built with **NestJS** (utilizing ExpressJS for response handling) and **MongoDB** for data persistence. It acts as a proxy for the PokéAPI and manages a unique favorites system, including user mapping and a fun twist with randomly assigned Pokémon Master characters.

---

## Features

### Frontend
- **Pokémon List:** Displays the first 150 Pokémon in a scrollable list.
- **Detail View:** Clicking on a Pokémon shows its abilities, types, and evolution options (if available).
- **Favorites Management:** Add or remove Pokémon from your favorites via API calls.
- **Filtering & Search:** Filter the list to show only favorites and search Pokémon by name.
- **Animations:** Smooth transitions and a custom Pokéball animation powered by Framer Motion.
- **State Management & Caching:** Efficient data fetching and caching to minimize API calls and improve performance.
- **Responsive UI:** Clean, modern design built with Tailwind CSS.

### Backend
- **NestJS & ExpressJS:** Robust server built with NestJS that leverages ExpressJS for handling response methods.
- **API Proxy:** Routes requests from the frontend to the PokéAPI.
- **Favorites API Endpoints:**
  - **GET** `/api/pokemon` - Fetches the first 150 Pokémon.
  - **GET** `/api/pokemon/{id}` - Retrieves detailed information for a specific Pokémon.
  - **GET** `/api/favorites` - Returns the list of favorite Pokémon.
  - **POST** `/api/favorites` - Adds a Pokémon to the favorites list.
  - **DELETE** `/api/favorites` - Removes a Pokémon from the favorites list.
- **Unique User Mapping:**
  - Uses a UUID sent from the frontend to create and map unique users.
  - For new users, a random Pokémon Master character is assigned from a JSON file.
  - The Pokémon Master’s image URL is sent in the header of the fetch favorites API response.
- **Data Persistence:** Favorites are stored in MongoDB.
- **Package Management:** Uses `pnpm` for efficient dependency management.

---

## Tech Stack

### Frontend
- **React 19** with **Vite**
- **TypeScript**
- **Zustand** for state management
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **UUID** for generating unique user IDs
- **pnpm** for package management

### Backend
- **NestJS** (with **ExpressJS**)
- **MongoDB** for data persistence
- **pnpm** for package management

---

## Live Demos

- **Frontend Live Demo:** [pokemon-app-frontend-nine.vercel.app](https://pokemon-app-frontend-nine.vercel.app)
- **Backend Live Demo:** [pokemon-app-backend-vwf5.onrender.com/api](https://pokemon-app-backend-vwf5.onrender.com/api)

---

## Installation

### Frontend

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/pokemon-app-frontend.git
   cd pokemon-app-frontend


 #### Install dependencies
```bash
pnpm install
```

#### Configure Environment Variables
Create a `.env` file in the root of the project with the following content:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Firefly
```

#### Start the development server
```bash
pnpm dev
```

#### Visit the app in your browser
```
http://localhost:3000
```

### Backend

#### Clone the repository
```bash
git clone https://github.com/msuhaibk/pokemon-app-backend.git
cd pokemon-app-backend
```

#### Install dependencies
```bash
pnpm install
```

#### Configure Environment Variables
Create a `.env` file in the root of the project with the following content:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/pokemon
POKEMON_API_URL=https://pokeapi.co/api/v2
NODE_ENV=dev
```

#### Start the server
```bash
pnpm start
```

---

## API Endpoints

### Pokémon Data
- **GET** `/api/pokemon` - Fetches the first 150 Pokémon.
- **GET** `/api/pokemon/{id}` - Retrieves detailed information for the Pokémon with the specified ID.

### Favorites Management
- **GET** `/api/favorites` - Returns the current list of favorite Pokémon.
  - Response header includes a URL for a random Pokémon Master character assigned to the unique user.
- **POST** `/api/favorites` - Adds a Pokémon to the favorites list.
  - **Body:** JSON payload including Pokémon details and a user UUID.
- **DELETE** `/api/favorites` - Removes a Pokémon from the favorites list.
  - **Body:** JSON payload including the Pokémon ID and user UUID.

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Firefly
```

### Backend (.env)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/pokemon
POKEMON_API_URL=https://pokeapi.co/api/v2
NODE_ENV=dev
```

---

## Additional Features

### Unique User Mapping
- When a user adds a favorite, the backend checks for a UUID sent from the frontend.
- If the user is new, a unique user profile is created, and a random Pokémon Master character is assigned from a JSON file.
- The assigned Pokémon Master’s image URL is returned in the header of the favorites API response.

### Enhanced UI/UX
- Custom Pokéball animation using **Framer Motion** provides an engaging visual experience.
- Smooth loading and error states ensure a responsive and robust user experience.
- Efficient state management and caching reduce unnecessary API calls and improve performance.

### Search & Filter Capabilities
- Integrated search functionality allows users to quickly find Pokémon by name.
- Filtering options enable users to view only their favorite Pokémon.

---

## Contributing
Contributions are welcome! If you have any suggestions, bug fixes, or enhancements, please feel free to open an issue or submit a pull request.

---

## License
This project is licensed under the **MIT License**.

---

**Developed by [Mohammad Suhaib Khan](https://github.com/msuhaibk)**



