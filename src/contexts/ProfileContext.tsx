import { createContext, useContext, useState, ReactNode } from "react";
import avatarAlpo from "@/assets/avatar-alpo.jpg";
import avatarPenelope from "@/assets/avatar-penelope.jpg";
import avatarSophie from "@/assets/avatar-sophie.jpg";

export type ProfileKey = string;
export type GoalType = "lose" | "gain" | "maintain";
export type AccountType = "user" | "client" | "family" | "trainer";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export interface ProfileInfo {
  name: string;
  initials: string;
  label: string;
  avatar: string;
  goal?: GoalType;
  weight?: string;
  accountType?: AccountType;
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
  activityLevel?: ActivityLevel;
}

const defaultProfiles: Record<string, ProfileInfo> = {
  alpo: { name: "Alex", initials: "AL", label: "Alex", avatar: avatarAlpo, goal: "lose", weight: "196.2", accountType: "user", age: 43, gender: "Male", activityLevel: "moderate" },
  client: { name: "Penelope", initials: "PS", label: "Penelope", avatar: avatarPenelope, goal: "lose", weight: "212.5", accountType: "client", age: 38, gender: "Male", activityLevel: "active" },
  family: { name: "Sophie", initials: "SS", label: "Sophie", avatar: avatarSophie, goal: "maintain", weight: "138.0", accountType: "family", age: 34, gender: "Female", activityLevel: "light" },
};

interface ProfileContextValue {
  activeProfile: ProfileKey;
  setActiveProfile: (p: ProfileKey) => void;
  info: ProfileInfo;
  profiles: Record<string, ProfileInfo>;
  profileKeys: ProfileKey[];
  addProfile: (profile: ProfileInfo) => ProfileKey;
}

const ProfileContext = createContext<ProfileContextValue>({
  activeProfile: "alpo",
  setActiveProfile: () => {},
  info: defaultProfiles.alpo,
  profiles: defaultProfiles,
  profileKeys: Object.keys(defaultProfiles),
  addProfile: () => "",
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Record<string, ProfileInfo>>(defaultProfiles);
  const [activeProfile, setActiveProfile] = useState<ProfileKey>("alpo");

  const addProfile = (profile: ProfileInfo): ProfileKey => {
    const key = profile.name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    setProfiles((prev) => ({ ...prev, [key]: profile }));
    return key;
  };

  const profileKeys = Object.keys(profiles);

  return (
    <ProfileContext.Provider
      value={{
        activeProfile,
        setActiveProfile,
        info: profiles[activeProfile] || profiles.alpo,
        profiles,
        profileKeys,
        addProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

// Keep backward compat — components that import profileMap get the live profiles via context instead
// For static imports, expose defaultProfiles
export const profileMap = defaultProfiles;
