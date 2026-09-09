import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();

  return (
    <div className="profile">
      <h1>{t("profile.title")}</h1>
      <p>{t("profile.info")}</p>
    </div>
  );
}

export default Profile;
