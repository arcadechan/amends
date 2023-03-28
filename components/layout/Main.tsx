'use client'

import React from "react";

interface mainPropsI {
    children: React.ReactNode,
}

const Main = ({ children } : mainPropsI): JSX.Element => {
    return (
        <main id='main'>{children}</main>
    )
}

export default Main;