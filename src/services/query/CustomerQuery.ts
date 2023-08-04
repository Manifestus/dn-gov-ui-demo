import { useMutation, useQuery, useQueryClient } from "react-query";
import { peopleService } from "src/services/People.service";

const baseURL =
  "https://dn-gov-api-5ywbgrw4ia-uc.a.run.app/";
const CustomerService = peopleService.getInstance(baseURL);

export function CustomersQuery() {
  return useQuery(["people"], () => CustomerService.getPeople(), {
    // enabled: !!id,
    // select: (r) => r,
    refetchOnWindowFocus: false,
  });
}

// export function DataMutation() {
//   const queryClient = useQueryClient();
//   return useMutation(
//       (data) => {
//           return reservationsService.getReservations();
//       },
//       {
//           onSuccess: () => {
//               queryClient.invalidateQueries(['visit']);
//               enqueueSnackbar('La tabla de visitas esta actualizada!', {
//                   variant: 'success',
//               });
//           },
//           onError: (err) => {
//               console.error('[datos visit]', err);
//               enqueueSnackbar('Error al mostrar tabla!', {
//                   variant: 'error',
//               });
//           },
//       },
//   );
// }
