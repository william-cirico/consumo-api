import { CheckboxOptionType, Radio } from "antd";

export function SexRadio() {
    const options: CheckboxOptionType[] = [
        {  value: "M", label: "Masculino", style: { width: "50%" } },
        { value: "F", label: "Feminino", style: { width: "50%" } }
    ]; 

    return <Radio.Group options={options} optionType="button" style={{ width: "100%", textAlign: "center" }} />
}