import { useMutation, useQuery, useQueryClient } from "react-query";
import { peopleService } from "src/services/People.service";
import { houseService } from "../House.service";
import { Houses } from "src/types/house";
import { invoiceService } from "../Invoice.service";

const baseURL =
  "https://dn-gov-api-5ywbgrw4ia-uc.a.run.app/";
const InvoiceService = invoiceService.getInstance(baseURL);

export function InvoiceQuery(id: string) {
  return useQuery(["invoice"], () => InvoiceService.getInvoice(id), {
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
