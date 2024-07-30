// import { useUser } from "@/features/user/hooks/useUser";
// import { useStore } from "@/stores/store";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ClientRoute } from "@/constants/clientRoutes";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const navigate = useNavigate();
//   const setUser = useStore((state) => state.setUser);

//   const { data: user, isPending } = useUser();

//   useEffect(() => {
//     console.log("In useeffect of ProtectedRoute...");
//     if (user !== undefined) {
//       setUser(user);
//     } else if (!isPending) {
//       console.log("Going to navigate away...");
//       navigate(ClientRoute.Auth.LOGIN, { replace: true });
//     }
//   }, [user]);

//   if (isPending) {
//     return <div>Loading...</div>;
//   }

//   if (user === undefined) {
//     return null; // or you could render a fallback UI
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
