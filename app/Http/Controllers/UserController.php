<?php
namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser     = Auth::user();
        $authUserRole = $authUser->roles->first()?->name;

        $userQuery = User::with('roles')->latest();

        if (! in_array($authUserRole, ['super-admin', 'admin', 'editor', 'user'])) {
            abort(403, 'Unauthorized Access Prevented');
        }

        # Admin
        if ($authUserRole === 'admin') {
            $userQuery->whereDoesntHave('roles', function ($q) {
                $q->where('name', 'super-admin');
            });
        } elseif ($authUserRole === 'editor') {
            $userQuery->whereHas('roles', function ($q) {
                $q->whereIn('name', ['editor', 'user']);
            });
        } elseif ($authUserRole === 'user') {
            $userQuery->whereHas('roles', function ($q) {
                $q->whereIn('name', ['user']);
            });
        }

        $users = $userQuery->paginate(10);

        # Roles listing
        $rolesQuery = Role::query();

        if ($authUserRole === 'super-admin') {
            $rolesQuery->whereIn('name', ['super-admin', 'admin', 'editor', 'user']);
        } elseif ($authUserRole === 'admin') {
            $rolesQuery->whereIn('name', ['admin', 'editor', 'user']);
        } elseif ($authUserRole === 'editor') {
            $rolesQuery->whereIn('name', ['editor', 'user']);
        } else {
            $rolesQuery->whereIn('name', ['user']);
        }

        $roles = $rolesQuery->get();

        return Inertia::render('users/index', [
            'users' => $users,
            'roles' => $roles,
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
    public function store(UserRequest $request)
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($user) {
            $user->syncRoles($request->roles);

            return redirect()->route('users.index')->with('success', 'User created with roles');
        }
        return redirect()->back()->with('error', 'Unable to create User. Please try again!');
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
    public function update(UserRequest $request, User $user)
    {
        if ($user) {
            $user->name  = $request->name;
            $user->email = $request->email;

            $user->save();

            $user->syncRoles($request->roles);
            return redirect()->route('users.index')->with('success', 'User created with roles');
        }
        return redirect()->back()->with('error', 'Unable to create User. Please try again!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user) {
            $user->delete();
            return redirect()->route('users.index')->with('success', 'User deleted with roles');
        }
        return redirect()->back()->with('error', 'Unable to delete User. Please try again!');
    }
}
