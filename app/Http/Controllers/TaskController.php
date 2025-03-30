<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResources;
use App\Http\Resources\TaskResources;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        //Sorting:
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        //Filter:
        if(request("name")){
            $query->where("name", "like", "%". request("name"). "%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        }

        $tasks = $query
        ->orderBy($sortField, $sortDirection)
        ->orderBy('id', 'desc')
        ->paginate(10)
        ->onEachSide(1);

        return inertia("Task/Index",[
            "tasks" => TaskResources::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'projects'=>ProjectResources::collection($projects),
            'users'=>UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
