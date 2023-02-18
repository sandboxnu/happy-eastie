import React, {useState} from "react";
import { Text, Grid, Checkbox, Spacer, Radio, Input } from "@nextui-org/react";
import styles from "./FilterSidebar.module.css";
import ClearFieldsButton from "./ClearFieldsButton";

interface SidebarStatusProps {
  setHouseholdMembers(n: number | undefined): void;
  setHouseholdIncome(n: number | undefined): void;
  setDocumentationNotRequired(n: boolean): void;

  languageOptions: string[];
  selectedLanguages: string[];
  setSelectedLanguages(s: string[]): void;
  
  accessibilityOptions: string[];
  selectedAccessibility: string[];
  setSelectedAccessibility(s: string[]): void;
}

export const SidebarStatus: React.FC<SidebarStatusProps> = (
  props: SidebarStatusProps
) => {
  return (
    <Grid>
      <Text className={styles.sidebarBanner}>Status</Text>
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Language</Text>
      <Checkbox.Group
        color="primary"
        className={styles.sidebarCheckboxGroup}
        onChange={(e) => props.setSelectedLanguages(e as string[])}
        value={props.selectedLanguages}
      >
        {props.languageOptions.map((language) => (
          <Checkbox key={language} value={language} size={"xs"}>
            <Text className={styles.sidebarCheckboxText}>{language}</Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <ClearFieldsButton
        setField={props.setSelectedLanguages}
        clearedValue={[]}
      />
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Total Household Member</Text>
      <Input
        clearable
        bordered
        className={styles.sidebarInputBox}
        onChange={(e) => {
          if (!e.target.value) return props.setHouseholdMembers(undefined);
          const num = parseInt(e.target.value);
          if (isNaN(num)) return;
          return props.setHouseholdMembers(num);
        }}
      />
      <Spacer y={1} />
      <Text className={styles.sidebarSubCategory}>Total Annual Income</Text>
      <Input
        clearable
        bordered
        className={styles.sidebarInputBox}
        onChange={(e) => {
          if (!e.target.value) return props.setHouseholdIncome(undefined);
          const num = parseInt(e.target.value);
          if (isNaN(num)) return;
          return props.setHouseholdIncome(num);
        }}
      />
      <Spacer y={1} />

      <Text className={styles.sidebarSubCategory}>Documentation Not Required</Text>
      <Checkbox.Group
        color="primary"
        className={styles.sidebarCheckboxGroup}  
      >
          <Checkbox
            onChange={props.setDocumentationNotRequired}
            size={"xs"}
          >
            <Text className={styles.sidebarCheckboxText}>
              View resources that does not require documentations
            </Text>
          </Checkbox>
      </Checkbox.Group>

      <Text className={styles.sidebarSubCategory}>Accessibility Needs</Text>
      <Checkbox.Group
        color="primary"
        className={styles.sidebarCheckboxGroup}
        onChange={(e) => props.setSelectedAccessibility(e as string[])}
        value={props.selectedAccessibility}
      >
        {props.accessibilityOptions.map((accessibilityNeed) => (
          <Checkbox
            key={accessibilityNeed}
            value={accessibilityNeed}
            size={"xs"}
          >
            <Text className={styles.sidebarCheckboxText}>
              {accessibilityNeed}
            </Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <ClearFieldsButton setField={props.setSelectedAccessibility} clearedValue={[]} />
        <Spacer y={1} />
    </Grid>
  );
};
