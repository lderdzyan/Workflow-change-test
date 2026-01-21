type GetImageSrc = (path: string) => string;
export const getImageSrc: GetImageSrc = (path) => window.MS_CDN_URL + "/" + path;
