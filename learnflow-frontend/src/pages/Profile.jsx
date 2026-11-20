import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service.js";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const currentUser = await getCurrentUser();

        if (isMounted) {
          setProfile(currentUser);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || "Unable to load your profile.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [retry]);

  if (loading) {
    return (
      <section className="app-page flex min-h-[65vh] items-center justify-center px-6">
        <p className="text-sm text-[#68665E]">Loading profile...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="app-page flex min-h-[65vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p role="alert" className="text-sm text-[#68665E]">
          {error}
        </p>
        <button
          type="button"
          onClick={() => setRetry((current) => current + 1)}
          className="border border-black/15 px-4 py-2 text-sm font-medium transition hover:bg-black/5"
        >
          Try again
        </button>
      </section>
    );
  }

  const activity = profile?.activity || {};
  const averageScore = Number(activity.averageQuizPercentage ?? 0);
  const formattedAverageScore = Number.isFinite(averageScore)
    ? `${Number(averageScore.toFixed(1))}%`
    : "0%";

  const stats = [
    {
      label: "Materials generated",
      value: activity.totalMaterialsGenerated ?? 0,
    },
    {
      label: "Quizzes attempted",
      value: activity.totalQuizzesAttempted ?? 0,
    },
    {
      label: "Average quiz score",
      value: formattedAverageScore,
    },
  ];

  return (
    <section className="app-page min-h-[65vh] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 border-b border-black/10 pb-6">
          <p className="mb-2 text-sm text-[#68665E]">Profile</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.username}
          </h1>
        </header>

        <dl className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-black/10 bg-[#FBF9F1] p-6 sm:p-7"
            >
              <dt className="text-sm text-[#68665E]">{stat.label}</dt>
              <dd className="mt-4 text-3xl font-semibold tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Profile;
