import { getRewardsByPolla, saveRewards } from '../../src/hooks/reward/useReward';
import { RewardService } from '../../src/components/services/reward.service';

jest.mock('../../src/components/services/reward.service');

describe('useReward', () => {
    it('should fetch rewards by polla ID', async () => {
        const pollaId = 1;
        const mockRewards = [
            { id: 1, name: 'First Prize', description: 'First Prize Description', image: 'image1.png', position: 1, pollaId },
        ];
        RewardService.prototype.getRewardByPolla = jest.fn().mockResolvedValue(mockRewards);

        const result = await getRewardsByPolla(pollaId);

        expect(RewardService.prototype.getRewardByPolla).toHaveBeenCalledWith(pollaId);
        expect(result).toEqual(mockRewards);
    });

    it('should save rewards', async () => {
        const rewards = [
            { name: 'First Prize', description: 'First Prize Description', image: 'image1.png', position: 1, pollaId: 1 },
        ];
        RewardService.prototype.saveRewards = jest.fn().mockResolvedValue(undefined);

        await expect(saveRewards(rewards)).resolves.not.toThrow();
        expect(RewardService.prototype.saveRewards).toHaveBeenCalledWith(rewards);
    });

    it('should handle errors when fetching rewards by polla ID', async () => {
        const pollaId = 1;
        const mockError = new Error('Failed to fetch rewards');
        RewardService.prototype.getRewardByPolla = jest.fn().mockRejectedValue(mockError);

        await expect(getRewardsByPolla(pollaId)).rejects.toThrow(mockError);
    });

    it('should handle errors when saving rewards', async () => {
        const rewards = [
            { name: 'First Prize', description: 'First Prize Description', image: 'image1.png', position: 1, pollaId: 1 },
        ];
        const mockError = new Error('Failed to save rewards');
        RewardService.prototype.saveRewards = jest.fn().mockRejectedValue(mockError);

        await expect(saveRewards(rewards)).rejects.toThrow(mockError);
    });
});
