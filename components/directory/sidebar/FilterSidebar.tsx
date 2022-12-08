import React, { useEffect, useState } from "react";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarStatus } from "./SidebarStatus";
import { SidebarFamily } from "./SidebarFamily";
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, Language, ResourceCategory, SurveyAnswers } from "../../../models/types";

interface FilterSidebarProps { }

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

  // TODO: fix the type mismatch with filters
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

  // TODO: get rid of this useEffect once done testing
  useEffect(() => {
    console.log("Test", filters)
  }, [filters])

  return (
    <>
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
    </>
  );
};
