import { useAuthStore } from "@/stores/authStore";

const UserProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="container flex flex-col">
      <div className="text-2xl font-bold">Hello {user?.firstName}</div>
      <div>ID: </div>
      <div className="">{user?._id}</div>
    </div>
  );
};

export default UserProfilePage;