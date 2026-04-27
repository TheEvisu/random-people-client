import { Profile } from '../types/profile';
import { Avatar } from './ui/avatar';

interface ProfileRowProps {
  profile: Profile;
  onClick: () => void;
}

export function ProfileRow({ profile, onClick }: ProfileRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full px-4 py-3 hover:bg-accent/50 transition text-left border-b border-border last:border-0"
    >
      <Avatar
        src={profile.pictureThumbnail}
        alt={`${profile.firstName} ${profile.lastName}`}
        size="sm"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">
          {profile.title} {profile.firstName} {profile.lastName}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          {profile.email} - {profile.phone}
        </p>
      </div>
      <div className="text-sm text-muted-foreground text-right shrink-0">
        <p>{profile.gender}</p>
        <p>{profile.country}</p>
      </div>
    </button>
  );
}
