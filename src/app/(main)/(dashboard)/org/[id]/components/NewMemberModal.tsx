import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "~/components/query-provider";
import { SearchInput } from "~/components/searchInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import useDebouncer from "~/hooks/useDebouncer";
import { orgService } from "~/services/orgService";
import { userService } from "~/services/user.service";
import { IUser } from "~/type/httpResponse";

export const NewMemberModal: React.FC<{
  open: boolean;
  onOpenChange(open: boolean): void;
}> = (props) => {
  const [searchUser, setSearchUser] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [email] = useDebouncer(searchUser, 500);
  const { id: orgId } = useParams();

  const { data: searchData } = userService.SearchUser(
    { email },
    { enabled: !!email, queryKey: ["search-user", email] }
  );
  const [selected, setSelected] = useState<IUser>();

  const { mutate, isPending } = orgService.NewMember({
    onSuccess(data) {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["orgDetail", orgId] });
    },
  });

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>New User</AlertDialogTitle>
        <SearchInput
          type="search"
          placeholder="search by email"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <ul className="grid mb-4 gap-2">
          {searchData?.data.data?.length === 0 && (
            <p className="mx-auto my-10 opacity-65">No result</p>
          )}
          {searchData?.data.data?.map((user, index) => (
            <Button
              asChild
              variant="outline"
              key={index}
              className="justify-start cursor-pointer"
              onClick={() => {
                setShowConfirm(true);
                setSelected(user);
              }}
            >
              <li>
                <p className="font-semibold">{user.name}</p>
                <Separator orientation="vertical" />
                <p className="font-thin opacity-65">{user.email}</p>
              </li>
            </Button>
          ))}
        </ul>
      </AlertDialogContent>
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add new member</AlertDialogTitle>
            <AlertDialogDescription>
              Add {selected?.name} as a new organization member?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutate({ userId: selected!._id, orgId: orgId as string });
              }}
            >
              <LoaderCircle
                className={`animate-spin ${!isPending && "hidden"}`}
              />
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
};
