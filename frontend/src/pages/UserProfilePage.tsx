import { useStore } from "@/stores/store";

const UserProfilePage = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <div className="text-2xl font-bold">Hello, {user?.firstName}</div>
      <div>ID: </div>
      <div className="">{user?._id}</div>
    </div>
  );
};

export default UserProfilePage;
