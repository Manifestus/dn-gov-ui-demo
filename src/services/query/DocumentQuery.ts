import { useMutation, useQuery, useQueryClient } from "react-query";
import { peopleService } from "src/services/People.service";
import { uploadBucketService } from "../UploadBucket.s3";

const baseURL =
  "https://dn-gov-api-5ywbgrw4ia-uc.a.run.app/";
const DocumentService = uploadBucketService.getInstance(baseURL);

export function DocumentQuery(id: string) {
  return useQuery(["document"], () => DocumentService.getDocuments(id), {
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
