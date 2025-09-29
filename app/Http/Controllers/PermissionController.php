<?php
namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissionsQuery = Permission::query();

        # Capturing the total count before applying filters
        $totalCount = $permissionsQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $permissionsQuery->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
            );
        }

        # Filtered Count
        $filteredCount = $permissionsQuery->count();

        $perPage = (int) ($request->perPage ?? 10);

        # Fetch All the Records
        if ($perPage === -1) {
            $allPermissions = $permissionsQuery->latest()->get()->map(fn($permission) => [
                'id'          => $permission->id,
                'module'      => $permission->module,
                'name'        => $permission->name,
                'label'       => $permission->label,
                'description' => $permission->description,
                'created_at'  => $permission->created_at->format('d M Y'),
            ]);

            $permissions = [
                'data'     => $allPermissions,
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];

        } else {
            $permissions = $permissionsQuery->latest()->paginate($perPage)->withQueryString();
            $permissions->getCollection()->transform(fn($permission) => [
                'id'          => $permission->id,
                'module'      => $permission->module,
                'name'        => $permission->name,
                'label'       => $permission->label,
                'description' => $permission->description,
                'created_at'  => $permission->created_at->format('d M Y'),
            ]);
        }

        return Inertia::render('permissions/index', [
            'permissions'   => $permissions,
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionRequest $request)
    {
        $permission = Permission::create([
            'module'      => $request->module,
            'label'       => $request->label,
            'name'        => Str::slug($request->label),
            'description' => $request->description,
        ]);

        if ($permission) {
            return redirect()->route('permissions.index')->with('success', 'Permission created successfully!');
        }
        return redirect()->back()->with('error', 'Unable to create Permission. Please try again!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PermissionRequest $request, Permission $permission)
    {
        if ($permission) {
            $permission->module      = $request->module;
            $permission->label       = $request->label;
            $permission->name        = Str::slug($request->label);
            $permission->description = $request->description;

            $permission->save();
            return redirect()->route('permissions.index')->with('success', 'Permission updated successfully!');
        }
        return redirect()->back()->with('error', 'Unable to update Permission. Please try again!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        if ($permission) {
            $permission->delete();
            return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully!');
        }

        return redirect()->back()->with('error', 'Unable to delete Permission. Please try again!');
    }
}
