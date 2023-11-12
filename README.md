# What are you going to do today?

## Frontend

SPA web application, designed for mobile phones. Uses React, TypeScript and Chakra UI component library. Connects directly to Firestore to access and modify data.

### Development

Use Node 20

Setup connection to Firebase by putting the connection details from console to `.env` file:

```
VITE_FIREBASE_AUTH={....}
```

```
npm install
npm run dev
```

## Backend

The current backend is used to prepopulate Firebase's Firestore with example data, and to simulate movement of other users.

For development you need Firebase credentials and access, ask from the team.