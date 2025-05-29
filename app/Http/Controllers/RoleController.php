<?php
namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use App\Models\Permission;
use Illuminate\Support\Str;
use App\Http\Requests\RoleRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions')->latest()->paginate(10);

        $permissions = Permission::get()->groupBy('module');

        return Inertia::render('roles/index', [
            'roles'       => $roles,
            'permissions' => $permissions,
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
    public function store(RoleRequest $request)
    {
        $role = Role::create([
            'label'       => $request->label,
            'name'        => Str::slug($request->label),
            'description' => $request->description,
        ]);

        if ($role) {
            $role->syncPermissions($request->permissions);

            return redirect()->route('roles.index')->with('success', 'Role created successfully with Permissions!');
        }
        return redirect()->back()->with('error', 'Unable to create Role with permissions. Please try again!');
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
    public function update(RoleRequest $request, Role $role)
    {
        if ($role) {
            $role->label       = $request->label;
            $role->name        = Str::slug($request->label);
            $role->description = $request->description;

            $role->save();

            # Update the permissions
            $role->syncPermissions($request->permissions);

            return redirect()->route('roles.index')->with('success', 'Role updated successfully with Permissions!');
        }
        return redirect()->back()->with('error', 'Unable to update Role with permissions. Please try again!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if ($role) {
            $role->delete();

            return redirect()->route('roles.index')->with('success', 'Role deleted successfully!');
        }
        return redirect()->back()->with('error', 'Unable to delete Role. Please try again!');
    }
}
