import { Translate } from "../components/translate/Translate"

export const RowsPerPage = () => {
    return [
        {
            value: 20,
            label: "20"
        },
        {
            value: 40,
            label: "40"
        },
        {
            value: 60,
            label: "60"
        },
        {
            value: 0,
            label: <Translate>all</Translate>
        },
    ]
}