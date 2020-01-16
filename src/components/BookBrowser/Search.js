import React from "react";

import { Input } from "antd";

import "./style.less";
import { useTranslation } from "react-i18next";

export default function Search({ onSearch }) {
    const { t } = useTranslation();

    return (
        <div className="search">
            <Input.Search
                placeholder={t("search")}
                size="large"
                onSearch={value => onSearch(value)}
                enterButton
            />
        </div>
    );
}
