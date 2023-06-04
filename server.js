const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

app.post('/descargar', async (req, res) => {
    const videoUrl = req.body.url;

    try {
        const info = await ytdl.getInfo(videoUrl);

        if (info) {
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

            if (audioFormat) {
                const uniqueName = `${Date.now()}.mp3`;
                const output = `./public/${uniqueName}`;
                const stream = ytdl(videoUrl, {
                    quality: audioFormat.itag,
                    filter: 'audioonly',
                });

                const chunks = [];
                let receivedSize = 0;

                stream.on('data', (chunk) => {
                    receivedSize += chunk.length;
                    chunks.push(chunk);
                });

                stream.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    res.set('Content-Disposition', `attachment; filename=${uniqueName}`);
                    res.set('Content-Type', 'audio/mpeg');
                    res.set('Content-Length', receivedSize);
                    res.send(buffer);
                });

            } else {
                res.status(400).json({ success: false, error: 'No se pudo encontrar un formato de audio válido' });
            }
        } else {
            res.status(400).json({ success: false, error: 'URL de video de YouTube inválida' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Error al descargar el video' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});