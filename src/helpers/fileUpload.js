export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No hay arichivos.')
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dyjsa002n/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'aeteria');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });
        console.log(resp);

        if ( !resp.ok ) throw new Error('No se puso subir la imagen.');
        const cloudResp = await resp.json();
        console.log(cloudResp)
        return cloudResp;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}