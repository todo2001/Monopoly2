function tabellone(schede) {
    schede.forEach(schede => {
        ctx.lineWidth = 3;
        ctx.fillStyle = "#D7E5CE";
        ctx.fillRect(schede.x, schede.y, schede.width, schede.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(schede.x, schede.y, schede.width, schede.height);


        if (schede.tipo == "Proprietà") {
            if (schede.asse == "1") {
                const rectX = schede.x;
                const rectY = 90;
                ctx.fillStyle = schede.colore;
                ctx.fillRect(rectX, rectY, 70, 20);
                ctx.strokeRect(rectX, rectY, 70, 20);
            }

            if (schede.asse == '2') {
                const rectX = schede.x;
                const rectY = schede.y;
                ctx.fillStyle = schede.colore;
                ctx.fillRect(rectX, rectY, 20, 70);
                ctx.strokeRect(rectX, rectY, 20, 70);
            }

            if (schede.asse == '3') {
                const rectX = schede.x;
                const rectY = 740;
                ctx.fillStyle = schede.colore;
                ctx.fillRect(rectX, rectY, 70, 20);
                ctx.strokeRect(rectX, rectY, 70, 20);
            }

            if (schede.asse == '4') {
                const rectX = 90;
                const rectY = schede.y;
                ctx.fillStyle = schede.colore;
                ctx.fillRect(rectX, rectY, 20, 70);
                ctx.strokeRect(rectX, rectY, 20, 70);
            }
        }
        const maxWidth = schede.width - 20; // Larghezza massima disponibile per il testo
        let word = schede.nome.split(' '); // Suddivide il testo in parole
        const lineHeight = 16; // Altezza della singola riga di testo
        let x = schede.x + 10; // Posizione x iniziale
        let y = schede.y + 50;
        // Itera su ogni parola
        word.forEach(word => {
            const textWidth = ctx.measureText(word).width; // Calcola la larghezza della parola

            // Se la larghezza della parola supera la larghezza disponibile, vado a capo
            if (x + textWidth > schede.x + schede.width) {
                x = schede.x + 10; // Torno all'inizio della riga
                y += lineHeight; // Passo alla riga successiva
            }


            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.fillText(word, x, y);

            // Aggiorna la posizione x per la prossima parola
            x += textWidth + 5; // Aggiungo uno spazio tra le parole
        });

        if (schede.tipologia == "Stazione") {
            var image = new Image();
            image.src = "img/treno.png";
            image.onload = function () {
                ctx.drawImage(image, schede.x + 20, schede.y + 70, 61, 49);
                ctx.fillStyle = 'black';
                ctx.font = '12px Arial';
                ctx.fillText(schede.nome, schede.x + 10, schede.y + 20);
            };
        }


    });
};
