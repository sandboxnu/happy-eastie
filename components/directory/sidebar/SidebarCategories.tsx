import React, { useState } from 'react';
import { Text, Grid, Checkbox, Spacer } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { ResourceCategory } from '../../../models/types';

interface SidebarCategoriesProps {
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = (props: SidebarCategoriesProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Categories</Text>
            <Spacer y={1} />
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
                value={selectedCategories}
                onChange={setSelectedCategories}
            >
                {Object.values(ResourceCategory).map(category => (
                    <Checkbox key={category} value={category}>{category}</Checkbox>
                ))}
            </Checkbox.Group>
        </Grid>
    )
}
