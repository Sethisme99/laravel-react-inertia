<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = ['image_path', 'name', 'description', 'status', 'due_date', 'created_by', 'updated_by'];
    

    //Model Relationships

    //One-to-Many Relationship with Task
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    //Many-to-One Relationship with User (Created By)
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by')->withTrashed();
    }

    //Many-to-One Relationship with User (Updated By)
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by')->withTrashed();
    }

    //still show the soft deleted user
    public function user(){
        return $this->belongsTo(User::class)->withTrashed();
    }


    //delete task when the delete the project:
    
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($project) {
            $project->tasks()->delete();
    });}

}
