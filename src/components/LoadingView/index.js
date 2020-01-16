import React from "react";

import { Spin, Icon } from "antd";

import "./style.less";
import { useTranslation } from "react-i18next";

export default function LoadingView() {
    const { t } = useTranslation();
    const indicator = <Icon type="loading" spin />;

    return (
        <div className="loading-view">
            <section className="loading-content">
                <Spin className="spinner" indicator={indicator} />
                <span>{t("loading")}...</span>
            </section>
        </div>
    );
}
