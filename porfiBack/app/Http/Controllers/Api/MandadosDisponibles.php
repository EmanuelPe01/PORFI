<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Mandados_lista;
use Symfony\Component\HttpFoundation\Response;

class MandadosDisponibles extends Controller
{
    public function registerMandado(Request $request){
        //validación de los datos
        $request->validate([
            'nombre_mandado' => 'required',
            'descripcion' => 'required',
            'ubicacion' => 'required'
        ]);

        $mandado = new Mandados_lista();
        $mandado->nombre_mandado = $request->nombre_mandado;
        $mandado->user_id = $request->user_id; //Mandar desde front
        $mandado->descripcion = $request->descripcion;
        $mandado->ubicacion = $request->ubicacion;
        $mandado->longitud = $request->longitud;
        $mandado->latitud = $request->latitud;
        $mandado->status = $request->status; //Mandar desde front
        $mandado->save();

        return response($mandado, Response::HTTP_CREATED);
    }

    public function getAllMandados(){
        $mandados = Mandados_lista::all();
        return response()->json([
            "mandados" => $mandados
        ]);
    }

    public function getOneMandado ($id) {
        $sql = "SELECT mandados_listas.*, users.name, users.last_name, users.phone FROM mandados_listas inner join users on mandados_listas.user_id = users.id where mandados_listas.id = " . $id . ";";
        $mandado = DB::select($sql);
        return $mandado;
    }

    public function getMyMandado($id){
        $sql = "SELECT * FROM mandados_listas where user_id = " . $id;
        $mandados = DB::select($sql);
        return $mandados;
    }

    public function getOtherMandado($id){
        $sql = "SELECT * FROM mandados_listas where user_id != " . $id;
        $mandados = DB::select($sql);
        return $mandados;
    }
}
