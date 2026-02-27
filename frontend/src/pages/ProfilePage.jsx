import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import api from "../lib/api";

const ProfilePage = () => {
  const { user, logout, setUser } = useAuth();

  //  Change Username
  const [usernameData, setUsernameData] = useState({
    currentUsername: user?.name || "",
    newUsername: "",
  });

  //  Change Email
  const [emailData, setEmailData] = useState({
    username: user?.name || "",
    newEmail: "",
  });

  //  Change Password
  const [passwordData, setPasswordData] = useState({
    username: user?.name || "",
    oldPassword: "",
    newPassword: "",
  });

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch('/auth/updateUsername', {
        newusername: usernameData.newUsername,
        oldusername: usernameData.currentUsername
      })
      const updatedUser = response.data.updatedUserData;
      const newUserData = {
        id: updatedUser._id,
        name: updatedUser.userName,
        email: updatedUser.email
      }
      setUser(newUserData);
      localStorage.setItem("inspiroai_user", JSON.stringify(newUserData));
      alert("Username updated successfully!");
    }
    catch (error) {
      console.error("Failed to update username:", error);
      alert(error.response?.data?.message || 'Failed to update username');
    }

  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch('/auth/updateEmail', {
        username: usernameData.currentUsername,
        newEmail: emailData.newEmail
      })
      const updatedUser = response.data.updatedUser;
      const newUserData = {
        id: updatedUser._id,
        name: updatedUser.userName,
        email: updatedUser.email
      }
      setUser(newUserData);
      localStorage.setItem("inspiroai_user", JSON.stringify(newUserData));
      alert("Email updated successfully!");
    }
    catch (error) {
      console.log("Failed to update email:", error);
      alert(error.response?.data?.message || 'Failed to update email');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch('/auth/updatePassword', {
        username: usernameData.currentUsername,
        oldpassword: passwordData.oldPassword,
        newpassword: passwordData.newPassword
      })
      alert("Password updated successfully!");
      setPasswordData({
        username: usernameData.currentUsername,
        oldPassword: "",
        newPassword: "",
      })
    }
    catch (error) {
      console.log("Failed to update password:", error);
      alert(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account information
          </p>
        </div>

        <div className="space-y-6">

          {/*  Change Username */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Change Username
            </h2>

            <form onSubmit={handleUsernameSubmit} className="space-y-4">
              <Input
                label="Current Username"
                name="currentUsername"
                value={usernameData.currentUsername}
                disabled
              />

              <Input
                label="New Username"
                name="newUsername"
                value={usernameData.newUsername}
                onChange={(e) =>
                  setUsernameData({
                    ...usernameData,
                    newUsername: e.target.value,
                  })
                }
                required
              />

              <Button type="submit">Update Username</Button>
            </form>
          </Card>

          {/*  Change Email */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Change Email
            </h2>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Username"
                name="username"
                value={emailData.username}
                disabled
              />
              <Input
                label="Current Email"
                name="username"
                value={user?.email || ""}
                disabled
              />

              <Input
                label="New Email"
                type="email"
                name="newEmail"
                value={emailData.newEmail}
                onChange={(e) =>
                  setEmailData({
                    ...emailData,
                    newEmail: e.target.value,
                  })
                }
                required
              />

              <Button type="submit">Update Email</Button>
            </form>
          </Card>

          {/*  Change Password */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Username"
                name="username"
                value={passwordData.username}
                disabled
              />

              <Input
                label="Old Password"
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                required
              />

              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                required
              />

              <Button type="submit">Update Password</Button>
            </form>
          </Card>

          {/* 🔹 Logout Section */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Logout
            </h2>

            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;