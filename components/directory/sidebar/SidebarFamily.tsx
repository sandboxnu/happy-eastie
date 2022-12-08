import React from 'react';
import { Text, Grid, Spacer, Radio, Input } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import { Family } from "../../../models/types";

interface SidebarFamilyProps {
    setFamily(f: Family): void
    setParentAge(n: number | undefined): void
    setChildAge(n: number | undefined): void
}

export const SidebarFamily: React.FC<SidebarFamilyProps> = (props: SidebarFamilyProps) => {
    return (
        <Grid>
            <Text className={styles.sidebarBanner}>Family</Text>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Family Type</Text>
            <Radio.Group
                color="primary"
                className={styles.sidebarCheckboxGroup}
                onChange={e => props.setFamily(e as Family)}
            >
                {Object.values(Family).map(familyType => (
                    <Radio key={familyType} value={familyType}>
                        <Text className={styles.sidebarCheckboxText}>{familyType}</Text>
                    </Radio>
                ))}
            </Radio.Group>
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Parent Age</Text>
            <Input clearable bordered className={styles.sidebarInputBox} onChange={e => {
                if (!e.target.value) return props.setParentAge(undefined)
                const num = parseInt(e.target.value)
                if (isNaN(num)) return
                return props.setParentAge(num)
            }} />
            <Spacer y={1} />

            <Text className={styles.sidebarSubCategory}>Child Age</Text>
            <Input clearable bordered className={styles.sidebarInputBox} onChange={e => {
                if (!e.target.value) return props.setChildAge(undefined)
                const num = parseInt(e.target.value)
                if (isNaN(num)) return
                return props.setChildAge(num)
            }} />
            <Spacer y={1} />
        </Grid>
    )
}
