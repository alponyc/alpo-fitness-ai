import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import avatarAlpo from "@/assets/avatar-alpo.jpg";
import avatarPenelope from "@/assets/avatar-penelope.jpg";
import avatarSophie from "@/assets/avatar-sophie.jpg";
import avatarDefault from "@/assets/avatar-default.png";

export type ProfileKey = string;
export type GoalType = "lose" | "gain" | "maintain";
export type AccountType = "user" | "client" | "family" | "trainer";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export interface ProfileInfo {
  id: string;
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

// Map well-known profile names to bundled avatars
const avatarMap: Record<string, string> = {
  Alex: avatarAlpo,
  Penelope: avatarPenelope,
  Sophie: avatarSophie,
};

const emptyProfile: ProfileInfo = {
  id: "",
  name: "",
  initials: "",
  label: "",
  avatar: avatarDefault,
};

function rowToProfile(row: any): ProfileInfo {
  const name = row.name || "";
  return {
    id: row.id,
    name,
    initials: row.initials || name.substring(0, 2).toUpperCase(),
    label: name,
    avatar: row.avatar_url || avatarMap[name] || avatarDefault,
    goal: (row.goal as GoalType) || undefined,
    weight: row.weight || undefined,
    accountType: (row.account_type as AccountType) || "user",
    email: row.email || undefined,
    phone: row.phone || undefined,
    age: row.age || undefined,
    gender: row.gender || undefined,
    activityLevel: (row.activity_level as ActivityLevel) || undefined,
  };
}

interface ProfileContextValue {
  activeProfile: ProfileKey;
  setActiveProfile: (p: ProfileKey) => void;
  info: ProfileInfo;
  profiles: Record<string, ProfileInfo>;
  profileKeys: ProfileKey[];
  addProfile: (profile: Omit<ProfileInfo, "id">) => Promise<ProfileKey>;
  removeProfile: (key: ProfileKey) => void;
  updateProfile: (updates: Partial<ProfileInfo>) => Promise<void>;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextValue>({
  activeProfile: "",
  setActiveProfile: () => {},
  info: emptyProfile,
  profiles: {},
  profileKeys: [],
  addProfile: async () => "",
  removeProfile: () => {},
  updateProfile: async () => {},
  loading: true,
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Record<string, ProfileInfo>>({});
  const [activeProfile, setActiveProfile] = useState<ProfileKey>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // CRITICAL: Set loading to true immediately so ProtectedRoute waits
    setLoading(true);

    const initializeProfiles = async () => {
      if (!user) {
        if (isMounted) {
          setProfiles({});
          setActiveProfile("");
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });

        if (!isMounted) return;

        if (error) {
          if (import.meta.env.DEV) console.error("Error fetching profiles:", error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const map: Record<string, ProfileInfo> = {};
          data.forEach((row) => {
            map[row.id] = rowToProfile(row);
          });
          setProfiles(map);
          setActiveProfile((prev) => {
            if (prev && map[prev]) return prev;
            return data[0].id;
          });
        } else {
          if (import.meta.env.DEV) console.warn("No profiles found for user:", user.id);
          setProfiles({});
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeProfiles();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const addProfile = async (profile: Omit<ProfileInfo, "id">): Promise<ProfileKey> => {
    if (!user) return "";

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        user_id: user.id,
        name: profile.name,
        initials: profile.initials || profile.name.substring(0, 2).toUpperCase(),
        email: profile.email || user.email,
        goal: profile.goal || null,
        weight: profile.weight || null,
        account_type: profile.accountType || "user",
        age: profile.age || null,
        gender: profile.gender || null,
        activity_level: profile.activityLevel || null,
        avatar_url: profile.avatar || null,
      })
      .select()
      .single();

    if (error) {
      if (import.meta.env.DEV) console.error("Error adding profile:", error);
      return "";
    }

    const newProfile = rowToProfile(data);
    setProfiles((prev) => ({ ...prev, [data.id]: newProfile }));
    return data.id;
  };

  const removeProfile = async (key: ProfileKey) => {
    // Don't allow deleting the last profile
    const keys = Object.keys(profiles);
    if (keys.length <= 1) return;

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", key);

    if (error) {
      if (import.meta.env.DEV) console.error("Error removing profile:", error);
      return;
    }

    setProfiles((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (activeProfile === key) {
      const remaining = Object.keys(profiles).filter((k) => k !== key);
      setActiveProfile(remaining[0] || "");
    }
  };

  const updateProfile = async (updates: Partial<ProfileInfo>) => {
    if (!user || !activeProfile) return;

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
      .eq("id", activeProfile);

    if (error) {
      if (import.meta.env.DEV) console.error("Error updating profile:", error);
      return;
    }

    setProfiles((prev) => ({
      ...prev,
      [activeProfile]: { ...prev[activeProfile], ...updates },
    }));
  };

  const profileKeys = Object.keys(profiles);
  const info = profiles[activeProfile] || emptyProfile;

  return (
    <ProfileContext.Provider
      value={{
        activeProfile,
        setActiveProfile,
        info,
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

// Backward compat — no longer used for data lookup
export const profileMap: Record<string, ProfileInfo> = {};
