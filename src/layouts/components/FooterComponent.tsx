import { Footer } from "antd/es/layout/layout";

interface IFooterComponentProps {};
const FooterComponent = (props: IFooterComponentProps) => {
    return (
        <Footer className="footer">
          Được phát triển bởi 1 nhóm sinh viên 😘
        </Footer>
    );
}

export default FooterComponent;