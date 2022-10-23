import { Button } from "@nextui-org/react";

interface ViewAllButtonProps {
    viewingAll: boolean;
    onViewingAllPress: () => void;
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = (props: ViewAllButtonProps) => {
    return (
        <div>
            {
                props.viewingAll ?
                    <Button onPress={props.onViewingAllPress}>View All</Button> :
                    <Button bordered={true} onPress={props.onViewingAllPress}>View All</Button>
            }
        </div>
    )
}
