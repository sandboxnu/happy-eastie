import React from 'react';
import { Text, Grid, Checkbox, Spacer } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { ResourceCategory } from '../../../models/types';

interface SidebarCategoriesProps {
    setCategories(s: ResourceCategory[]): void
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = (props: SidebarCategoriesProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Categories</Text>
            <Spacer y={1} />
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
                onChange={(e) => props.setCategories(e as ResourceCategory[])}
            >
                {Object.values(ResourceCategory).map(category => (
                    <Checkbox key={category} value={category} size={"xs"}>
                        <Text className={styles.sidebarCheckboxText}>{category}</Text>
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </Grid>
    )
}
