import { Toaster } from "sonner";
import HomePage from "./pages/home-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "./pages/login-page";
import ProductListPage from "./pages/product-list-page";
import ProductDetailPage from "./pages/product-detail-page";
import CartPage from "./pages/cart-page";
import ProfilePage from "./pages/profile-page";
import SignupPage from "./pages/signup-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "./components/protected-route";
import { AuthProvider } from "./context/auth-context";

const queryClient = new QueryClient();

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/cart" element={<CartPage />} />
			</Route>
			<Route path="/products" element={<ProductListPage />} />
			<Route path="/products/:id" element={<ProductDetailPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<BrowserRouter>
				<AuthProvider>
					<Router />
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
