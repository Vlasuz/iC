import React, {useEffect} from 'react'
import Select from "react-select";

interface ICustomSelectProps {
    list: any
    defaultValue?: any
    onChange?: any
    value?: any
}

export const CustomSelect: React.FC<ICustomSelectProps> = ({list, defaultValue, onChange, value}) => {

    return (
        <Select
            options={list}
            defaultValue={defaultValue}
            value={value}
            styles={{
                control: (baseStyles, state) => ({
                    border: "1px solid rgba(174, 182, 206, 0.3)",
                    height: "44px",
                    display: "flex",
                    paddingLeft: "2px",
                    cursor: "pointer",
                    background: "#fff"
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#EF3129",
                    textAlign: "center",
                    padding: "15px",
                    cursor: "pointer",
                }),
                singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#5f6472",
                }),
            }}
            onChange={onChange}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'rgba(150, 159, 187, 0.102)',
                    primary25: 'rgba(150, 159, 187, 0.102)',
                    primary50: 'rgba(150, 159, 187, 0.102)'
                }
            })}
        />
    )
}
