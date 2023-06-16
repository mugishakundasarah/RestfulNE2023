import ReactSelect from "react-select"

const Select = ({
    options,
    name,
    labelName,
    className,
    selectHandler,
}) => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            paddingTop: "0.4rem",
            paddingBottom: "0.4rem"
        })
    }
    return (
        <div className="w-full">
            <label htmlFor={name} id={`${name}Label`} className="block">
				{labelName}
			</label>
            <ReactSelect
                options={options}
                className={`w-full  mt-2  ${className}`}
                styles={customStyles}
                onChange={selectHandler}
            />
        </div>
    )
}

export default Select