import React from 'react';
import { Text, Grid, Checkbox, Spacer } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { Family } from "../../../models/types";

interface SidebarFamilyProps {
}

export const SidebarFamily: React.FC<SidebarFamilyProps> = (props: SidebarFamilyProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Family</Text>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Family Type</Text>
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(Family).map(familyType => (
                    <Checkbox key={familyType} value={familyType}>{familyType}</Checkbox>
                ))}
            </Checkbox.Group>
            <Spacer y={1} />
        </Grid>
    )
}
