import React from "react";
import { Text, Grid, Checkbox, Spacer, Radio, Input } from "@nextui-org/react";
import styles from "./FilterSidebar.module.css";

import {
  Language,
  Insurance,
  Citizenship,
  EmploymentStatus,
  Accessibility,
} from "../../../models/types";
import ClearFieldsButton from "./ClearFieldsButton";

interface SidebarStatusProps {
  language: Language[]
  setLanguage(s: Language[]): void
  insurance: Insurance | undefined
  setInsurance(s: Insurance | undefined): void
  setIncome(n: number | undefined): void
  citizenship: Citizenship | undefined
  setCitizenship(s: Citizenship | undefined): void
  employment: EmploymentStatus | undefined
  setEmployment(s: EmploymentStatus | undefined): void
  accessibility: Accessibility[]
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
      <Checkbox.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setLanguage(e as Language[])} value={props.language}>
        {Object.values(Language).map((language) => (
          <Checkbox key={language} value={language} size={"xs"}>
            <Text className={styles.sidebarCheckboxText}>{language}</Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <ClearFieldsButton setField={props.setLanguage} clearedValue={[]}/>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Insurance Type</Text>
      <Radio.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setInsurance(e as Insurance)} value={props.insurance}>
        {Object.values(Insurance).map((insuranceType) => (
          <Radio key={insuranceType} value={insuranceType} size={"xs"}>
            <Text className={styles.sidebarCheckboxText}>{insuranceType}</Text>
          </Radio>
        ))}
      </Radio.Group>
      <ClearFieldsButton setField={props.setInsurance} clearedValue={undefined}/>
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
      <Radio.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setCitizenship(e as Citizenship)} value={props.citizenship}>
        {Object.values(Citizenship).map((citizenshipStatus) => (
          <Radio key={citizenshipStatus} value={citizenshipStatus} size={"xs"}>
            <Text className={styles.sidebarCheckboxText}>{citizenshipStatus}</Text>
          </Radio>
        ))}
      </Radio.Group>
      <ClearFieldsButton clearedValue={undefined} setField={props.setCitizenship}/>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Employment Status</Text>
      <Radio.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setEmployment(e as EmploymentStatus)} value={props.employment}>
        {Object.values(EmploymentStatus).map((employmentStatus) => (
          <Radio key={employmentStatus} value={employmentStatus} size={"xs"}>
            <Text className={styles.sidebarCheckboxText}>{employmentStatus}</Text>
          </Radio>
        ))}
      </Radio.Group>
      <ClearFieldsButton setField={props.setEmployment} clearedValue={undefined}/>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Accessibility Needs</Text>
      <Checkbox.Group color="primary" className={styles.sidebarCheckboxGroup} onChange={e => props.setAccessibility(e as Accessibility[])} value={props.accessibility}>
        {Object.values(Accessibility).map((accessibilityNeed) => (
          <Checkbox key={accessibilityNeed} value={accessibilityNeed} size={"xs"}>
            <Text className={styles.sidebarCheckboxText}>{accessibilityNeed}</Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <ClearFieldsButton setField={props.setAccessibility} clearedValue={[]}/>
      <Spacer y={1} />
    </Grid>
  );
};