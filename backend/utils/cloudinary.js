const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dt0scyuqu',
    api_key: '511856321234729',
    api_secret: 'xW_Jea-tztEGp8Zd50NtGcMVTvA',
});

exports.uploadToCloudinary = (filePath) => {
    return cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
    });
};