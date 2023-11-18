type UserProfileProps = {
  name: string;
};

const UserProfile = ({ name }: UserProfileProps) => {
  const initials = `${name[0]}`;

  return (
    <div className="flex items-center justify-center h-[26px] w-[26px] rounded-full bg-blue-500 text-white">
      {initials}
    </div>
  );
};

export default UserProfile;
