import { LoaderCircle, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";
import { queryClient } from "~/components/query-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { orgService } from "~/services/orgService";
import { OrgMember } from "~/type/httpResponse";

const memberContext = createContext<OrgMember[0] | null>(null);

const useMemberContext = () => {
  const context = useContext(memberContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export const MemberContextMenu: React.FC<
  PropsWithChildren & { member: OrgMember[0] }
> = ({ children, member }) => {
  const [alertDialog, setAlertDialog] = useState<{
    open: boolean;
    action: "demote" | "promote" | "kick" | null;
  }>({ open: false, action: null });

  return (
    <memberContext.Provider value={member}>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {member.role === "admin" ? (
            <ContextMenuItem
              inset
              onClick={() => setAlertDialog({ open: true, action: "demote" })}
            >
              demote from admin
            </ContextMenuItem>
          ) : (
            member.role === "member" && (
              <ContextMenuItem
                inset
                onClick={() =>
                  setAlertDialog({ open: true, action: "promote" })
                }
              >
                set as admin
              </ContextMenuItem>
            )
          )}
          <ContextMenuItem
            inset
            className="justify-between"
            onClick={() => setAlertDialog({ open: true, action: "kick" })}
          >
            kick users
            <TriangleAlert className="w-4 h-4" />
          </ContextMenuItem>
        </ContextMenuContent>
        <ContextMenuDialog
          open={alertDialog.open}
          action={alertDialog.action!}
          onOpenChange={(open) => setAlertDialog((v) => ({ ...v, open }))}
        />
      </ContextMenu>
    </memberContext.Provider>
  );
};

const ContextMenuDialog: React.FC<{
  open: boolean;
  action: "demote" | "promote" | "kick";
  onOpenChange?(open: boolean): void;
}> = ({ open, onOpenChange, action }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {action === "promote" && <PromoteAdminDialog />}
      {action === "demote" && <DemoteAdminDialog />}
      {action === "kick" && <KickMemberDialog />}
    </AlertDialog>
  );
};

const PromoteAdminDialog = () => {
  const { id: orgId } = useParams();
  const ctx = useMemberContext();

  const { mutate, isPending } = orgService.PromoteMember({
    onSuccess(data) {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["orgDetail", orgId] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add admin</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure to promote {ctx?.name} to be an admin?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            mutate({ userId: ctx!._id, orgId: orgId as string });
          }}
        >
          <LoaderCircle className={`animate-spin ${!isPending && "hidden"}`} />
          confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const DemoteAdminDialog = () => {
  const { id: orgId } = useParams();
  const ctx = useMemberContext();

  const { mutate, isPending } = orgService.DemoteAdmin({
    onSuccess(data) {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["orgDetail", orgId] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Demote an admin</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to demote {ctx?.name} from admin?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            mutate({ userId: ctx!._id, orgId: orgId as string });
          }}
        >
          <LoaderCircle className={`animate-spin ${!isPending && "hidden"}`} />
          confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const KickMemberDialog = () => {
  const { id: orgId } = useParams();
  const ctx = useMemberContext();

  const { mutate, isPending } = orgService.KickMember({
    onSuccess(data) {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["orgDetail", orgId] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>kick member</AlertDialogTitle>
        <AlertDialogDescription>
          kick {ctx?.name} from organization?
          <br />
          you still can invite them later to organization
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            mutate({ userId: ctx!._id, orgId: orgId as string });
          }}
        >
          <LoaderCircle className={`animate-spin ${!isPending && "hidden"}`} />
          confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
