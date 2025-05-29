<?php
namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Exception;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'DESC')->paginate(10)->withQueryString();
        $categories->getCollection()->transform(fn($category) => [
            'id'          => $category->id,
            'name'        => $category->name,
            'description' => $category->description,
            'image'       => $category->image,
            'created_at'  => $category->created_at->format('d M Y'),
        ]);

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            $categoryImagePath = null;

            if ($request->hasFile('image')) {
                $categoryImagePath = $request->file('image')->store('categories', 'public');
            }

            $category = Category::create([
                'name'        => $request->name,
                'slug'        => Str::slug($request->name),
                'description' => $request->description,
                'image'       => $categoryImagePath,
            ]);

            if ($category) {
                return redirect()->route('categories.index')->with('success', 'Category created successfully.');
            }

            return redirect()->back()->with('error', 'Unable to create category. Please try again.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create category');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        try {
            $categoryImagePath = null;

            if ($request->hasFile('image')) {
                $categoryImagePath = $request->file('image')->store('categories', 'public');
            }

            $category->name        = $request->name;
            $category->slug        = Str::slug($request->name);
            $category->description = $request->description;

            if ($categoryImagePath) {
                $category->image = $categoryImagePath;
            }

            $category->save();

            if ($category) {
                return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
            }

            return redirect()->back()->with('error', 'Unable to update category. Please try again.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update category');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            if ($category) {
                $category->delete();
                return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
            }

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete category');
        }
    }
}
