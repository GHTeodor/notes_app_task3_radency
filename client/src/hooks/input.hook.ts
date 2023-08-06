import { useState } from "react";

export default function useInput(initialState: string = "") {
    const [value, setValue] = useState(initialState);

    const onChange = (event: any) => setValue(event.target.value);

    const reset = () => setValue(initialState);

    return { value, onChange, reset };
};