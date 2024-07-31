// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { TRegister, TUser } from "../types/authTypes";
// import { authApi } from "../api/authApi";
// import { authSchema } from "../validation/authValidation";
// import { useAuthStore } from "@/stores/authStore";
// import { useLayoutEffect } from "react";

// // Default Values
// const defaultValues: TRegister = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// export const useRegister = () => {
//   // Navigation
//   const navigate = useNavigate();
//   const { user, setUser } = useAuthStore();

//   // Form
//   const form = useForm<TRegister>({
//     resolver: zodResolver(authSchema.Register),
//     defaultValues,
//   });

//   // Log user state whenever it changes
//   useLayoutEffect(() => {
//     if (user) {
//       navigate("/", {
//         replace: true,
//       });
//     }
//   }, [user]);

//   // On Success
//   const onSuccess = (data: TUser) => {
//     toast.success("Account created!");
//     setUser(data);
//   };

//   // On Error
//   const onError = (error: Error) => {
//     console.log(error.message);
//     toast.error(error.message);
//   };

//   // Mutation
//   const mutation = useMutation({
//     mutationFn: authApi.register,
//     onSuccess,
//     onError,
//   });

//   // Submit Handler
//   const onSubmit = async (data: TRegister) => {
//     mutation.mutate(data);
//   };

//   return { form, onSubmit, mutation };
// };
