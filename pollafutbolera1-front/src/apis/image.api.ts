import axios, { AxiosInstance } from 'axios';

export class ImageApi {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'X-TenantId': '777'
            },
            timeout: 10000,
            timeoutErrorMessage: 'Request timed out',
        });
    }

    uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await this.axios.post('/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // Assuming the API returns the URL of the uploaded image
        } catch (err) {
            throw err;
        }
    }
    
    extractPublicId = async (url: string, token: string) => {
        try {
            const response = await this.axios.get('/images/extractPublicId', {
                params: { url },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Assuming the API returns the public ID
        }
        catch (err) {
            throw err;
        }
    }

    deleteImage = async (publicId: string, token: string) => {
        try {
            // Use query parameter instead of request body
            const response = await this.axios.delete('/images/delete', {
                params: { publicId: publicId }, // Changed from data to params
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}