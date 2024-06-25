function createDisplayOption(hiddenSectionStr) {
  const displaySections = ["titleSection", "uneditableVariablesSection",
                           "itemVariablesSection", "outputExpressionSection"];
  const sections = hiddenSectionStr.split(",");
  const display = {};

  if (sections.length > 0) {
    sections.forEach(key => {
      if (displaySections.indexOf(key) > -1)
        display[key] = false;
    });
  }
  return display;
};