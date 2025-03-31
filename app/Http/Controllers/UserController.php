<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if(request("name")){
            $query->where("name", "linke", "%" .request("name") . "%");
        }
        if(request("email")){
            $query->where("email", "like", "%" .request("email") . "%");
        }

        $users = $query
        ->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachside(1);

        return inertia("User/Index",[
            "users" => UserCrudResource::collection($users),
            'queryParams' =>request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        
        /** @var \Illuminate\Http\UploadedFile $image */

        $image = $data['image'] ?? null;
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);

        if($image){
            $data['image_path'] = $image->store('user/' .Str::random(), 'public');
        }
        User::create($data);

        return to_route('user.index')
        ->with('success', 'User was created');

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit',[
            'user'=> new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        // 1. Authorization Check (Critical!)
        $this->authorize('update', $user); // Uses UserPolicy
    
        // 2. Password Handling
        $data = $request->validated();
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }
    
        // 3. Update User
        $user->update($data);
    
        // 4. Redirect
        return to_route('user.index')
               ->with('success', "User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // 1. Authorization check (requires UserPolicy)
        $this->authorize('delete', $user);
        
        // 2. Store name before deletion (good practice)
        $name = $user->name;
        
        // 3. Soft delete the user
        $user->delete();
        
        // 4. Redirect with success message
        return to_route('user.index')
               ->with('success', "User \"$name\" was deactivated");
    }
}
