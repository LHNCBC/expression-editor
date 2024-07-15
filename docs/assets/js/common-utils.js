
/**
 * Set the display object to show/hide various sections of the Rule Editor
 * based on the hiddenSectionStr.
 * @param hiddenSectionStr - a comma-separated list of section names to be
 * hidden. Possible values are:
 * 
 *  "titleSection", "uneditableVariablesSection", "itemVariablesSection", and
 *  "outputExpressionSection"
 */
export function createDisplayOption(hiddenSectionStr) {
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