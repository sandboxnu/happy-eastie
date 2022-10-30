import { Dropdown } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface SortDropdownProps {
    setSortingMethod: (sortingMethod: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = (props: SortDropdownProps) => {
    const [selected, setSelected] = useState(new Set(["alphabetical"]));
    const updateSortingMethod = props.setSortingMethod;

    useEffect(() => {
        updateSortingMethod(Array.from(selected.values())[0])
    }, [selected, updateSortingMethod])

    return (
        <Dropdown>
            <Dropdown.Button flat color="warning" css={{ tt: "capitalize" }}>
                {"Sort"}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label="Single selection actions"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={(keys) => setSelected}
            >
                {/* TODO: pull these sorting methods directly from the ResourceSortingMethod type */}
                <Dropdown.Item key="alphabetical">Alphabetical</Dropdown.Item>
                <Dropdown.Item key="sort2">Sort2</Dropdown.Item>
                <Dropdown.Item key="sort3">Sort3</Dropdown.Item>
                <Dropdown.Item key="sort4">Sort4</Dropdown.Item>
                <Dropdown.Item key="sort5">Sort5</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
