
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  CalendarDays,
  GraduationCap,
  ShieldCheck,
  Camera,
  Pencil,
  Save,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authapi";

import { toast } from "sonner";

const Myprofile = () => {
  // States
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Load user
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useLoadUserQuery();

  const user = data?.user;

  // Update user mutation
  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
    },
  ] = useUpdateUserMutation();

  // Loading state
  const showSkeleton = isLoading || (isFetching && !user);

  // Set name when user data arrives
  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user?.name]);

  // Profile photo preview
  useEffect(() => {
    if (!profilePhoto) {
      setPhotoPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(profilePhoto);
    setPhotoPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [profilePhoto]);

  // Select profile photo
  const onChangeHandeler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image");
        return;
      }

      setProfilePhoto(file);
    }
  };

  // Update profile
  const updateUserHandeler = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    try {
      await updateUser(formData).unwrap();

      await refetch();

      setIsEditing(false);
      setProfilePhoto(null);

      toast.success("Profile updated successfully");

    } catch (error) {
      toast.error(
        error?.data?.message || "Profile update failed"
      );
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setName(user?.name || "");
    setProfilePhoto(null);
    setIsEditing(false);
  };

  // Skeleton
  if (showSkeleton) {
    return <ProfileSkeleton />;
  }

  // Error
  if (isError || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-3">
            <User
              className="mx-auto text-muted-foreground"
              size={35}
            />

            <h2 className="text-xl font-semibold">
              Profile unavailable
            </h2>

            <p className="text-sm text-muted-foreground">
              Unable to load your profile. Please try again.
            </p>

            <Button onClick={() => refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format joined date
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  // Avatar initials
  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-background text-foreground px-3 py-8 sm:px-6 md:py-12 mt-16 dark:text-gray-200">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight dark:text-gray-400">
            My Profile
          </h1>

          <p className="text-sm text-muted-foreground
          dark:text-gray-500">
            View and manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden rounded-2xl shadow-sm">

          {/* Cover */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

          <CardContent className="px-4 sm:px-8 pb-7">

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">

              {/* Avatar */}
              <div className="relative w-fit">

                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-lg">
                  <AvatarImage
                    src={photoPreview || user?.photoURL || ""}
                    alt={user.name}
                  />

                  <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <label
                    htmlFor="profilePhoto"
                    className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-md hover:opacity-90"
                  >
                    <Camera size={17} />

                    <input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onChangeHandeler}
                    />
                  </label>
                )}

              </div>

              {/* Name and Email */}
              <div className="flex-1 min-w-0 sm:pb-2 space-y-2">

                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="max-w-sm"
                  />
                ) : (
                  <h2 className="text-2xl font-bold truncate">
                    {user.name}
                  </h2>
                )}

                <p className="text-sm text-muted-foreground flex items-center gap-2 break-all">
                  <Mail size={15} className="shrink-0" />
                  {user.email}
                </p>

              </div>

              {/* Edit Button */}
              <div className="flex gap-2 sm:pb-2">

                {isEditing ? (
                  <>
                    <Button
                      onClick={updateUserHandeler}
                      disabled={updateUserIsLoading}
                      className="gap-2"
                    >
                      <Save size={16} />

                      {updateUserIsLoading ? "Saving..." : "Save"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={cancelEditing}
                      disabled={updateUserIsLoading}
                    >
                      <X size={16} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </Button>
                )}

              </div>

            </div>

            <Separator className="my-6" />

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Name */}
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                  <User
                    size={21}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </p>

                  <p className="font-semibold truncate">
                    {user.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center shrink-0">
                  <Mail
                    size={21}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </p>

                  <p className="font-semibold break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Date Joined */}
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
                  <CalendarDays
                    size={21}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Date Joined
                  </p>

                  <p className="font-semibold">
                    {joinedDate}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center shrink-0">
                  <GraduationCap
                    size={21}
                    className="text-orange-600 dark:text-orange-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Account Role
                  </p>

                  <Badge className="capitalize mt-1">
                    {user.role}
                  </Badge>
                </div>
              </div>

            </div>

            <Separator className="my-6" />

            {/* Account Status */}
            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <ShieldCheck
                    size={21}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Account Status
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Your account is accessible.
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                Active
              </Badge>

            </div>

          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Your profile information is securely associated with your account.
        </p>

      </div>
    </div>
  );
};


// Profile Skeleton
const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-background px-3 py-8 sm:px-6 mt-16">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="space-y-2">
          <div className="h-8 w-40 rounded bg-muted animate-pulse" />
          <div className="h-4 w-64 rounded bg-muted animate-pulse" />
        </div>

        <div className="rounded-2xl border overflow-hidden">

          <div className="h-32 sm:h-44 bg-muted animate-pulse" />

          <div className="p-5 sm:p-8">

            <div className="flex flex-col sm:flex-row gap-4 -mt-12">
              <div className="h-24 w-24 rounded-full bg-muted border-4 border-background animate-pulse shrink-0" />

              <div className="flex-1 space-y-3 pt-3">
                <div className="h-6 w-40 rounded bg-muted animate-pulse" />
                <div className="h-4 w-52 rounded bg-muted animate-pulse" />
              </div>
            </div>

            <Separator className="my-7" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-4 items-center">
                  <div className="h-11 w-11 rounded-xl bg-muted animate-pulse" />

                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-36 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-7" />

            <div className="h-12 w-full rounded bg-muted animate-pulse" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;

