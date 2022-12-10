import React, { useEffect, useState } from "react";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarStatus } from "./SidebarStatus";
import { SidebarFamily } from "./SidebarFamily";
import {
  Accessibility,
  Citizenship,
  EmploymentStatus,
  Family,
  Insurance,
  Language,
  Resource,
  ResourceCategory,
  SurveyAnswers,
} from "../../../models/types";
import { WithId } from "mongodb";
import { AES, enc } from "crypto-js";
import { ResourcesResponse } from "../../../pages/api/resources";

interface FilterSidebarProps {
  setResources(resources: WithId<Resource>[]): void
}

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
    language: language.length > 0 ? language : undefined,
    citizenship,
    parentAge,
    childAge,
    family,
    employmentStatus: employment,
    insurance: insurance,
    accessibility: accessibility.length > 0 ? accessibility : undefined,
  };

  useEffect(() => {
    const fetchFilteredResources = async () => {
      const encryptedQuizResponse = AES.encrypt(JSON.stringify(filters), "Secret Passphrase").toString()
      const requestBody = JSON.stringify({data: encryptedQuizResponse})
      const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
      const response : Response = await fetch('/api/resources', requestSettings)
      const resources : ResourcesResponse = await response.json()
      if (resources.data.requested.length > 0) {
        props.setResources(resources.data.requested)
      } else {
        props.setResources(resources.data.additional)
      }
    }

    fetchFilteredResources().catch(console.error)
  }, [categories, language, insurance, income, citizenship, employment, accessibility, family, parentAge, childAge]);

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
