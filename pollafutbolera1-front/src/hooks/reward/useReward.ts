import { RewardService, RewardSaveDTO } from "../../components/services/reward.service";

export const getRewardsByPolla = async (pollaId: number) => {
  const service = new RewardService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
  const rewards = await service.getRewardByPolla(pollaId);
  return rewards;
}

export const saveRewards = async (rewards: RewardSaveDTO[]) => {
  const service = new RewardService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
  await service.saveRewards(rewards);
}

export const updateRewards = async (pollaId: number, rewards: RewardSaveDTO[]) => {
  const service = new RewardService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
  await service.updateRewards(pollaId, rewards);
}
