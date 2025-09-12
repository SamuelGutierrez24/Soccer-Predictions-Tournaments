import { RewardService } from '../../src/components/services/reward.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

describe('RewardService', () => {
    let mock: MockAdapter;
    let service: RewardService;

    beforeEach(() => {
        Cookies.set('currentUser', JSON.stringify({ token: 'test-token' })); // Ensure cookie is set first
        mock = new MockAdapter(axios);
        service = new RewardService('http://localhost:8000/pollafutbolera');
    });

    afterEach(() => {
        mock.reset();
        Cookies.remove('currentUser');
    });

    it('should fetch rewards by polla ID', async () => {
        const pollaId = 1;
        const rewards = [
            { id: 1, name: 'First Prize', description: 'First Prize Description', image: 'image1.png', position: 1, pollaId },
        ];
        mock.onGet(`/reward/polla/${pollaId}`).reply(200, rewards);

        const result = await service.getRewardByPolla(pollaId);
        expect(result).toEqual(rewards);
    });

    it('should save rewards', async () => {
        const rewards = [
            { name: 'First Prize', description: 'First Prize Description', image: 'image1.png', position: 1, pollaId: 1 },
        ];
        mock.onPost('/reward/save').reply(200);

        await expect(service.saveRewards(rewards)).resolves.not.toThrow();
    });

    it('should handle errors when fetching rewards by polla ID', async () => {
        const pollaId = 1;
        mock.onGet(`/reward/polla/${pollaId}`).reply(500);

        await expect(service.getRewardByPolla(pollaId)).rejects.toThrow();
    });

    it('should handle errors when saving rewards', async () => {
        const rewards = [
            { name: 'First Prize', description: 'First Prize Description', image: 'image1.png', position: 1, pollaId: 1 },
        ];
        mock.onPost('/reward/save').reply(500);

        await expect(service.saveRewards(rewards)).rejects.toThrow();
    });
});
