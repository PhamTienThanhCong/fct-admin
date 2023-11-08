import Link from "antd/es/typography/Link";
import { useTranslation } from "react-i18next";
import accessForbidden from "../../assets/images/access_forbidden.svg";

const AccessForbidden = () => {
	const { t } = useTranslation("translation");

	const backToLogin = () => {
		window.location.href = '/login'
	};

	return (
		<div style={{ textAlign: "center" }}>
			<img src={accessForbidden} alt="access-forbidden" className="whistle" />
			<h1 className="forbidden-status">403</h1>
			<h2 className="forbidden-text">{t("access_forbidden")}</h2>
			<Link className="back-login" onClick={backToLogin}>
				{t("back_login")}
			</Link>
		</div>
	);
};

export default AccessForbidden;
