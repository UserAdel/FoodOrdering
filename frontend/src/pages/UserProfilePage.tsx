import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
    const { updateUser, isPending } = useUpdateMyUser();
    
  return (
    <>
      <UserProfileForm onSave={updateUser} isLoading={isPending}></UserProfileForm>
    </>
  );
}
