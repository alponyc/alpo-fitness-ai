import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import avatarDefault from "@/assets/avatar-default.png";

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

const emptyProfile: ProfileInfo = {
  name: "",
  initials: "",
  label: "",
  avatar: avatarDefault,
};

interface ProfileContextValue {
  activeProfile: ProfileKey;
  setActiveProfile: (p: ProfileKey) => void;
  info: ProfileInfo;
  profiles: Record<string, ProfileInfo>;
  profileKeys: ProfileKey[];
  addProfile: (profile: ProfileInfo) => ProfileKey;
  removeProfile: (key: ProfileKey) => void;
  updateProfile: (updates: Partial<ProfileInfo>) => Promise<void>;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextValue>({
  activeProfile: "me",
  setActiveProfile: () => {},
  info: emptyProfile,
  profiles: {},
  profileKeys: [],
  addProfile: () => "",
  removeProfile: () => {},
  updateProfile: async () => {},
  loading: true,
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileInfo>(emptyProfile);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(emptyProfile);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
      return;
    }

    if (data) {
      setProfile({
        name: data.name,
        initials: data.initials || data.name.substring(0, 2).toUpperCase(),
        label: data.name,
        avatar: data.avatar_url || avatarDefault,
        goal: (data.goal as GoalType) || undefined,
        weight: data.weight || undefined,
        accountType: (data.account_type as AccountType) || "user",
        email: data.email || undefined,
        phone: data.phone || undefined,
        age: data.age || undefined,
        gender: data.gender || undefined,
        activityLevel: (data.activity_level as ActivityLevel) || undefined,
      });
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<ProfileInfo>) => {
    if (!user) return;

    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) {
      dbUpdates.name = updates.name;
      dbUpdates.initials = updates.name.substring(0, 2).toUpperCase();
    }
    if (updates.goal !== undefined) dbUpdates.goal = updates.goal;
    if (updates.weight !== undefined) dbUpdates.weight = updates.weight;
    if (updates.accountType !== undefined) dbUpdates.account_type = updates.accountType;
    if (updates.email !== undefined) dbUpdates.email = updates.email;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.age !== undefined) dbUpdates.age = updates.age;
    if (updates.gender !== undefined) dbUpdates.gender = updates.gender;
    if (updates.activityLevel !== undefined) dbUpdates.activity_level = updates.activityLevel;
    if (updates.avatar !== undefined) dbUpdates.avatar_url = updates.avatar;

    const { error } = await supabase
      .from("profiles")
      .update(dbUpdates)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating profile:", error);
      return;
    }

    setProfile((prev) => ({ ...prev, ...updates }));
  };

  // Keep the same interface shape for backward compat
  const profiles: Record<string, ProfileInfo> = { me: profile };
  const profileKeys = ["me"];

  const addProfile = (_profile: ProfileInfo): ProfileKey => {
    // No-op in per-user mode
    return "me";
  };

  const removeProfile = (_key: ProfileKey) => {
    // No-op in per-user mode
  };

  return (
    <ProfileContext.Provider
      value={{
        activeProfile: "me",
        setActiveProfile: () => {},
        info: profile,
        profiles,
        profileKeys,
        addProfile,
        removeProfile,
        updateProfile,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

// Backward compat export — now returns empty since profiles are per-user
export const profileMap: Record<string, ProfileInfo> = {};
