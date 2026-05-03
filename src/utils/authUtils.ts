import AsyncStorage from "@react-native-async-storage/async-storage";

export const validateToken = async (accessToken: string): Promise<boolean> => {
  try {
    const res = await fetch("https://skintify-uit.onrender.com/auth/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await fetch(
      "https://skintify-uit.onrender.com/auth/refresh",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!res.ok) return null;
    return await res.json(); // returns { access_token }
  } catch {
    return null;
  }
};

export const logout = async (navigation?: any) => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
  await AsyncStorage.removeItem("user");

  if (navigation) {
    navigation.replace("Login");
  }
};
