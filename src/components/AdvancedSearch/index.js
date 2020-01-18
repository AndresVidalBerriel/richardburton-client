import React, { useState } from "react";
import QueryBuilder from "components/AdvancedSearch/QueryBuilder";

import { Steps, Button } from "antd";

import "./style.less";
import BookBrowser from "components/BookBrowser";
import { useTranslation } from "react-i18next";

const { Step } = Steps;

export default function AdvancedSearch() {
    const { t } = useTranslation();

    const [currentStep, setCurrentStep] = useState(0);
    const [searchQuery, setSearchQuery] = useState();

    const [rules, setRules] = useState([]);

    const handleQueryDone = query => {
        setSearchQuery(query);
        setCurrentStep(1);
    };

    const handleStepChange = step => {
        if (step === 0) setCurrentStep(step);
    };

    return (
        <div className="advanced-search">
            <header>
                <Steps
                    className="steps"
                    type="navigation"
                    current={currentStep}
                    onChange={handleStepChange}
                >
                    <Step title={t("search:buildQuery")} />
                    <Step
                        className="results-step"
                        title={t("search:getResults")}
                    />
                </Steps>
            </header>
            {currentStep == 0 && (
                <QueryBuilder
                    rules={rules}
                    setRules={setRules}
                    onDone={handleQueryDone}
                />
            )}
            {currentStep == 1 && (
                <BookBrowser searchQuery={searchQuery} hideSearchBar />
            )}
        </div>
    );
}
