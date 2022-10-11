const TagsMap = () => {
  const m = new Map<string, string>()
  m.set("Childcare", "var(--brand-blue)")
  m.set("Healthcare", "var(--brand-purple)")
  m.set("Any Income", "var(--brand-green)")
  m.set("Community", "#D00DF0")
  m.set("Events", "var(--brand-orange)")
  m.set("Family-Friendly", "var(--brand-primary)")
  return m
}

export default TagsMap;
