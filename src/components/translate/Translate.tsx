import React from 'react'
import { useTranslation, Trans } from 'react-i18next';

interface ITranslateProps {
    children: string
}

export const Translate:React.FC<ITranslateProps> = ({children}) => {
    const {t} = useTranslation();
    return (
        <Trans t={t}>{children}</Trans>
    );
}
