import React from 'react'
import { useTranslation, Trans } from 'react-i18next';

interface ITranslateProps {
    children: string
}

// export const Translate:React.FC<ITranslateProps> = ({children}) => {
//     const {t} = useTranslation();
//     return (
//         <Trans t={t}>{children}</Trans>
//     );
// }

export const Translate:React.FC<ITranslateProps> = ({children}) => {
    const { t } = useTranslation();

    const tableStatus = children;

    return (
        <Trans i18nKey={`${tableStatus}`}>
            {t(tableStatus)}
        </Trans>
    );
}
