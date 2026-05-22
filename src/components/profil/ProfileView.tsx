import { ProfileHeader } from "./ProfileHeader";
import { ProfileStats } from "./ProfileStats";
import { ProfileAchievements } from "./ProfileAchievements";

// Mock user — à brancher sur la vraie data du user connecté plus tard
const MOCK_USER = {
  username: "vlad",
  address: "2bvtABcD1234EfGh5678IjKl9012MnOpQrStUvWxFHXE",
  bio: "Memecoin enthusiast burning fees and shipping tokens on Hell.fun. Building things, breaking them faster.",
  socials: {
    twitter: "https://x.com/vlad",
    telegram: "https://t.me/vlad",
    website: "https://vlad.fun",
  },
  joinedAt: new Date("2025-09-15"),
};

export function ProfileView() {
  return (
    <div className="flex flex-col gap-[15px]">
      <ProfileHeader
        username={MOCK_USER.username}
        address={MOCK_USER.address}
        bio={MOCK_USER.bio}
        socials={MOCK_USER.socials}
        joinedAt={MOCK_USER.joinedAt}
      />
      <ProfileStats />
      <ProfileAchievements />
    </div>
  );
}
