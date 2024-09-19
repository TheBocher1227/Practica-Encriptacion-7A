<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class value extends Model
{
    use HasFactory;
    protected $table = 'values';

    public $timestamps =false;
    

    protected $fillable=[
        'value'
    ];


}
