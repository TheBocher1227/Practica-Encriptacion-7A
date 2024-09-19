<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email en activacion</title>
    <style>
        /* Estilos personalizados para el correo */
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #A5F9EA  ;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Link de activacion</h1>
        <p>Hola,</p>
        <p>Ingresa a este enlace : <href>{{$signedroute}}</href></p>
        <p>Por favor, ingresa al enlace para activar tu cuenta.</p>
        <p>¡Gracias!</p>
    </div>
</body>
</html>
