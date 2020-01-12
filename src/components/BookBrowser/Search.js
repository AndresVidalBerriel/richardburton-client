import React from "react";

import { Input } from "antd";

import "./style.less";

export default function Search() {
    return (
        <div className="search">
            <Input.Search size="large" enterButton />
        </div>
    );
}
