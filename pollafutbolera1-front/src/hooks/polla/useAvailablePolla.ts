import { PollaApi } from "@/src/apis/polla.api";
import { Polla } from "@/src/interfaces/polla/polla.interface";
import { useEffect, useState } from "react";
import { useCompanyFromCookies } from "@/src/hooks/user/useCompanyFromCookies";

export function useAvailablePolla(){

    const [data, setData] = useState<Polla[]>([]);
    const company = useCompanyFromCookies();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const service = new PollaApi(
              process.env.NEXT_PUBLIC_API_BASE_URL || ''
            );
            const pollas= await service.getPollasByCompanyId(company);  
            const pollasFormateadas = pollas.map((polla: Polla) => ({
              ...polla  
            }));
            setData(pollas);
          } catch (err) {
            console.error('error: ', err)
          }
        };
        fetchData();
      }, [company]);
    
      return { data};
} 