import React from 'react';

const Container = ({ children, classname }: { children: React.ReactNode, classname?: string }) => {
    return (
        <div className={`container-box ${classname}`}>
            {children}
        </div>
    );
};

export default Container;