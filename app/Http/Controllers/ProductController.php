<?php
namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $productsQuery = Product::query();

        # Capturing the total count before applying filters
        $totalCount = $productsQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $productsQuery->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
            );
        }

        # Filtered Count
        $filteredCount = $productsQuery->count();

        $perPage = (int) ($request->perPage ?? 10);

        # Fetch All the Records
        if ($perPage === -1) {
            $allProducts = $productsQuery->latest()->get()->map(fn($product) => [
                'id'                           => $product->id,
                'name'                         => $product->name,
                'description'                  => $product->description,
                'price'                        => $product->price,
                'featured_image'               => $product->featured_image,
                'featured_image_original_name' => $product->featured_image_original_name,
                'created_at'                   => $product->created_at->format('d M Y'),
            ]);

            $products = [
                'data'     => $allProducts,
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];

        } else {
            $products = $productsQuery->latest()->paginate($perPage)->withQueryString();
            $products->getCollection()->transform(fn($product) => [
                'id'                           => $product->id,
                'name'                         => $product->name,
                'description'                  => $product->description,
                'price'                        => $product->price,
                'featured_image'               => $product->featured_image,
                'featured_image_original_name' => $product->featured_image_original_name,
                'created_at'                   => $product->created_at->format('d M Y'),
            ]);
        }

        return Inertia::render('products/index', [
            'products'      => $products,
            'filters'       => $request->only(['search', 'perPage']),
            'totalCount'    => $totalCount,
            'filteredCount' => $filteredCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     * @param ProductFormRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProductFormRequest $request)
    {
        try {
            $featuredImage             = null;
            $featuredImageOriginalName = null;

            if ($request->file('featured_image')) {
                $featuredImage             = $request->file('featured_image');
                $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                $featuredImage             = $featuredImage->store('products', 'public');
            }

            $product = Product::create([
                'name'                         => $request->name,
                'description'                  => $request->description,
                'price'                        => $request->price,
                'featured_image'               => $featuredImage,
                'featured_image_original_name' => $featuredImageOriginalName,
            ]);

            if ($product) {
                return redirect()->route('products.index')->with('success', 'Product created successfully.');
            }

            return redirect()->back()->with('error', 'Unable to create product. Please try again!');

        } catch (Exception $e) {
            Log::error('Product creation failed: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isView'  => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isEdit'  => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product)
    {
        try {
            if ($product) {
                $product->name        = $request->name;
                $product->description = $request->description;
                $product->price       = $request->price;

                if ($request->file('featured_image')) {
                    $featuredImage             = $request->file('featured_image');
                    $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                    $featuredImage             = $featuredImage->store('products', 'public');

                    $product->featured_image               = $featuredImage;
                    $product->featured_image_original_name = $featuredImageOriginalName;
                }

                $product->save();

                return redirect()->route('products.index')->with('success', 'Product updated successfully.');
            }
            return redirect()->back()->with('error', 'Unable to update product. Please try again!');

        } catch (Exception $e) {
            Log::error('Product update failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product) {
                $product->delete();

                return redirect()->back()->with('success', 'Product deleted successfully.');
            }
            return redirect()->back()->with('error', 'Unable to delete product. Please try again!');

        } catch (Exception $e) {
            Log::error('Product deletion failed: ' . $e->getMessage());
        }
    }
}
