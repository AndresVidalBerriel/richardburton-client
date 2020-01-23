import React from "react";

import { Icon } from "antd";

import "./style.less";

export default function Tag({ text, onClose, closable }) {
    return (
        <span className="tag">
            {text}
            {closable && (
                <button type="button" onClick={onClose}>
                    <Icon type="close" />
                </button>
            )}
        </span>
    );
}
