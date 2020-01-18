import React, { useState } from "react";

import { Steps, Icon } from "antd";

import "./style.less";
import OriginalSelector from "components/BookCreator/OriginalSelector";
import OriginalRegistrationForm from "components/BookCreator/OriginalRegistrationForm";

const { Step } = Steps;

export default function BookCreator() {
    const [currentStep, setCurrentStep] = useState(1);

    const [registerOriginal, setRegisterOriginal] = useState(true);

    const stepForward = () => {
        setCurrentStep(currentStep + 1);
    };

    const stepBackward = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <section className="book-creator">
            <aside>
                <Steps direction="vertical" current={currentStep} progressDot>
                    <Step title="Select Original" />
                    {registerOriginal && <Step title="Register Original" />}
                    <Step title="Register Translation" />
                    <Step title="Confirm" />
                </Steps>
            </aside>
            <section className="book-creator-content">
                {currentStep === 0 && (
                    <OriginalSelector
                        setRegisterOriginal={setRegisterOriginal}
                        onDone={stepForward}
                        onBack={stepBackward}
                    />
                )}
                {currentStep === 1 && registerOriginal && (
                    <OriginalRegistrationForm
                        onDone={stepForward}
                        onBack={stepBackward}
                    />
                )}
            </section>
        </section>
    );
}
