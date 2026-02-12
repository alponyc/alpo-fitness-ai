import { createContext, useContext, useState, ReactNode } from "react";
import avatarAlpo from "@/assets/avatar-alpo.jpg";
import avatarPenelope from "@/assets/avatar-penelope.jpg";
import avatarSophie from "@/assets/avatar-sophie.jpg";

export type ProfileKey = "alpo" | "client" | "family";

interface ProfileInfo {
  name: string;
  initials: string;
  label: string;
  avatar: string;
}

export const profileMap: Record<ProfileKey, ProfileInfo> = {
  alpo: { name: "Alex", initials: "AL", label: "Alex", avatar: avatarAlpo },
  client: { name: "Penelope", initials: "PS", label: "Penelope", avatar: avatarPenelope },
  family: { name: "Sophie", initials: "SS", label: "Sophie", avatar: avatarSophie },
};

interface ProfileContextValue {
  activeProfile: ProfileKey;
  setActiveProfile: (p: ProfileKey) => void;
  info: ProfileInfo;
}

const ProfileContext = createContext<ProfileContextValue>({
  activeProfile: "alpo",
  setActiveProfile: () => {},
  info: profileMap.alpo,
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfile, setActiveProfile] = useState<ProfileKey>("alpo");
  return (
    <ProfileContext.Provider value={{ activeProfile, setActiveProfile, info: profileMap[activeProfile] }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
