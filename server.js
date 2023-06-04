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




// const express = require('express');
// const ytdl = require('ytdl-core');
// const app = express();
// const port = 8080;
//
// app.use(express.json());
// app.use(express.static('public'));
//
// app.post('/descargar', async (req, res) => {
//     const videoUrl = req.body.url;
//
//     try {
//         const info = await ytdl.getInfo(videoUrl);
//
//         if (info) {
//             const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//
//             if (audioFormat) {
//                 const uniqueName = `${Date.now()}.mp3`;
//                 const output = `./public/${uniqueName}`;
//                 const stream = ytdl(videoUrl, {
//                     quality: audioFormat.itag,
//                     filter: 'audioonly',
//                 });
//
//                 const chunks = [];
//                 let receivedSize = 0;
//
//                 stream.on('data', (chunk) => {
//                     receivedSize += chunk.length;
//                     chunks.push(chunk);
//                 });
//
//                 stream.on('end', () => {
//                     const buffer = Buffer.concat(chunks);
//                     res.set('Content-Disposition', `attachment; filename=${uniqueName}`);
//                     res.set('Content-Type', 'audio/mpeg');
//                     res.set('Content-Length', receivedSize);
//                     res.send(buffer);
//                 });
//             } else {
//                 res.json({ success: false, error: 'No se pudo encontrar un formato de audio válido' });
//             }
//         } else {
//             res.json({ success: false, error: 'URL de video de YouTube inválida' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, error: 'Error al descargar el video' });
//     }
// });
//
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });



// const express = require('express');
// const ytdl = require('ytdl-core');
// const fs = require('fs');
// const app = express();
// const port = 8080;
//
// app.use(express.json());
// app.use(express.static('public'));
//
// app.post('/descargar', async (req, res) => {
//     const videoUrl = req.body.url;
//
//     try {
//         const info = await ytdl.getInfo(videoUrl);
//
//         if (info) {
//             const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//
//             if (audioFormat) {
//                 const uniqueName = `${Date.now()}.mp3`;
//                 const output = `./public/${uniqueName}`;
//                 const stream = ytdl(videoUrl, {
//                     quality: audioFormat.itag,
//                     filter: 'audioonly',
//                 });
//
//                 stream.pipe(fs.createWriteStream(output));
//
//                 stream.on('end', () => {
//                     res.download(output, uniqueName, (err) => {
//                         if (err) {
//                             console.log(err);
//                             res.json({ success: false, error: 'Error al descargar el archivo' });
//                         } else {
//                             fs.unlink(output, (err) => {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                             });
//                         }
//                     });
//                 });
//             } else {
//                 res.json({ success: false, error: 'No se pudo encontrar un formato de audio válido' });
//             }
//         } else {
//             res.json({ success: false, error: 'URL de video de YouTube inválida' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, error: 'Error al descargar el video' });
//     }
// });
//
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });
//



// const express = require('express');
// const ytdl = require('ytdl-core');
// const fs = require('fs');
// const app = express();
// const port = 8080;
//
// app.use(express.json());
// app.use(express.static('public'));
//
// app.post('/descargar', async (req, res) => {
//     const videoUrl = req.body.url;
//
//     try {
//         const info = await ytdl.getInfo(videoUrl);
//
//         if (info) {
//             const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//
//             if (audioFormat) {
//                 const uniqueName = `${Date.now()}.mp3`;
//                 const output = `./public/${uniqueName}`;
//                 const stream = ytdl(videoUrl, {
//                     quality: audioFormat.itag,
//                     filter: 'audioonly',
//                 });
//
//                 stream.pipe(fs.createWriteStream(output));
//
//                 stream.on('end', () => {
//                     res.json({ success: true, downloadUrl: output, uniqueName });
//                 });
//             } else {
//                 res.json({ success: false, error: 'No se pudo encontrar un formato de audio válido' });
//             }
//         } else {
//             res.json({ success: false, error: 'URL de video de YouTube inválida' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, error: 'Error al descargar el video' });
//     }
// });
//
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });





// const express = require('express');
// const ytdl = require('ytdl-core');
// const fs = require('fs');
// const app = express();
// const port = 8080;
//
// app.use(express.json());
// app.use(express.static('public'));
//
// app.post('/descargar', async (req, res) => {
//     const videoUrl = req.body.url;
//
//     try {
//         const info = await ytdl.getInfo(videoUrl);
//
//         if (info) {
//             const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//
//             if (audioFormat) {
//                 const output = `./public/${Date.now()}.mp3`;
//                 const stream = ytdl(videoUrl, {
//                     quality: audioFormat.itag,
//                     filter: 'audioonly',
//                 });
//
//                 stream.pipe(fs.createWriteStream(output));
//
//                 stream.on('end', () => {
//                     res.json({ success: true, downloadUrl: output });
//                 });
//             } else {
//                 res.json({ success: false, error: 'No se pudo encontrar un formato de audio válido' });
//             }
//         } else {
//             res.json({ success: false, error: 'URL de video de YouTube inválida' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, error: 'Error al descargar el video' });
//     }
// });
//
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });



// const express = require('express');
// const YoutubeMp3Downloader = require('youtube-mp3-downloader');
// const app = express();
// const port = 8080;
//
// // Configuración de YoutubeMp3Downloader
// const YD = new YoutubeMp3Downloader({
//     ffmpegPath: '/usr/bin/ffmpeg', // Ruta al ejecutable de ffmpeg en tu sistema
//     outputPath: './public', // Carpeta de salida para los archivos descargados
//     youtubeVideoQuality: 'highestaudio', // Calidad del audio a descargar
//     queueParallelism: 2, // Número de descargas simultáneas permitidas
//     progressTimeout: 2000 // Intervalo de actualización del progreso de descarga en milisegundos
// });
//
// app.use(express.json());
// app.use(express.static('public'));
//
// app.post('/descargar', (req, res) => {
//     const videoUrl = req.body.url;
//
//     // Descarga del video en formato MP3
//     YD.download(videoUrl);
//
//     // Evento de finalización de descarga
//     YD.on('finished', (err, data) => {
//         if (err) {
//             return res.json({ success: false, error: 'Error al descargar el video' });
//         } else {
//             res.json({ success: true, downloadUrl: data.file });
//         }
//     });
//
//     // Evento de error de descarga
//     YD.on('error', (error) => {
//         return res.json({ success: false, error: 'Error al descargar el video' });
//     });
// });
//
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });





// const express = require('express');
// const ytdl = require('ytdl-core-discord');
// const download = require('downloadjs');
// const app = express();
// const port = 8080;
//
// app.use(express.json());
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.post('/descargar', async (req, res) => {
//     const videoUrl = req.body.url;
//     const info = await ytdl.getInfo(videoUrl);
//     if (info) {
//         const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//         if (format) {
//             const downloadUrl = format.url;
//             download(downloadUrl, 'audio.mp3', 'audio/mp3');
//             res.json({ success: true });
//         } else {
//             res.json({ success: false, error: 'No se pudo encontrar un formato de audio válido' });
//         }
//     } else {
//         res.json({ success: false, error: 'URL de video de YouTube inválida' });
//     }
// });
//
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });
