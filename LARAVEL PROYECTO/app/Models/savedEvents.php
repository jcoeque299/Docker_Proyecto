<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class savedEvents extends Model
{
    use HasFactory;

    protected $table = "saved_events";

    public function user() {
        return $this->belongsTo(User::class);
    }
}
