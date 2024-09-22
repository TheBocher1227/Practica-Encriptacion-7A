<?php

namespace App\Http\Controllers;

use App\Events\NewChat;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Chat;

class ChatController extends Controller
{
    private $encryption_key;
    private $cipher;

    public function __construct()
    {
        $this->encryption_key = 'mySuperSecretKey12345'; // Define tu clave secreta
        $this->cipher = 'AES-256-CBC';
    }

    // Método para encriptar el mensaje
    private function encryptMessage($message)
    {
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->cipher)); // Generamos IV
        $encrypted = openssl_encrypt($message, $this->cipher, $this->encryption_key, 0, $iv); // Encriptamos

        // El mensaje encriptado + IV se codifican en base64 y se concatenan con "::"
        return base64_encode($encrypted . '::' . base64_encode($iv));
    }


    public function store(Request $request)
    {
        $validate = Validator::make(
            $request->all(),
            [
                "user_id" => "required",
                "mensaje" => "required",
            ]
        );

        if ($validate->fails()) {
            return response()->json([
                "msg" => "El mensaje no se pudo recibir",
                "data" => $validate->errors()
            ], 422);
        }

        $chat = new Chat();
        $chat->user_id = $request->user_id;
        $chat->mensaje = $request->mensaje; // Encripta el mensaje
        $chat->save();

        event(new NewChat($chat));

        return response()->json(['msg' => 'Mensaje recibido y encriptado', 'data' => $chat], 200);
    }
}
