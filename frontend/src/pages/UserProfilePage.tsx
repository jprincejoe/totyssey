import { useAuth } from "@/contexts/UserContext";

const UserProfilePage = () => {
  const auth = useAuth();

  return (
    <div className="container flex flex-col">
      <div className="text-2xl font-bold">Hello {auth?.user?.firstName}</div>
      <div>ID: </div>
      <div className="">{auth?.user?._id}</div>
    </div>
  );
};

export default UserProfilePage;
