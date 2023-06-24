import { Button, Input, InputProps, Space } from "antd";

type Props = InputProps & {
    loading: boolean;
}

export function LoadingInput({ loading, ...rest }: Props) {
    return (
        <Space.Compact style={{ width: "100%" }}>
            <Input {...rest} addonAfter={null} style={{ width: "100%" }} />
            <Button disabled loading={loading} icon={!loading && rest.addonAfter} />
        </Space.Compact>
    );
}