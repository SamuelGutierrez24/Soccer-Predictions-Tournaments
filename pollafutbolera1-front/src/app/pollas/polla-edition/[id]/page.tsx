"use client"
//import { use } from 'react';
import  Step1EditPolla  from './step1EditPolla';
import Step2EditPolla from './step2EditPolla';
import Step3EditPolla from './step3EditPolla';
//import { useRouter } from 'next/navigation'
import { useUpdatePollaContext } from '../../../../context/updatePolla';
//import { Reward } from '@/src/interfaces/reward.interface';
//import { set } from 'date-fns';
import { pollaService } from '@/src/apis';
import { useParams } from 'next/navigation';

function PollaEditionPage() {
  const { id } = useParams() as { id?: string }
  if (!id) return <div>Loading…</div>

  const params = { id }
  
  //const router = useRouter();

  const {
    step,
    //nextStep,
    //prevStep,
    logo,
    startDate,
    endDate,
    isPrivate,
    exactlyScore,
    winnerSelector,
    winnerTeam,
    awardTitle,
    awardDescription,
    awardImage,
    teamWithMostGoals,
    rewardId,
    tournament_id,
    company,
    position,
    platformId
    //position
    
  } = useUpdatePollaContext();

  //const [rewards, setRewards] = useState<Reward>();

  const onSubmit = async () => {
    event?.preventDefault();
    const payload = {
      startDate: startDate ? new Date(startDate).toISOString() : '',
      endDate: endDate ? new Date(endDate).toISOString() : '',
      isPrivate: isPrivate,
      //color: color || '',
      imageUrl: Array.isArray(logo) ? logo.map(file => file.name).join(', ') : logo || '',
      //tournamentId: tournamentId || null,
      platformConfig: {
        id: platformId,
        exactScore: exactlyScore,
        matchWinner: winnerSelector,
        tournamentChampion: winnerTeam,
        teamWithMostGoals,
      },
      tournamentId: tournament_id?.id,
      company: company?.id,
      rewards: awardTitle.map((title, index) => ({
        id: rewardId[index],
        name: title,
        description: awardDescription[index],
        image: awardImage[index],
        position: position[index],
      }))
    };

    await pollaService.updatePolla(params.id, JSON.parse(JSON.stringify(payload)))
      .then((response) => {
        console.log('Polla updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating poll:', error);
      }
      );
  }

  return (
    <div className="h-full">
      <form>
        {step === 1 && <Step1EditPolla params={params} />}
        {step === 2 && <Step2EditPolla params={params} />}
        {step === 3 && <Step3EditPolla onSubmit={onSubmit} params={params} />}
      </form>
    </div>
  );
}

export default PollaEditionPage;