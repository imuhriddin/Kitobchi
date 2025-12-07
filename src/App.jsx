import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Navbar from "./components/Navbar";

// layouts
import RootLayout from "./layout/RootLayout";

// pages
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import BookDetails from "./pages/BookDetails";
import Error from "./pages/Error";
import Announcement from "./pages/Announcement";
import Profile from "./pages/Profile";
import CategoryPage from "./components/CategoryPage";
import LoginForm from "./Auth/LoginForm"; // ✅ LoginForm import qilindi
import RegisterPage from "./Auth/RegisterPage"; // ✅ LoginForm import qilindi

// 🔥 qo‘shilgan ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/books/:id",
          element: <BookDetails />,
        },
        {
          path: "/announcement",
          element: <Announcement />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/category/:categoryPath",
          element: <CategoryPage />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
