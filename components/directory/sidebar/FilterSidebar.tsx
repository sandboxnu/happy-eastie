import React, { ChangeEvent, useEffect, useState } from "react";
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
import { ResourceSearchBar } from "./ResourceSearchBar";
import { FormElement } from "@nextui-org/react";

const SEARCH_PLACEHOLDER_TEXT = "Search Resources"

interface FilterSidebarProps {
  setResources(resources: WithId<Resource>[]): void;
  filterValues: FilterValues
  filterSetters: FilterSetters
}

interface FilterValues {
  categories: ResourceCategory[];
      language: Language[],
      insurance: Insurance | undefined
      income: number | undefined
      citizenship: Citizenship | undefined
      employment: EmploymentStatus | undefined
      accessibility: Accessibility[]
      family: Family | undefined
      searchQuery: string
      parentAge: number | undefined
      childAge: number | undefined
  
}
interface FilterSetters{
  setCategories(s: ResourceCategory[]): void
      setLanguage(s: Language[]): void
      setIncome(s: number | undefined): void
      setInsurance(s: Insurance | undefined): void
      setCitizenship(s: Citizenship | undefined): void
      setEmployment(s: EmploymentStatus | undefined): void
      setAccessibility(s: Accessibility[]): void
      setFamily(f: Family | undefined): void
      setParentAge(n: number | undefined): void
      setChildAge(n: number | undefined): void
      setSearchQuery(s: string | undefined): void
  }


export const FilterSidebar: React.FC<FilterSidebarProps> = (
  props: FilterSidebarProps
) => {

  const {categories, language, insurance, citizenship, employment, accessibility, family, searchQuery, parentAge, childAge, income} = props.filterValues
  const {setAccessibility, setCategories, setChildAge, setCitizenship, setEmployment, setFamily, setInsurance, setLanguage, setParentAge, setSearchQuery, setIncome} = props.filterSetters
  // The resources after the filters have been applied (but before the search query)
  const [filteredResources, setFilteredResources] = useState<WithId<Resource>[]>([])

  useEffect(() => {

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

    const fetchFilteredResources = async () => {
      const encryptedQuizResponse = AES.encrypt(
        JSON.stringify(filters),
        "Secret Passphrase"
      ).toString();
      const requestBody = JSON.stringify({ data: encryptedQuizResponse });
      const requestSettings = {
        method: "POST",
        body: requestBody,
        headers: { "Content-Type": "application/json" },
      };
      const response: Response = await fetch("/api/resources", requestSettings);
      const resources: ResourcesResponse = await response.json();
      if (resources.data.requested.length > 0) {
        setFilteredResources(resources.data.requested);
      } else {
        setFilteredResources(resources.data.additional);
      }
    };

    fetchFilteredResources().catch(console.error);
  }, [
    categories,
    language,
    insurance,
    income,
    citizenship,
    employment,
    accessibility,
    family,
    parentAge,
    childAge,
  ]);

  useEffect(() => {
    if (searchQuery === SEARCH_PLACEHOLDER_TEXT) return props.setResources(filteredResources)
    const searchQueryAppliedResources = filteredResources.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    props.setResources(searchQueryAppliedResources)
  }, [filteredResources, searchQuery])

  return (
    <>
      <ResourceSearchBar
        placeholder={SEARCH_PLACEHOLDER_TEXT}
        onChange={(e: ChangeEvent<FormElement>) => {
          setSearchQuery(e.target.value);
        }}
      />
      <SidebarCategories setCategories={setCategories} categories={categories}/>
      <SidebarStatus
      language={language}
        setLanguage={setLanguage}
        insurance={insurance}
        setInsurance={setInsurance}
        setIncome={setIncome}
        citizenship={citizenship}
        setCitizenship={setCitizenship}
        employment={employment}
        setEmployment={setEmployment}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
      />
      <SidebarFamily
      family={family}
        setFamily={setFamily}
        setParentAge={setParentAge}
        setChildAge={setChildAge}
      />
    </>
  );
};
