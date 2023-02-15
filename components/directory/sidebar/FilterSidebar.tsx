import React, { ChangeEvent, useEffect, useState } from "react";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarStatus } from "./SidebarStatus";
import { SidebarFamily } from "./SidebarFamily";
import { Resource, SurveyAnswers } from "../../../models/types2";
import { WithId } from "mongodb";
import { AES, enc } from "crypto-js";
import { ResourcesResponse } from "../../../pages/api/resources";
import { ResourceSearchBar } from "./ResourceSearchBar";
import { FormElement } from "@nextui-org/react";
import {
  Language,
  ResourceCategory,
  Accessibility,
} from "../../../models/types";

const SEARCH_PLACEHOLDER_TEXT = "Search Resources";

interface FilterSidebarProps {
  setResources(resources: WithId<Resource>[]): void;
  filterValues: FilterValues;
  filterSetters: FilterSetters;
}

interface FilterValues {
  categories: ResourceCategory[];
  language: Language[];
  income: number | undefined;
  householdMembers: number | undefined;
  accessibility: Accessibility[];
  searchQuery: string;
  // insurance: Insurance | undefined
  // citizenship: Citizenship | undefined
  // employment: EmploymentStatus | undefined
  // family: Family | undefined
  // parentAge: number | undefined
  // childAge: number | undefined
}
interface FilterSetters {
  setCategories(s: ResourceCategory[]): void;
  setLanguage(s: Language[]): void;
  setIncome(s: number | undefined): void;
  setHouseholdMembers(s: number | undefined): void;
  setAccessibility(s: Accessibility[]): void;
  setSearchQuery(s: string | undefined): void;
  // setInsurance(s: Insurance | undefined): void
  // setCitizenship(s: Citizenship | undefined): void
  // setEmployment(s: EmploymentStatus | undefined): void
  // setFamily(f: Family | undefined): void
  // setParentAge(n: number | undefined): void
  // setChildAge(n: number | undefined): void
}

export const FilterSidebar: React.FC<FilterSidebarProps> = (
  props: FilterSidebarProps
) => {
  // const {categories, language, insurance, citizenship, employment, accessibility, family, searchQuery, parentAge, childAge, income} = props.filterValues
  const {
    categories,
    language,
    accessibility,
    householdMembers,
    searchQuery,
    income,
  } = props.filterValues;
  // const {setAccessibility, setCategories, setChildAge, setCitizenship, setEmployment, setFamily, setInsurance, setLanguage, setParentAge, setSearchQuery, setIncome} = props.filterSetters
  const {
    setAccessibility,
    setCategories,
    setLanguage,
    setSearchQuery,
    setIncome,
    setHouseholdMembers,
  } = props.filterSetters;

  // The resources after the filters have been applied (but before the search query)
  const [filteredResources, setFilteredResources] = useState<
    WithId<Resource>[]
  >([]);

  useEffect(() => {
    const filters: SurveyAnswers = {
      categories: categories,
      householdIncome: income ? income : 0,
      householdMembers: householdMembers ? householdMembers : 1,
      language: language.length > 0 ? language : undefined,
      accessibility: accessibility.length > 0 ? accessibility : undefined,
      // citizenship,
      // parentAge,
      // childAge,
      // family,
      // employmentStatus: employment,
      // insurance: insurance,
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
    income,
    accessibility,
    householdMembers,
    // insurance,
    // citizenship,
    // employment,
    // family,
    // parentAge,
    // childAge,
  ]);

  useEffect(() => {
    if (searchQuery === SEARCH_PLACEHOLDER_TEXT)
      return props.setResources(filteredResources);
    const searchQueryAppliedResources = filteredResources.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    props.setResources(searchQueryAppliedResources);
  }, [filteredResources, searchQuery]);

  return (
    <>
      <ResourceSearchBar
        placeholder={SEARCH_PLACEHOLDER_TEXT}
        onChange={(e: ChangeEvent<FormElement>) => {
          setSearchQuery(e.target.value);
        }}
      />
      <SidebarCategories
        setCategories={setCategories}
        categories={categories}
      />
      <SidebarStatus
        language={language}
        setLanguage={setLanguage}
        // insurance={insurance}
        // setInsurance={setInsurance}
        setIncome={setIncome}
        setMembers={setHouseholdMembers}
        // citizenship={citizenship}
        // setCitizenship={setCitizenship}
        // employment={employment}
        // setEmployment={setEmployment}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
      />
      {/* <SidebarFamily
      family={family}
        setFamily={setFamily}
        setParentAge={setParentAge}
        setChildAge={setChildAge}
      /> */}
    </>
  );
};
