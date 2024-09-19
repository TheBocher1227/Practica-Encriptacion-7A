<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelacionEstaciones extends Model
{
    use HasFactory;
    protected $table = 'relacionestaciones';
    

    protected $fillable=[
        'user_id',
        'estacion_id'
    ];
}
