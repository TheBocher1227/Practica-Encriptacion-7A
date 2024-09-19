<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Sensores extends Model
{
    use HasFactory;
    protected $connection ='mongodb';
    protected $collection = 'data-sensores';

    public $timestamps = false;

    protected $fillable =[
     'nombre',
	'unidad'.
	'clave',
	'descripcion',
	'isf'
    ];
    



    
}
