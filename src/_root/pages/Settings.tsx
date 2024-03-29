import ChangePassword from "@/components/change-password";
import DeleteProfile from "@/components/delete-profile";
import EditProfile from "@/components/edit-profile";
import PageHeader from "@/components/page-header";

const Settings = () => {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:gap-8 md:p-8">
      <PageHeader title="Settings" />
      <div className="flex flex-col gap-20">
        <EditProfile />
        <ChangePassword />
        <DeleteProfile />
      </div>
    </div>
  );
};

export default Settings;
