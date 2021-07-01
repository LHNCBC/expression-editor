export const context = '/39156-5';

export const fhir = {
  bmisimple: {
    "id": "55418-8-x",
    "meta": {
      "versionId": "1",
      "lastUpdated": "2021-02-16T09:15:00.000-05:00",
      "profile": [
        "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"
      ],
      "tag": [
        {
          "code": "lformsVersion: 28.1.1"
        }
      ]
    },
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/variable",
        "valueExpression": {
          "name": "a",
          "language": "text/fhirpath",
          "expression": "%resource.item.where(linkId='/29463-7').answer.value"
        }
      },
      {
        "url": "http://hl7.org/fhir/StructureDefinition/variable",
        "valueExpression": {
          "name": "b",
          "language": "text/fhirpath",
          "expression": "%resource.item.where(linkId='/8302-2').answer.value*0.0254"
        }
      }
    ],
    "date": "2018-09-12T18:03:40-04:00",
    "identifier": [
      {
        "system": "http://loinc.org",
        "value": "55418-8"
      }
    ],
    "code": [
      {
        "system": "http://loinc.org",
        "code": "55418-8",
        "display": "Weight and Height tracking panel"
      }
    ],
    "subjectType": [
      "Patient"
    ],
    "status": "draft",
    "url": "https://lforms-smart-fhir.nlm.nih.gov/v/r4/fhir/Questionnaire/55418-8-x",
    "name": "weight_height_tracking_panel",
    "title": "Weight & Height tracking panel",
    "resourceType": "Questionnaire",
    "item": [
      {
        "type": "decimal",
        "code": [
          {
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Weight"
          }
        ],
        "extension": [
          {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
            "valueDuration": {
              "value": 1,
              "unit": "year",
              "system": "http://unitsofmeasure.org",
              "code": "a"
            }
          },
          {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
            "valueBoolean": true
          },
          {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
            "valueCoding": {
              "code": "kg",
              "system": "http://unitsofmeasure.org"
            }
          }
        ],
        "required": false,
        "linkId": "/29463-7",
        "text": "Weight"
      },
      {
        "type": "choice",
        "code": [
          {
            "system": "http://loinc.org",
            "code": "8352-7",
            "display": "Clothing worn during measure"
          }
        ],
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
            "valueCodeableConcept": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/questionnaire-item-control",
                  "code": "drop-down",
                  "display": "Drop down"
                }
              ],
              "text": "Drop down"
            }
          }
        ],
        "required": false,
        "linkId": "/8352-7",
        "text": "Clothing worn during measure",
        "answerOption": [
          {
            "valueCoding": {
              "code": "LA11871-3",
              "display": "Underwear or less",
              "system": "http://loinc.org"
            }
          },
          {
            "valueCoding": {
              "code": "LA11872-1",
              "display": "Street clothes, no shoes",
              "system": "http://loinc.org"
            }
          },
          {
            "valueCoding": {
              "code": "LA11873-9",
              "display": "Street clothes & shoes",
              "system": "http://loinc.org"
            }
          }
        ]
      },
      {
        "type": "decimal",
        "code": [
          {
            "system": "http://loinc.org",
            "code": "8302-2",
            "display": "Body height"
          }
        ],
        "extension": [
          {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
            "valueDuration": {
              "value": 1,
              "unit": "year",
              "system": "http://unitsofmeasure.org",
              "code": "a"
            }
          },
          {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
            "valueBoolean": true
          },
          {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
            "valueCoding": {
              "code": "[in_i]",
              "system": "http://unitsofmeasure.org"
            }
          }
        ],
        "required": false,
        "linkId": "/8302-2",
        "text": "Body height"
      },
      {
        "type": "decimal",
        "code": [
          {
            "system": "http://loinc.org",
            "code": "39156-5",
            "display": "BMI"
          }
        ],
        "extension": [
          {
            "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
            "valueExpression": {
              "description": "BMI calculation",
              "language": "text/fhirpath",
              "expression": "%a/(%b.power(2))"
            },
            "extension": [{
              "url": "http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax",
              "valueString": "a/b^2"
            }]
          },
          {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
            "valueCoding": {
              "code": "kg/m2",
              "system": "http://unitsofmeasure.org"
            }
          }
        ],
        "required": false,
        "linkId": "/39156-5",
        "text": "BMI"
      },
      {
        "type": "choice",
        "code": [
          {
            "system": "http://loinc.org",
            "code": "8361-8",
            "display": "Bdy position with respect to gravity"
          }
        ],
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
            "valueCodeableConcept": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/questionnaire-item-control",
                  "code": "drop-down",
                  "display": "Drop down"
                }
              ],
              "text": "Drop down"
            }
          }
        ],
        "required": false,
        "linkId": "/8361-8",
        "text": "Bdy position with respect to gravity",
        "answerOption": [
          {
            "valueCoding": {
              "code": "LA11868-9",
              "display": "Sitting",
              "system": "http://loinc.org"
            }
          },
          {
            "valueCoding": {
              "code": "LA11869-7",
              "display": "Lying",
              "system": "http://loinc.org"
            }
          },
          {
            "valueCoding": {
              "code": "LA11870-5",
              "display": "Standing",
              "system": "http://loinc.org"
            }
          }
        ]
      }
    ]
  },
  bmi: {
  "id": "55418-8-x",
  "meta": {
  "versionId": "1",
    "lastUpdated": "2021-02-16T09:15:00.000-05:00",
    "profile": [
    "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"
  ],
    "tag": [
    {
      "code": "lformsVersion: 28.1.1"
    }
  ]
},
  "extension": [
  {
    "url": "http://hl7.org/fhir/StructureDefinition/variable",
    "valueExpression": {
      "name": "a",
      "language": "text/fhirpath",
      "expression": "%resource.item.where(linkId='/29463-7').answer.value"
    }
  },
  {
    "url": "http://hl7.org/fhir/StructureDefinition/variable",
    "valueExpression": {
      "name": "b",
      "language": "text/fhirpath",
      "expression": "%resource.item.where(linkId='/8302-2').answer.value*0.0254"
    }
  }
],
  "date": "2018-09-12T18:03:40-04:00",
  "identifier": [
  {
    "system": "http://loinc.org",
    "value": "55418-8"
  }
],
  "code": [
  {
    "system": "http://loinc.org",
    "code": "55418-8",
    "display": "Weight and Height tracking panel"
  }
],
  "subjectType": [
  "Patient"
],
  "status": "draft",
  "url": "https://lforms-smart-fhir.nlm.nih.gov/v/r4/fhir/Questionnaire/55418-8-x",
  "name": "weight_height_tracking_panel",
  "title": "Weight & Height tracking panel",
  "resourceType": "Questionnaire",
  "item": [
  {
    "type": "decimal",
    "code": [
      {
        "system": "http://loinc.org",
        "code": "29463-7",
        "display": "Weight"
      }
    ],
    "extension": [
      {
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
        "valueDuration": {
          "value": 1,
          "unit": "year",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        }
      },
      {
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
        "valueBoolean": true
      },
      {
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
        "valueCoding": {
          "code": "kg",
          "system": "http://unitsofmeasure.org"
        }
      }
    ],
    "required": false,
    "linkId": "/29463-7",
    "text": "Weight"
  },
  {
    "type": "choice",
    "code": [
      {
        "system": "http://loinc.org",
        "code": "8352-7",
        "display": "Clothing worn during measure"
      }
    ],
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/questionnaire-item-control",
              "code": "drop-down",
              "display": "Drop down"
            }
          ],
          "text": "Drop down"
        }
      }
    ],
    "required": false,
    "linkId": "/8352-7",
    "text": "Clothing worn during measure",
    "answerOption": [
      {
        "valueCoding": {
          "code": "LA11871-3",
          "display": "Underwear or less",
          "system": "http://loinc.org"
        }
      },
      {
        "valueCoding": {
          "code": "LA11872-1",
          "display": "Street clothes, no shoes",
          "system": "http://loinc.org"
        }
      },
      {
        "valueCoding": {
          "code": "LA11873-9",
          "display": "Street clothes & shoes",
          "system": "http://loinc.org"
        }
      }
    ]
  },
  {
    "type": "decimal",
    "code": [
      {
        "system": "http://loinc.org",
        "code": "8302-2",
        "display": "Body height"
      }
    ],
    "extension": [
      {
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
        "valueDuration": {
          "value": 1,
          "unit": "year",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        }
      },
      {
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
        "valueBoolean": true
      },
      {
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
        "valueCoding": {
          "code": "[in_i]",
          "system": "http://unitsofmeasure.org"
        }
      }
    ],
    "required": false,
    "linkId": "/8302-2",
    "text": "Body height"
  },
  {
    "type": "decimal",
    "code": [
      {
        "system": "http://loinc.org",
        "code": "39156-5",
        "display": "BMI"
      }
    ],
    "extension": [
      {
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
        "valueExpression": {
          "description": "BMI calculation",
          "language": "text/fhirpath",
          "expression": "%a/(%b.power(2))"
        }
      },
      {
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
        "valueCoding": {
          "code": "kg/m2",
          "system": "http://unitsofmeasure.org"
        }
      }
    ],
    "required": false,
    "linkId": "/39156-5",
    "text": "BMI"
  },
  {
    "type": "choice",
    "code": [
      {
        "system": "http://loinc.org",
        "code": "8361-8",
        "display": "Bdy position with respect to gravity"
      }
    ],
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
        "valueCodeableConcept": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/questionnaire-item-control",
              "code": "drop-down",
              "display": "Drop down"
            }
          ],
          "text": "Drop down"
        }
      }
    ],
    "required": false,
    "linkId": "/8361-8",
    "text": "Bdy position with respect to gravity",
    "answerOption": [
      {
        "valueCoding": {
          "code": "LA11868-9",
          "display": "Sitting",
          "system": "http://loinc.org"
        }
      },
      {
        "valueCoding": {
          "code": "LA11869-7",
          "display": "Lying",
          "system": "http://loinc.org"
        }
      },
      {
        "valueCoding": {
          "code": "LA11870-5",
          "display": "Standing",
          "system": "http://loinc.org"
        }
      }
    ]
  }
]
},
  phq9: {
  "id": "44249-1-x",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2021-02-24T03:13:01.000-05:00",
    "source": "#FYIr64hNY3fVUo34",
    "profile": [
      "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"
    ],
    "tag": [
      {
        "code": "lformsVersion: 28.1.1"
      }
    ]
  },
  "extension": [],
  "identifier": [
    {
      "system": "http://loinc.org",
      "value": "44249-1"
    }
  ],
  "code": [
    {
      "system": "http://loinc.org",
      "code": "44249-1",
      "display": "PHQ-9 quick depression assessment panel"
    }
  ],
  "subjectType": [
    "Patient",
    "Person"
  ],
  "status": "draft",
  "name": "PHQ-9 quick depression assessment panel",
  "title": "PHQ-9 quick depression assessment panel",
  "resourceType": "Questionnaire",
  "item": [
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44250-9",
          "display": "Little interest or pleasure in doing things?"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44250-9",
      "text": "Little interest or pleasure in doing things?",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44255-8",
          "display": "Feeling down, depressed, or hopeless?"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44255-8",
      "text": "Feeling down, depressed, or hopeless?",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44259-0",
          "display": "Trouble falling or staying asleep, or sleeping too much"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44259-0",
      "text": "Trouble falling or staying asleep, or sleeping too much",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44254-1",
          "display": "Feeling tired or having little energy"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44254-1",
      "text": "Feeling tired or having little energy",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44251-7",
          "display": "Poor appetite or overeating"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44251-7",
      "text": "Poor appetite or overeating",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44258-2",
          "display": "Feeling bad about yourself-or that you are a failure or have let yourself or your family down"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44258-2",
      "text": "Feeling bad about yourself-or that you are a failure or have let yourself or your family down",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44252-5",
          "display": "Trouble concentrating on things, such as reading the newspaper or watching television"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44252-5",
      "text": "Trouble concentrating on things, such as reading the newspaper or watching television",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44253-3",
          "display": "Moving or speaking so slowly that other people could have noticed. Or the opposite-being so fidgety or restless that you have been moving around a lot more than usual"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": true,
      "linkId": "/44253-3",
      "text": "Moving or speaking so slowly that other people could have noticed. Or the opposite-being so fidgety or restless that you have been moving around a lot more than usual",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44260-8",
          "display": "Thoughts that you would be better off dead, or of hurting yourself in some way"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": false,
      "linkId": "/44260-8",
      "text": "Thoughts that you would be better off dead, or of hurting yourself in some way",
      "answerOption": [
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "0"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 0
            }
          ],
          "valueCoding": {
            "code": "LA6568-5",
            "display": "Not at all"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "1"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 1
            }
          ],
          "valueCoding": {
            "code": "LA6569-3",
            "display": "Several days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "2"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 2
            }
          ],
          "valueCoding": {
            "code": "LA6570-1",
            "display": "More than half the days"
          }
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-optionPrefix",
              "valueString": "3"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
              "valueDecimal": 3
            }
          ],
          "valueCoding": {
            "code": "LA6571-9",
            "display": "Nearly every day"
          }
        }
      ]
    },
    {
      "type": "decimal",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "44261-6",
          "display": "Patient health questionnaire 9 item total score"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-displayCategory",
          "valueCodeableConcept": {
            "coding": [
              {
                "display": "The PHQ-9 is the standard (and most commonly used) depression measure, and it ranges from 0-27 Scoring: Add up all checked boxes on PHQ-9. For every check: Not at all = 0; Several days = 1; More than half the days = 2; Nearly every day = 3 (the scores are the codes that appear in the answer list for each of the PHQ-9 problem panel terms). Interpretation: 1-4 = Minimal depression; 5-9 = Mild depression; 10-14 = Moderate depression; 15-19 = Moderately severe depression; 20-27 = Severed depression."
              }
            ],
            "text": "The PHQ-9 is the standard (and most commonly used) depression measure, and it ranges from 0-27 Scoring: Add up all checked boxes on PHQ-9. For every check: Not at all = 0; Several days = 1; More than half the days = 2; Nearly every day = 3 (the scores are the codes that appear in the answer list for each of the PHQ-9 problem panel terms). Interpretation: 1-4 = Minimal depression; 5-9 = Mild depression; 10-14 = Moderate depression; 15-19 = Moderately severe depression; 20-27 = Severed depression."
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-unit",
          "valueCoding": {
            "display": "{score}"
          }
        }
      ],
      "required": false,
      "linkId": "/39156-5",
      "text": "Patient health questionnaire 9 item total score"
    },
    {
      "type": "choice",
      "code": [
        {
          "system": "http://loinc.org",
          "code": "69722-7",
          "display": "How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?"
        }
      ],
      "extension": [
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-displayCategory",
          "valueCodeableConcept": {
            "coding": [
              {
                "display": "If you checked off any problems on this questionnaire"
              }
            ],
            "text": "If you checked off any problems on this questionnaire"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
          "valueDuration": {
            "value": 1,
            "unit": "year",
            "system": "http://unitsofmeasure.org",
            "code": "a"
          }
        },
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
          "valueBoolean": true
        },
        {
          "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/questionnaire-item-control",
                "code": "drop-down",
                "display": "Drop down"
              }
            ],
            "text": "Drop down"
          }
        }
      ],
      "required": false,
      "linkId": "/69722-7",
      "text": "How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
      "answerOption": [
        {
          "valueCoding": {
            "code": "LA6572-7",
            "display": "Not difficult at all"
          }
        },
        {
          "valueCoding": {
            "code": "LA6573-5",
            "display": "Somewhat difficult"
          }
        },
        {
          "valueCoding": {
            "code": "LA6575-0",
            "display": "Very difficult"
          }
        },
        {
          "valueCoding": {
            "code": "LA6574-3",
            "display": "Extremely difficult"
          }
        }
      ]
    }
  ]
}
};
