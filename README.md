# TripBuddy Frontend

TripBuddy is a web application for planning and sharing trips. This repository contains the frontend built with Next.js and integrated with NextAuth for authentication.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/arekminajj/tripbuddy-frontend.git
    cd tripbuddy-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root directory with the following content:

```env
BASE_URL=http://localhost:5000
NEXTAUTH_SECRET=<your-nextauth-secret>
```

- `BASE_URL` should be the URL of your backend (usually `http://localhost:5000` if you are running it locally).
- `NEXTAUTH_SECRET` is used for securing JWT tokens in authentication. You can generate a random secret using:

    ```bash
    openssl rand -base64 32
    ```

## Running the Project

1. **Start the frontend server**:
    ```bash
    npm run dev
    ```

2. The app will be available at `http://localhost:3000`.

## Self-hosting the Backend

To run the application, you need to host the backend yourself. You can find the backend repository here:

[TripBuddy Backend](https://github.com/arekminajj/tripbuddy-backend)

Follow the setup instructions in the backend repository, and make sure it is running at `http://localhost:5000` or adjust the `BASE_URL` in your `.env` accordingly.
