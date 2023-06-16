const Input = ({
    error,
    type,
    name,
    inputHandler,
    placeholder,
    required,
    defaultInputValue,
    pattern,
    value,
    disabled,
    labelName,
    className
}) => {
    return (
        <div className="w-full">
            <label htmlFor={name} id={`${name}Label`} className="block">
				{labelName}
			</label>
            <input
                type={type}
				name={name}
				onChange={inputHandler}
                className={`w-full py-3 px-3 rounded border border-solid mt-2 ${className}`}
                style={{borderColor: "#D9D9D9"}}
				required={required}
				placeholder={placeholder}
				defaultValue={defaultInputValue}
				pattern={pattern}
				disabled={disabled}
				value={value}
				autoComplete="off"
            />
            <div className="text-red-500 mt-1">{error}</div>
        </div>
    )
}

export default Input