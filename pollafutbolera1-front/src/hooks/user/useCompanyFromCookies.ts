// En un componente o hook del lado del cliente
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface CurrentUser {
  company: string;
}

export const useCompanyFromCookies = (): number => {
  const [companyID, setCompany] = useState<number>(-1);

  useEffect(() => {
    const currentUserCookie = Cookies.get('currentUser');
    if (currentUserCookie) {
      try {
        const currentUser: CurrentUser = JSON.parse(currentUserCookie);
        setCompany(Number(currentUser.company));
      } catch (error) {
        console.error('Error parsing currentUser cookie', error);
      }
    }
  }, [Cookies.get('currentUser')]);

  return companyID;
};