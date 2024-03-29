import { useState } from "react";

export default function CollapsibleList({
    title,
    children,
    actionButton,
    defaultVisible,
}) {
    const [visible, setVisible] = useState(defaultVisible);

    return (
        <div className="catalog__filter">
            <div className={"flex items-start justify-between relative mb2"}>
                <button
                    // onClick={() => setVisible((visible) => !visible)}
                    className={
                        "btn bn b pa0 tl w-100 bg-transparent hover-light-purple" +
                        (visible ? " light-purple" : "")
                    }
                >
                    {title}
                </button>
                <div className="absolute absolute-center-y right-0">
                    {actionButton}
                </div>
            </div>
            {visible ? <ul className="list pa0 ma0">{children}</ul> : null}
        </div>
    );
}
