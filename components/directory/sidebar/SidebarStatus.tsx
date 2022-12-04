import React from 'react';
import { Text, Grid, Checkbox, Spacer, Radio, Input } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { Language, Insurance, Citizenship, EmploymentStatus, Accessibility } from '../../../models/types';

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
            <Radio.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(Insurance).map(insuranceType => (
                    <Radio key={insuranceType} value={insuranceType}>{insuranceType}</Radio>
                ))}
            </Radio.Group>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Annual Income</Text>
            <Input clearable bordered className={styles.sidebarInputBox} />
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Citizenship Status</Text>
            <Radio.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(Citizenship).map(citizenshipStatus => (
                    <Radio key={citizenshipStatus} value={citizenshipStatus}>{citizenshipStatus}</Radio>
                ))}
            </Radio.Group>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Employment Status</Text>
            <Radio.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(EmploymentStatus).map(employmentStatus => (
                    <Radio key={employmentStatus} value={employmentStatus}>{employmentStatus}</Radio>
                ))}
            </Radio.Group>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Accessibility Needs</Text>
            <Checkbox.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
            >
                {Object.values(Accessibility).map(accessibilityNeed => (
                    <Checkbox key={accessibilityNeed} value={accessibilityNeed}>{accessibilityNeed}</Checkbox>
                ))}
            </Checkbox.Group>
            <Spacer y={1} />
        </Grid>
    )
}
