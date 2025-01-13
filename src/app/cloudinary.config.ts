import { Cloudinary } from '@cloudinary/url-gen';

export const cloudinaryInstance = new Cloudinary({
    cloud: {
        cloudName: 'da4si8eaz'
    },
    url: {
        secure: true // Asegúrate de usar HTTPS
    }
});
