<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<style>
    .confirm {
        border: 1px solid black;
        border-radius: 15px;
        background: #fc2302;
        width: 300px; 
        height: 400px; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .confirm img {
        max-width: 100%;
        max-height: 100%;
    }
</style>

<div class="confirm">
    <img src="{{ asset('images/logo.png') }}" alt="Imagen">
    <p style="text-align: center;">Felicidades tu cuenta se ha activado con exito</p>
</div>
</body>
</html>