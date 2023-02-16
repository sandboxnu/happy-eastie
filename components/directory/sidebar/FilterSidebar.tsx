import React, { ChangeEvent, useEffect, useState } from "react";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarStatus } from "./SidebarStatus";
import { Resource, SurveyAnswers } from "../../../models/types2";
import { WithId } from "mongodb";
import { AES, enc } from "crypto-js";
import { ResourcesResponse } from "../../../pages/api/resources";
import { ResourceSearchBar } from "./ResourceSearchBar";
import { FormElement } from "@nextui-org/react";

const SEARCH_PLACEHOLDER_TEXT = "Search Resources";

interface FilterSidebarProps {
  setDisplayResources(resources: WithId<Resource>[]): void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = (
  props: FilterSidebarProps
) => {
  // The resources after the filters have been applied (but before the search query)
  const [filteredResources, setFilteredResources] = useState<
    WithId<Resource>[]
  >([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [languageOptions, setLanguageOptions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [accessibilityOptions, setAccessibilityOptions] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);

  const getLanguagesAndAccessibility = async () => {
    const allLanguages = await fetch("/api/resources/languages");
    const languagesResult = await allLanguages.json()
    setLanguageOptions(languagesResult)

    const allAccessibility = await fetch("/api/resources/accessibility")
    const accessibilityResult = await allAccessibility.json()
    setAccessibilityOptions(accessibilityResult)
  } 

  useEffect(() => {
    getLanguagesAndAccessibility()
  }, [])

  useEffect(() => {
    // const filters: SurveyAnswers = {
    //   categories: categories,
    //   householdIncome: income ? income : 0,
    //   householdMembers: householdMembers ? householdMembers : 1,
    //   languages: languageOptions,
    //   accessibility: accessibility.length > 0 ? accessibility : undefined,
    // };

    // const fetchFilteredResources = async () => {
    //   const encryptedQuizResponse = AES.encrypt(
    //     JSON.stringify(filters),
    //     "Secret Passphrase"
    //   ).toString();
    //   const requestBody = JSON.stringify({ data: encryptedQuizResponse });
    //   const requestSettings = {
    //     method: "POST",
    //     body: requestBody,
    //     headers: { "Content-Type": "application/json" },
    //   };
    //   const response: Response = await fetch("/api/resources", requestSettings);
    //   const resources: ResourcesResponse = await response.json();
    //   if (resources.data.requested.length > 0) {
    //     setFilteredResources(resources.data.requested);
    //   } else {
    //     setFilteredResources(resources.data.additional);
    //   }
    // };

    // fetchFilteredResources().catch(console.error);
  }, [
    // categories,
    selectedLanguages,
    // income,
    selectedAccessibility,
    // householdMembers,
  ]);

  useEffect(() => {
    if (searchQuery === SEARCH_PLACEHOLDER_TEXT)
      return props.setDisplayResources(filteredResources);
    const searchQueryAppliedResources = filteredResources.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    props.setDisplayResources(searchQueryAppliedResources);
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
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        languageOptions={languageOptions}
        setIncome={setIncome}
        setHouseholdMembers={setHouseholdMembers}
        accessibilityOptions={accessibilityOptions}
        setSelectedAccessibility={setSelectedAccessibility} 
        selectedAccessibility={selectedAccessibility}      />
    </>
  );
};
