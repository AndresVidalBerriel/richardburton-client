import React, { useState } from "react";

import { Button, Select, Radio } from "antd";

import * as fields from "data/fields/book";
import * as operators from "data/operators";
import { connectors, buildQueryFromRules } from "data/query";
import { inputRules } from "components/AdvancedSearch/rules";
import FormInput from "components/utils/FormInput/index";
import validateForm from "utils/validators/validateForm";
import { useTranslation, Trans } from "react-i18next";
import useInput from "hooks/useInput";
const { Option } = Select;

const Rule = ({ field, operator, value, onRemove }) => {
    const { t } = useTranslation();

    return (
        <div className="query-rule">
            <Button
                shape="circle"
                icon="close"
                size="small"
                onClick={onRemove}
            />

            <div className="node field">{t(`book:${field}`)}</div>
            <div className="node operator">
                {t(`search:operators/${operator}`)}
            </div>
            <div className="node value">{value}</div>
        </div>
    );
};

export default function QueryBuilder({ rules, setRules, onDone }) {
    const { t } = useTranslation();

    const inputs = { newRuleValue: useInput("") };
    const [newRuleOperator, setNewRuleOperator] = useState(operators.IS);
    const [newRuleField, setNewRuleField] = useState(fields.TITLE);

    const [connector, setConnector] = useState(connectors.AND);

    const handleSubmit = e => {
        e.preventDefault();

        const isValid = validateForm(inputs, inputRules);
        if (isValid) {
            inputs.newRuleValue.setValue("");

            setRules([
                ...rules,
                {
                    field: newRuleField,
                    operator: newRuleOperator,
                    value: inputs.newRuleValue.value
                }
            ]);
        }
    };

    const removeRule = index => {
        rules.splice(index, 1);
        setRules([...rules]);
    };

    const handleDone = () => {
        const query = buildQueryFromRules(rules, connector);
        onDone(query);
    };

    return (
        <div className="query-builder">
            <div className="new-rule">
                <span className="text">{t("search:newRule")}:</span>
                <form className="inline" onSubmit={handleSubmit} noValidate>
                    <Select
                        defaultValue={newRuleField}
                        onChange={value => setNewRuleField(value)}
                        style={{ width: 130 }}
                    >
                        {Object.keys(fields).map((key, index) => {
                            const field = fields[key];
                            return (
                                <Option key={index} value={field}>
                                    {t(`book:${field}`)}
                                </Option>
                            );
                        })}
                    </Select>

                    <Select
                        defaultValue={newRuleOperator}
                        onChange={value => setNewRuleOperator(value)}
                        style={{ width: 130 }}
                    >
                        {Object.keys(operators).map((key, index) => {
                            const operator = operators[key];
                            return (
                                <Option key={index} value={operator}>
                                    {t(`search:operators/${operator}`)}
                                </Option>
                            );
                        })}
                    </Select>

                    <FormInput {...inputs.newRuleValue} required />

                    <Button htmlType="submit" icon="plus" shape="round">
                        {t("search:addRule")}
                    </Button>
                </form>
            </div>

            <div className="rules">
                {rules.length > 0 ? (
                    rules.map((rule, index) => (
                        <Rule
                            key={index}
                            {...rule}
                            onRemove={() => removeRule(index)}
                        />
                    ))
                ) : (
                    <span>{t("search:noRules")}</span>
                )}
            </div>

            <footer>
                <Trans key="search:connectorSelector">
                    {t("search:connectorSelector/pre")}
                    <Radio.Group
                        defaultValue={connector}
                        className="connector-selector"
                        onChange={e => setConnector(e.target.value)}
                    >
                        <Radio.Button value={connectors.AND}>
                            {t("search:connectorSelector/all")}
                        </Radio.Button>
                        <Radio.Button value={connectors.OR}>
                            {t("search:connectorSelector/any")}
                        </Radio.Button>
                    </Radio.Group>
                    {t("search:connectorSelector/post")}.
                    <Button type="primary" icon="search" onClick={handleDone}>
                        {t("search")}
                    </Button>
                </Trans>
            </footer>
        </div>
    );
}
