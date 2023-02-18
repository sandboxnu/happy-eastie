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

  const [householdMembers, setHouseholdMembers] = useState<number>();
  const [householdIncome, setHouseholdIncome] = useState<number>();

  const [documentationNotRequired, setDocumentationNotRequired] = useState<boolean>(false);

  const [languageOptions, setLanguageOptions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [accessibilityOptions, setAccessibilityOptions] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);

  const getLanguagesAndAccessibility = async () => {
    const allCategories = await fetch("/api/resources/categories");
    const categoriesResult = await allCategories.json()
    setCategories(categoriesResult)

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
    const filters: SurveyAnswers = {
      categories: selectedCategories.length == 0 ? categories : selectedCategories,
      householdIncome: householdIncome ? householdIncome : 0,
      householdMembers: householdMembers ? householdMembers : 20,
      documentation: documentationNotRequired,
      languages: selectedLanguages.length == 0 ? languageOptions : selectedLanguages ,
      accessibility: selectedAccessibility.length == 0 ? accessibilityOptions : selectedAccessibility,
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
  }, [selectedCategories, householdMembers, householdIncome, documentationNotRequired, selectedLanguages, selectedAccessibility, categories, languageOptions, accessibilityOptions]);

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
        categories={categories}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
      <SidebarStatus
        setHouseholdMembers={setHouseholdMembers}
        setHouseholdIncome={setHouseholdIncome}
        setDocumentationNotRequired={setDocumentationNotRequired}
        
        languageOptions={languageOptions}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        
        accessibilityOptions={accessibilityOptions}
        setSelectedAccessibility={setSelectedAccessibility} 
        selectedAccessibility={selectedAccessibility}      />
    </>
  );
};
