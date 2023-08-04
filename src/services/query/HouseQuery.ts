import { useMutation, useQuery, useQueryClient } from "react-query";
import { peopleService } from "src/services/People.service";
import { houseService } from "../House.service";
import { Houses } from "src/types/house";

const baseURL =
  "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app/";
const HouseService = houseService.getInstance(baseURL);

export function HouseQuery() {
  return useQuery(["house"], () => HouseService.getHouses(), {
    // enabled: !!id,
    // select: (r) => r,
    refetchOnWindowFocus: false,
  });
}

export function DataMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    // {
    //   mutationFn: (data: Houses) => {
    //     return HouseService.postHouse(data);
    //   },
    // },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["house"]);
        //   enqueueSnackbar('La tabla de visitas esta actualizada!', {
        //       variant: 'success',
        //   });
      },
      onError: (err) => {
        console.error("[datos house]", err);
        //   enqueueSnackbar('Error al mostrar tabla!', {
        //       variant: 'error',
        //   });
      },
    }
  );
}
