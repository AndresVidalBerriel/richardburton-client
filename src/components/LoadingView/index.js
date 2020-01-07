import React from "react";

import { Spin, Icon } from "antd";

import "./style.less";

export default function LoadingView() {
    const indicator = <Icon type="loading" spin />;

    return (
        <div className="loading-view">
            <section className="loading-content">
                <Spin className="spinner" indicator={indicator} />
                <span>Loading...</span>
            </section>
        </div>
    );
}
