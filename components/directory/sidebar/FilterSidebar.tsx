import React, { useEffect, useState } from "react";
import { Grid, Spacer } from "@nextui-org/react";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarStatus } from "./SidebarStatus";
import { SidebarFamily } from "./SidebarFamily";
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, Language, ResourceCategory, SurveyAnswers } from "../../../models/types";

interface FilterSidebarProps {}

export const FilterSidebar: React.FC<FilterSidebarProps> = (
  props: FilterSidebarProps
) => {
  const [categories, setCategories] = useState<ResourceCategory[]>([]);

  const [language, setLanguage] = useState<Language[]>([]);
  const [insurance, setInsurance] = useState<Insurance>();
  const [income, setIncome] = useState<number>();
  const [citizenship, setCitizenship] = useState<Citizenship>();
  const [employment, setEmployment] = useState<EmploymentStatus>();
  const [accessibility, setAccessibility] = useState<Accessibility[]>([]);

  const [family, setFamily] = useState<Family>();
  const [parentAge, setParentAge] = useState<number>();
  const [childAge, setChildAge] = useState<number>();

  const filters: SurveyAnswers = {
    category: categories,
    income,
    language,
    citizenship,
    parentAge,
    childAge,
    family,
    employmentStatus: employment,
    insurance: insurance,
    accessibility: accessibility
  }

  useEffect(() => {
    console.log("Test", filters)
  }, [filters])

  return (
    <Grid xs={0} sm={3} style={{ backgroundColor: "#DCDCDC", width: "283px" }}>
      <Grid.Container justify="center">
        <SidebarCategories setCategories={setCategories} />
        <SidebarStatus
          setLanguage={setLanguage}
          setInsurance={setInsurance}
          setIncome={setIncome}
          setCitizenship={setCitizenship}
          setEmployment={setEmployment}
          setAccessibility={setAccessibility}
        />
        <SidebarFamily
          setFamily={setFamily}
          setParentAge={setParentAge}
          setChildAge={setChildAge}
        />
      </Grid.Container>
    </Grid>
  );
};
