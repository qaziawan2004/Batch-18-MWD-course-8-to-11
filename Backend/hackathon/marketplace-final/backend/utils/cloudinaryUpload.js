import cloudinary from '../config/cloudinary.js';

export function uploadBuffer(fileBuffer, folder = 'markethub/products') {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        );

        stream.end(fileBuffer);
    });
}
