import { useAuth0 } from "@auth0/auth0-react";
import { useMutation,useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};





type CreateUserRequest = {
    auth0Id: string;
    email: string;
};


export const useCreateMyUser = () => {
const {getAccessTokenSilently}=useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken=await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization:`Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        // return response;
    };
    const { mutateAsync: createUser, isPending, isError, isSuccess } = useMutation({ mutationFn: createMyUserRequest });
    return { createUser, isPending, isError, isSuccess };
};

type UpdateMyUserRequest={
    name: string,
    addressLine1: string,
    city: string,
    country: string,
}

 export const useUpdateMyUser=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const UpdateMyUserRequest= async (formData:UpdateMyUserRequest)=>{
        const accessToken=await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization:`Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        return response.json();
    }
    const {mutateAsync:updateUser,isPending,isSuccess,error,reset}=useMutation({mutationFn:UpdateMyUserRequest});
    if(isSuccess){
        toast.success("User updated successfully");
    }
    if(error){
        toast.error(error.toString()); 
        reset();
    }

        return {updateUser,isPending};
 }