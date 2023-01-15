import React from 'react';
import { Text, Grid, Spacer, Radio, Input } from "@nextui-org/react";
import styles from "./FilterSidebar.module.css";
import { Family } from "../../../models/types";
import ClearFieldsButton from './ClearFieldsButton';

interface SidebarFamilyProps {
    family: Family | undefined
    setFamily(f: Family | undefined): void
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
                value={props.family ?? ""}
            >
                {Object.values(Family).map(familyType => (
                    <Radio key={familyType} value={familyType} size={"xs"}>
                        <Text className={styles.sidebarCheckboxText}>{familyType}</Text>
                    </Radio>
                ))}
            </Radio.Group>
            <ClearFieldsButton clearedValue={undefined} setField={props.setFamily}/>
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
