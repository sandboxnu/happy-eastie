import React from 'react';
import { Text, Grid, Checkbox } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { ResourceCategory } from '../../../models/types';

interface SidebarCategoriesProps {
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = (props: SidebarCategoriesProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Categories</Text>
            <Checkbox.Group
                color="primary"
            >
                {Object.values(ResourceCategory).map(category => (
                    <Checkbox key={category} value={category}>{category}</Checkbox>
                ))}
            </Checkbox.Group>
        </Grid>
    )
}
