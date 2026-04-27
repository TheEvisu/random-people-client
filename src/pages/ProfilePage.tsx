import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useHealth } from '../store/hooks';
import { clearSelected, updateRandomProfile } from '../store/slices/profilesSlice';
import {
  useSaveProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetProfilesQuery,
} from '../store/api/profilesApi';
import { useToast } from '../context/ToastContext';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { usePageTitle } from '../hooks/usePageTitle';

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const selected = useAppSelector((s) => s.profiles.selected);
  const randomList = useAppSelector((s) => s.profiles.randomList);
  const { serverUp, dbUp } = useHealth();

  const backendAvailable = serverUp && dbUp;

  const { data: dbProfiles } = useGetProfilesQuery(undefined, {
    skip: selected?.source !== 'db' || !backendAvailable,
  });

  const [saveProfile, { isLoading: isSaving }] = useSaveProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saved, setSaved] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!selected) navigate('/');
  }, [selected, navigate]);

  const profile =
    selected?.source === 'random'
      ? randomList.find((p) => p.id === id)
      : dbProfiles?.find((p) => p.id === id);

  usePageTitle(profile ? `${profile.firstName} ${profile.lastName}` : 'Profile');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  if (!selected) return null;

  if (!profile) {
    return <p className="p-8 text-muted-foreground">Loading profile...</p>;
  }

  const source = selected.source;
  const p = profile;

  async function handleSave() {
    try {
      await saveProfile({
        originalId: p.originalId,
        gender: p.gender,
        title: p.title,
        firstName,
        lastName,
        email: p.email,
        phone: p.phone,
        country: p.country,
        city: p.city,
        state: p.state,
        streetNumber: p.streetNumber,
        streetName: p.streetName,
        age: p.age,
        dobYear: p.dobYear,
        pictureLarge: p.pictureLarge,
        pictureThumbnail: p.pictureThumbnail,
      }).unwrap();
      setSaved(true);
      addToast('Profile saved successfully');
    } catch {
      addToast('Failed to save profile', 'error');
    }
  }

  async function handleUpdate() {
    if (source === 'random') {
      dispatch(updateRandomProfile({ id: p.id, firstName, lastName }));
      addToast('Name updated');
    } else {
      try {
        await updateProfile({ id: p.id, firstName, lastName }).unwrap();
        addToast('Profile updated');
      } catch {
        addToast('Failed to update profile', 'error');
      }
    }
  }

  async function handleDelete() {
    try {
      await deleteProfile(p.id).unwrap();
      dispatch(clearSelected());
      navigate('/history');
    } catch {
      setConfirmOpen(false);
      addToast('Failed to delete profile', 'error');
    }
  }

  const unavailableTitle = "Server is unreachable - can't make changes right now";

  return (
    <>
      {confirmOpen && (
        <ConfirmDialog
          message={`Delete ${firstName} ${lastName}? This can't be undone.`}
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
      <div className="max-w-xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            Back
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center gap-6 pt-6">
            <Avatar src={p.pictureLarge} alt={`${firstName} ${lastName}`} size="lg" />
            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">First name</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Last name</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Gender: </span>
                  {p.gender}
                </div>
                <div>
                  <span className="text-muted-foreground">Age: </span>
                  {p.age} ({p.dobYear})
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Address: </span>
                  {p.streetNumber} {p.streetName}, {p.city}, {p.state}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Email: </span>
                  {p.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Phone: </span>
                  {p.phone}
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full justify-end">
              {source === 'random' && (
                <>
                  <Button
                    variant="secondary"
                    onClick={handleSave}
                    disabled={saved || isSaving || !backendAvailable}
                    title={!backendAvailable ? unavailableTitle : undefined}
                  >
                    {saved ? 'Saved' : isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={handleUpdate}>
                    Update
                  </Button>
                </>
              )}
              {source === 'db' && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                    disabled={!backendAvailable}
                    title={!backendAvailable ? unavailableTitle : undefined}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleUpdate}
                    disabled={isUpdating || !backendAvailable}
                    title={!backendAvailable ? unavailableTitle : undefined}
                  >
                    {isUpdating ? 'Updating...' : 'Update'}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
