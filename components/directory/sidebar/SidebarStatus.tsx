import React from 'react';
import { Text, Grid, Checkbox, Spacer } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { Language, Insurance } from '../../../models/types';

interface SidebarStatusProps {
}

export const SidebarStatus: React.FC<SidebarStatusProps> = (props: SidebarStatusProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Status</Text>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Language</Text>
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(Language).map(language => (
                    <Checkbox key={language} value={language}>{language}</Checkbox>
                ))}
            </Checkbox.Group>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Insurance Type</Text>
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(Insurance).map(insuranceType => (
                    <Checkbox key={insuranceType} value={insuranceType}>{insuranceType}</Checkbox>
                ))}
            </Checkbox.Group>
            <Spacer y={1} />
        </Grid>
    )
}
