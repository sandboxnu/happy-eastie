import { Dropdown } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { ResourceCategory } from "../../models/types";

interface FilterDropdownProps {
    setResourceFilters: (filters: any[]) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = (props: FilterDropdownProps) => {
    const [selected, setSelected] = useState(new Set());
    const updateResourceFilters = props.setResourceFilters;

    useEffect(() => {
        updateResourceFilters(Array.from(selected.values()))
    }, [selected, updateResourceFilters])

    return (
        <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                {"Filter"}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label="Multiple selection actions"
                color="secondary"
                selectionMode="multiple"
                selectedKeys={selected}
                onSelectionChange={setSelected}
            >

                {Object.values(ResourceCategory).map(c =>
                    <Dropdown.Item key={c}>
                        {c}
                    </Dropdown.Item>
                )}

            </Dropdown.Menu>
        </Dropdown>
    )
}
