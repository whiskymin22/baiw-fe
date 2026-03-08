import * as React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductGrid from "@/components/ProductGrid";
import SearchInput from "@/components/SearchInput";
import CategoryFilter, { type Category } from "@/components/CategoryFilter";
import GenderFilter, { type Gender } from "@/components/GenderFilter";
import Pagination from "@/components/Pagination";
import PerPageSelector from "@/components/PerPageSelector";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";

const DEFAULT_PRODUCTS_PER_PAGE = 12;

export default function ProductListPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const urlPage = parseInt(searchParams.get("page") || "1");
	const urlPerPage = parseInt(
		searchParams.get("perPage") || DEFAULT_PRODUCTS_PER_PAGE.toString()
	);
	const urlSearch = searchParams.get("search") || "";
	const urlCategory = (searchParams.get("category") as Category) || "all";
	const urlGender = (searchParams.get("gender") as Gender) || "all";

	const [searchQuery, setSearchQuery] = React.useState(urlSearch);
	const [debouncedSearch, setDebouncedSearch] = React.useState(urlSearch);
	const [category, setCategory] = React.useState<Category>(urlCategory);
	const [gender, setGender] = React.useState<Gender>(urlGender);
	const [currentPage, setCurrentPage] = React.useState(urlPage);
	const [productsPerPage, setProductsPerPage] =
		React.useState(urlPerPage);

	const updateURL = React.useCallback(
		(params: {
			page?: number;
			perPage?: number;
			search?: string;
			category?: Category;
			gender?: Gender;
		}) => {
			const newParams = new URLSearchParams(searchParams);

			if (params.page !== undefined) {
				if (params.page === 1) newParams.delete("page");
				else newParams.set("page", params.page.toString());
			}
			if (params.perPage !== undefined) {
				if (params.perPage === DEFAULT_PRODUCTS_PER_PAGE)
					newParams.delete("perPage");
				else newParams.set("perPage", params.perPage.toString());
			}
			if (params.search !== undefined) {
				if (params.search === "") newParams.delete("search");
				else newParams.set("search", params.search);
			}
			if (params.category !== undefined) {
				if (params.category === "all") newParams.delete("category");
				else newParams.set("category", params.category);
			}
			if (params.gender !== undefined) {
				if (params.gender === "all") newParams.delete("gender");
				else newParams.set("gender", params.gender);
			}

			setSearchParams(newParams);
		},
		[searchParams, setSearchParams]
	);

	const {
		data: productsResponse,
		isLoading,
		isFetching,
		error,
		refetch,
	} = useProducts({
		page: currentPage,
		limit: productsPerPage,
		search: debouncedSearch,
		category: category === "all" ? undefined : category,
		gender: gender === "all" ? undefined : gender,
	});

	const products = productsResponse?.data || [];
	const totalPages = productsResponse?.meta?.totalPages || 0;
	const totalItems = productsResponse?.meta?.totalItems || 0;
	const hasResults = products.length > 0;
	const isUpdating = isFetching && !isLoading;
	const hasActiveFilters =
		searchQuery.trim().length > 0 ||
		category !== "all" ||
		gender !== "all" ||
		productsPerPage !== DEFAULT_PRODUCTS_PER_PAGE;

	React.useEffect(() => {
		setSearchQuery(urlSearch);
		setCategory(urlCategory);
		setGender(urlGender);
		setCurrentPage(urlPage);
		setProductsPerPage(urlPerPage);
		setDebouncedSearch(urlSearch);
	}, [urlSearch, urlCategory, urlGender, urlPage, urlPerPage]);

	React.useEffect(() => {
		const trimmedSearch = searchQuery.trim();
		const debounceTimer = window.setTimeout(() => {
			setDebouncedSearch(trimmedSearch);
			if (trimmedSearch !== urlSearch) {
				setCurrentPage(1);
				updateURL({ search: trimmedSearch, page: 1 });
			}
		}, 400);
		return () => window.clearTimeout(debounceTimer);
	}, [searchQuery, updateURL, urlSearch]);

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleCategoryChange = (value: Category) => {
		setCategory(value);
		setCurrentPage(1);
		updateURL({ category: value, page: 1 });
	};

	const handleGenderChange = (value: Gender) => {
		setGender(value);
		setCurrentPage(1);
		updateURL({ gender: value, page: 1 });
	};

	const handleClearFilters = () => {
		setSearchQuery("");
		setCategory("all");
		setGender("all");
		setCurrentPage(1);
		setProductsPerPage(DEFAULT_PRODUCTS_PER_PAGE);
		updateURL({
			search: "",
			category: "all",
			gender: "all",
			page: 1,
			perPage: DEFAULT_PRODUCTS_PER_PAGE,
		});
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		updateURL({ page });
		window.scrollTo({
			top: 0,
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
		});
	};

	const handlePerPageChange = (perPage: number) => {
		setProductsPerPage(perPage);
		setCurrentPage(1);
		updateURL({ perPage, page: 1 });
	};

	return (
		<div className="min-h-screen bg-stone-50 flex flex-col">
			<Header />
			<main className="flex-1" id="main-content">
				<div className="bg-white border-b border-stone-200">
					<div className="max-w-7xl mx-auto px-4 py-6">
						<div className="mb-6">
							<SearchInput
								value={searchQuery}
								onChange={handleSearchChange}
								placeholder="Search products…"
								className="w-full max-w-2xl"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<button
									onClick={handleClearFilters}
									className="text-sm text-stone-600 hover:text-stone-900 font-medium disabled:text-stone-400 disabled:cursor-not-allowed"
									disabled={!hasActiveFilters}
								>
									Clear filters
								</button>
								<CategoryFilter value={category} onChange={handleCategoryChange} />
								<GenderFilter value={gender} onChange={handleGenderChange} />
							</div>

							<div className="flex items-center justify-between">
								{!isLoading && !error && productsResponse && totalItems > 0 && (
									<div className="text-sm text-stone-600">
										Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
										{Math.min(
											currentPage * productsPerPage,
											productsResponse.meta?.totalItems ?? totalItems
										)}{" "}
										of {totalItems} products
									</div>
								)}
								{isUpdating && (
									<div className="text-sm text-stone-500">Updating…</div>
								)}
								<PerPageSelector
									value={productsPerPage}
									onChange={handlePerPageChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{isLoading ? (
					<div className="max-w-7xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-xl h-96 animate-pulse border border-stone-200"
							/>
						))}
					</div>
				) : error ? (
					<div className="container mx-auto py-12 text-center">
						<h3 className="text-lg font-medium text-stone-900 mb-2">
							Error loading products
						</h3>
						<p className="text-stone-600">
							{error instanceof Error ? error.message : "Something went wrong"}
						</p>
						<Button className="mt-4" onClick={() => refetch()}>
							Try again
						</Button>
					</div>
				) : hasResults ? (
					<ProductGrid products={products} className="bg-transparent" />
				) : (
					<div className="container mx-auto py-12 text-center">
						<h3 className="text-lg font-medium text-stone-900 mb-2">
							No products found
						</h3>
						<p className="text-stone-600">
							Try adjusting your search or filters.
						</p>
						{hasActiveFilters && (
							<Button className="mt-4" onClick={handleClearFilters}>
								Clear filters
							</Button>
						)}
					</div>
				)}

				{!isLoading && !error && totalPages > 1 && (
					<div className="container mx-auto py-12">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
