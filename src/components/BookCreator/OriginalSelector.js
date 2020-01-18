import React from "react";

import { Input, List, Checkbox, Button } from "antd";

import "./style.less";

export default function OriginalSelector({ setRegisterOriginal, onDone }) {
    return (
        <section className="selector">
            <header>
                <div className="heading">
                    <h3>Original book selector</h3>
                </div>
                <p>
                    Please search by title and select an original book of
                    brazilian literature from the resulting list below. In case
                    you don't find the book, mark the checkbox at the bottom of
                    the list to be prompted to register a new original book in
                    the platform. Click on <strong>Continue</strong> when you're
                    ready.
                </p>
            </header>
            <Input.Search
                className="field"
                placeholder="Insert the original book's title."
                enterButton
            />
            <List className="field list" bordered />
            <footer>
                <Checkbox onChange={e => setRegisterOriginal(e.target.checked)}>
                    The book i'm looking for is not in the list.
                </Checkbox>
                <Button type="primary" onClick={onDone}>
                    Continue
                </Button>
            </footer>
        </section>
    );
}
