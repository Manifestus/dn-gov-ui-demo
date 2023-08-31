import { useMutation, useQuery, useQueryClient } from "react-query";
import { transactionService } from "../Transaction.service";

const baseURL =
  "https://dn-gov-api-demo-5ywbgrw4ia-uc.a.run.app/";
const TransactionService = transactionService.getInstance(baseURL);

export function TransactionQuery(id: string) {
  return useQuery(["invoice"], () => TransactionService.getTransaction(id), {
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
        queryClient.invalidateQueries(["invoice"]);
        //   enqueueSnackbar('La tabla de visitas esta actualizada!', {
        //       variant: 'success',
        //   });
      },
      onError: (err) => {
        console.error("[datos invoice]", err);
        //   enqueueSnackbar('Error al mostrar tabla!', {
        //       variant: 'error',
        //   });
      },
    }
  );
}
