import { PollaService } from '../../src/components/services/polla.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

describe('PollaService', () => {
    let mock: MockAdapter;
    let service: PollaService;

    beforeEach(() => {
        Cookies.set('currentUser', JSON.stringify({ token: 'test-token' })); // Ensure a valid token is set
        mock = new MockAdapter(axios); // Initialize MockAdapter
        service = new PollaService('http://localhost:8000/pollafutbolera');
    });

    afterEach(() => {
        mock.reset(); // Reset mock after each test
        Cookies.remove('currentUser');
    });

    it('should fetch all pollas', async () => {
        const pollas = [{ id: 1, name: 'Polla 1' }];
        mock.onGet('/polla').reply(200, pollas);

        const result = await service.getAllPollas();
        expect(result).toEqual(pollas);
    });

    it('should fetch a polla by ID', async () => {
        const polla = { id: 1, name: 'Polla 1' };
        mock.onGet('/polla/1').reply(200, polla);

        const result = await service.getPollaById('1');
        expect(result).toEqual(polla);
    });

    it('should create a new polla', async () => {
        const newPolla = {
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            isPrivate: true,
            imageUrl: 'http://example.com/image.png',
            color: '#FFFFFF',
            platformConfig: {
                tournamentChampion: 10,
                teamWithMostGoals: 5,
                exactScore: 3,
                matchWinner: 1,
            },
            tournamentId: 1,
        };
        const createdPolla = { id: 1, ...newPolla };

        mock.onPost('/polla/save').reply(200, createdPolla);

        const result = await service.createPolla(newPolla);
        expect(result).toEqual(createdPolla);
    });

    it('should handle errors when fetching all pollas', async () => {
        mock.onGet('/polla').reply(500);

        await expect(service.getAllPollas()).rejects.toThrow();
    });

    it('should handle errors when fetching a polla by ID', async () => {
        mock.onGet('/polla/1').reply(500);

        await expect(service.getPollaById('1')).rejects.toThrow();
    });

    it('should handle errors when creating a polla', async () => {
        const newPolla = {
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            isPrivate: true,
            imageUrl: 'http://example.com/image.png',
            color: '#FFFFFF',
            platformConfig: {
                tournamentChampion: 10,
                teamWithMostGoals: 5,
                exactScore: 3,
                matchWinner: 1,
            },
            tournamentId: 1,
        };

        mock.onPost('/polla/save').reply(500);

        await expect(service.createPolla(newPolla)).rejects.toThrow();
    });
});
