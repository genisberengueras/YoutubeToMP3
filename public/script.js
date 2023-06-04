const descargarBtn = document.getElementById('descargarBtn');
const urlInput = document.getElementById('urlInput');
const filename = document.getElementById('fileName');


descargarBtn.addEventListener('click', async () => {
    const url = urlInput.value;
    const name = filename.value;
    if (url) {
        try {
            const response = await fetch('/descargar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${name}.mp3`;
                link.click();
                URL.revokeObjectURL(downloadUrl);
            } else {
                console.log('Error al descargar el archivo');
            }
        } catch (error) {
            console.log(error);
        }
    }
});




// const descargarBtn = document.getElementById('descargarBtn');
// const urlInput = document.getElementById('urlInput');
//
// descargarBtn.addEventListener('click', async () => {
//     const url = urlInput.value;
//     if (url) {
//         try {
//             const response = await fetch('/descargar', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ url })
//             });
//             const data = await response.json();
//             if (data.success) {
//                 window.location.href = data.downloadUrl;
//             } else {
//                 console.log(data.error);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
// });