import { ClientRoute } from "@/constants/clientRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { useStore } from "@/stores/store";

// export const useLogout = () => {
//   console.log("in useLogout...");
//   // Navigation
//   const navigate = useNavigate();

//   const { isPending, isError, isSuccess, error } = useQuery({
//     queryKey: ["logout"],
//     queryFn: () => authApi.logout(),
//   });

//   // Error
//   if (isError) {
//     toast.error(error?.message);
//     navigate(ClientRoute.Root.BASE);
//   }

//   // Success
//   if (isSuccess) {
//     toast.success("Logged out");
//     navigate(ClientRoute.Root.BASE);
//   }

//   return { isPending, isError, isSuccess, error };
// };

export const useLogout = () => {
  // Navigation
  const navigate = useNavigate();

  // On Success
  const onSuccess = () => {
    toast.success("Logged out!");
    navigate("/", {
      replace: true,
    });
  };

  // On Error
  const onError = (error: Error) => {
    console.log(error.message);
    toast.error(error.message);
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess,
    onError,
  });

  // Submit Handler
  const onSubmit = async () => {
    mutation.mutate();
  };

  return { onSubmit, mutation };
};
