import { createContext, useContext, useState, ReactNode } from "react";

export type ProfileKey = "alpo" | "client" | "family";

interface ProfileInfo {
  name: string;
  initials: string;
  label: string;
}

export const profileMap: Record<ProfileKey, ProfileInfo> = {
  alpo: { name: "ALPO", initials: "AL", label: "Executive" },
  client: { name: "User 2", initials: "U2", label: "Client 1" },
  family: { name: "Family", initials: "FA", label: "Sophie" },
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
