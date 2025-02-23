import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  handles?: string[];
  last_active?: Date;
}

interface DiscordServer {
  server_id: string;
  name: string;
  owner_id: string;
  channels_monitored: string[];
  last_updated?: Date;
}

interface ContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  discordServer: DiscordServer | null;
  signUp: (userData: User) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  setDiscordServer: (server: DiscordServer) => void;
  clearDiscordServer: () => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [discordServer, setDiscordServer] = useState<DiscordServer | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const signUp = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signIn = (email: string, password: string): boolean => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return false;

    const parsedUser: User = JSON.parse(storedUser);
    if (parsedUser.email === email) {
      setUser(parsedUser);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const clearDiscordServer = () => setDiscordServer(null);

  return (
    <AppContext.Provider
      value={{ user, setUser, discordServer, signUp, signIn, signOut, setDiscordServer, clearDiscordServer }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
