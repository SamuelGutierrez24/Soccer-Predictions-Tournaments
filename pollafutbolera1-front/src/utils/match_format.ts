export function formatMatchDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}


export function formatMatchTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}


export function getMatchStatusText(status: string): string {
  switch(status) {
    case 'scheduled':
      return 'Upcoming';
    case 'in_progress':
      return 'Live';
    case 'finished':
      return 'Full Time';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}