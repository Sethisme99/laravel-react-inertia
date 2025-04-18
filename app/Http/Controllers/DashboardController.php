<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResources;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {

        $user = auth()->user();
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();
        $totalProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();
        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();
        $activeTasks = TaskResources::collection($activeTasks);
            
            return inertia(
                'Dashboard',
                compact(
                    'totalPendingTasks',
                    'myPendingTasks',
                    'totalProgressTasks',
                    'myProgressTasks',
                    'totalCompletedTasks',
                    'myCompletedTasks',
                    'activeTasks',
                )
                );
    }
}
