import React, { useState, useEffect } from "react";

import { Steps, Modal } from "antd";

import "./style.less";
import OriginalSelector from "components/TranslatedBookCreator/OriginalSelector";
import BookRegistrationForm from "components/TranslatedBookCreator/BookRegistrationForm";
import BookRegistrationConfirm from "components/TranslatedBookCreator/BookRegistrationConfirm";

import { Trans } from "react-i18next";
import useFetch from "utils/hooks/useFetch";
import TranslatedBookController from "api/controllers/translation";
import BookSummary from "components/TranslatedBookCreator/BookSummary";

const { Step } = Steps;

const useBook = initialState => {
    const [book, setBook] = useState(initialState);

    const setAuthors = authors => {
        setBook(book ? { ...book, authors } : { authors });
    };

    const setPublications = publications => {
        setBook(book ? { ...book, publications } : { publications });
    };

    const reset = () => {
        setBook(initialState);
    };

    return [book, setBook, setAuthors, setPublications, reset];
};

export default function TranslatedBookCreator() {
    const [currentStep, setCurrentStep] = useState(0);
    const [registerOriginal, setRegisterOriginal] = useState(false);

    const [
        originalBook,
        setOriginalBook,
        setAuthors,
        setOriginalBookPublications,
        resetOriginalBook
    ] = useBook();

    const [
        translatedBook,
        setTranslatedBook,
        setTranslators,
        setTranslatedBookPublications,
        resetTranslatedBook
    ] = useBook({ authors: [], publications: [] });

    const {
        loading,
        response: { data },
        fetch,
        error
    } = useFetch(TranslatedBookController.registerTranslation);

    const stepForward = () => {
        const step = currentStep === 0 && !registerOriginal ? 2 : 1;
        setCurrentStep(currentStep + step);
    };

    const stepBackward = () => {
        const step = currentStep === 2 && !registerOriginal ? 2 : 1;
        setCurrentStep(currentStep - step);
    };

    const registerTranslatedBook = () => {
        translatedBook.original = originalBook;
        fetch(translatedBook);
    };

    useEffect(() => {
        if (data && !error) {
            Modal.success({
                title: "Book registered successfully!",
                content: (
                    <div className="content">
                        <h4>Original Book</h4>
                        <BookSummary book={data.original} />
                        <h4>Translated Book</h4>
                        <BookSummary authorAlias="translator" book={data} />
                    </div>
                ),
                onOk: () => {
                    resetTranslatedBook();
                    resetOriginalBook();
                    setCurrentStep(0);
                }
            });
        } else if (error) {
            Modal.error({
                title: "Something went wrong during registration.",
                content: "Maybe this book is already registered?"
            });
        }
    }, [data, error]);

    const renderComponent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <OriginalSelector
                        key={0}
                        registerOriginal={registerOriginal}
                        setRegisterOriginal={setRegisterOriginal}
                        onDone={stepForward}
                        onBack={stepBackward}
                        originalBook={originalBook}
                        setOriginalBook={setOriginalBook}
                    />
                );

            case 1:
                return (
                    <BookRegistrationForm
                        key={1}
                        publications={originalBook.publications}
                        setPublications={setOriginalBookPublications}
                        authors={originalBook.authors}
                        setAuthors={setAuthors}
                        onDone={stepForward}
                        onBack={stepBackward}
                        authorAlias="author"
                        title="Original book registration"
                        introduction={
                            <Trans
                                i18nKey={
                                    "text:originalBookRegistrationIntroduction"
                                }
                            >
                                There is text with enfasis <strong>here</strong>
                                and<strong>here</strong>.
                            </Trans>
                        }
                    />
                );

            case 2:
                return (
                    <BookRegistrationForm
                        key={2}
                        publications={translatedBook.publications}
                        setPublications={setTranslatedBookPublications}
                        authors={translatedBook.authors}
                        setAuthors={setTranslators}
                        onDone={stepForward}
                        onBack={stepBackward}
                        authorAlias="translator"
                        title="Translated book registration"
                        introduction={
                            <Trans
                                i18nKey={
                                    "text:translatedBookRegistrationIntroduction"
                                }
                            >
                                There is text with enfasis <strong>here</strong>
                                and<strong>here</strong>.
                            </Trans>
                        }
                    />
                );

            case 3:
                return (
                    <BookRegistrationConfirm
                        key={3}
                        onDone={registerTranslatedBook}
                        onBack={stepBackward}
                        originalBook={originalBook}
                        translatedBook={translatedBook}
                    />
                );
        }
    };

    return (
        <section className="book-creator">
            <aside>
                <Steps direction="vertical" current={currentStep} progressDot>
                    <Step title="Select Original" />
                    <Step title="Register Original" />
                    <Step title="Register Translation" />
                    <Step title="Confirm" />
                </Steps>
            </aside>
            <section className="book-creator-content">
                {renderComponent()}
            </section>
        </section>
    );
}
