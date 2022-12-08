import React from "react";
import { Text, Grid, Checkbox, Spacer, Radio, Input } from "@nextui-org/react";
import styles from "../../../styles/Directory.module.css";
import {
  Language,
  Insurance,
  Citizenship,
  EmploymentStatus,
  Accessibility,
} from "../../../models/types";

interface SidebarStatusProps {
  setLanguage(s: Language[]): void
  setInsurance(s: Insurance): void
  setIncome(n: number | undefined): void
  setCitizenship(s: Citizenship): void
  setEmployment(s: EmploymentStatus): void
  setAccessibility(s: Accessibility[]): void
}

export const SidebarStatus: React.FC<SidebarStatusProps> = (
  props: SidebarStatusProps
) => {
  return (
    <Grid>
      <Text className={styles.sidebarBanner}>Status</Text>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Language</Text>
      <Checkbox.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setLanguage(e as Language[])}>
        {Object.values(Language).map((language) => (
          <Checkbox key={language} value={language}>
            <Text className={styles.sidebarCheckboxText}>{language}</Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Insurance Type</Text>
      <Radio.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setInsurance(e as Insurance)}>
        {Object.values(Insurance).map((insuranceType) => (
          <Radio key={insuranceType} value={insuranceType}>
            <Text className={styles.sidebarCheckboxText}>{insuranceType}</Text>
          </Radio>
        ))}
      </Radio.Group>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Annual Income</Text>
      <Input clearable bordered className={styles.sidebarInputBox} onChange={e => {
        if (!e.target.value) return props.setIncome(undefined)
        const num = parseInt(e.target.value)
        if (isNaN(num)) return
        return props.setIncome(num)
      }} />
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Citizenship Status</Text>
      <Radio.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setCitizenship(e as Citizenship)}>
        {Object.values(Citizenship).map((citizenshipStatus) => (
          <Radio key={citizenshipStatus} value={citizenshipStatus}>
            <Text className={styles.sidebarCheckboxText}>{citizenshipStatus}</Text>
          </Radio>
        ))}
      </Radio.Group>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Employment Status</Text>
      <Radio.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setEmployment(e as EmploymentStatus)}>
        {Object.values(EmploymentStatus).map((employmentStatus) => (
          <Radio key={employmentStatus} value={employmentStatus}>
            <Text className={styles.sidebarCheckboxText}>{employmentStatus}</Text>
          </Radio>
        ))}
      </Radio.Group>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Accessibility Needs</Text>
      <Checkbox.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setAccessibility(e as Accessibility[])}>
        {Object.values(Accessibility).map((accessibilityNeed) => (
          <Checkbox key={accessibilityNeed} value={accessibilityNeed}>
            <Text className={styles.sidebarCheckboxText}>{accessibilityNeed}</Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Spacer y={1} />
    </Grid>
  );
};
