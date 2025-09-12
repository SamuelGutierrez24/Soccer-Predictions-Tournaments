import { createPolla } from '../../src/hooks/polla/usePolla';
import { PollaService } from '../../src/components/services/polla.service';

jest.mock('../../src/components/services/polla.service');

describe('createPolla', () => {
    it('should create a polla and return categories', async () => {
        const mockCategory = { name: 'Test Category' };
        const mockResponse = { data: 'mockData' };
        
        PollaService.prototype.createPolla = jest.fn().mockResolvedValue(mockResponse);

        const result = await createPolla(mockCategory);

        expect(PollaService.prototype.createPolla).toHaveBeenCalledWith(mockCategory);
        expect(result).toEqual(mockResponse);
    });

    it('should handle error when creating a polla', async () => {
        const mockCategory = { name: 'Test Category' };
        const mockError = new Error('Failed to create polla');
        
        PollaService.prototype.createPolla = jest.fn().mockRejectedValue(mockError);

        await expect(createPolla(mockCategory)).rejects.toThrow(mockError);

        expect(PollaService.prototype.createPolla).toHaveBeenCalledWith(mockCategory);
    });
});
