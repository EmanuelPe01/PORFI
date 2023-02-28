<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mandados_lista extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_mandado',
        'user_id',
        'descripcion',
        'ubicacion',
        'longitud',
        'latitud',
        'status'
    ];

    public function mandados_listas(){
        return $this->belongsTo(Users::class);
    }
}
