#!/bin/bash

# Obtengo la ruta absoluta del proyecto.
root="$(pwd)"

# Evaluo el comando entrante

case "$1" in

    install)
        echo "[install] instalando dependencias en backend"
        cd $root/backend
        npm install

        echo "[install] instalando dependencias en frontend"
        cd $root/frontend
        npm install
    ;;

    start)
        echo "[run] corriendo backend"
        cd $root/backend
        npm run build
        forever start ./dist/main.js

        echo "[run] corriendo frontend"
        cd $root/frontend
        npm run serve
        # npm run build
        # forever start ./index.js
    ;;

    stop)
        forever stopall
    ;;

    *)
        echo "Comando no reconocido"
    ;;

esac