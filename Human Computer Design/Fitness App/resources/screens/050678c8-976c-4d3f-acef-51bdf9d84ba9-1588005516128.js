jQuery("#simulation")
  .on("click", ".s-050678c8-976c-4d3f-acef-51bdf9d84ba9 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Button-blue")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue > .backgroundLayer": {
                      "attributes": {
                        "border-top-color": "#80B8F1",
                        "border-right-color": "#80B8F1",
                        "border-bottom-color": "#80B8F1",
                        "border-left-color": "#80B8F1"
                      }
                    }
                  },{
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue span": {
                      "attributes": {
                        "color": "#80B8F1"
                      }
                    }
                  },{
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue": {
                      "attributes-ie": {
                        "border-top-color": "#80B8F1",
                        "border-right-color": "#80B8F1",
                        "border-bottom-color": "#80B8F1",
                        "border-left-color": "#80B8F1"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue > .backgroundLayer": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#F9F8FC",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#F9F8FC",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#F9F8FC",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#F9F8FC",
                        "border-radius": "7px 7px 7px 7px"
                      }
                    }
                  },{
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue": {
                      "attributes": {
                        "line-height": "23px",
                        "font-size": "12.0pt",
                        "font-family": "'Roboto-Regular',Arial"
                      }
                    }
                  },{
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "text-align": "center"
                      }
                    }
                  },{
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue span": {
                      "attributes": {
                        "color": "#FF2D55",
                        "text-align": "center",
                        "text-decoration": "none",
                        "font-family": "'Roboto-Regular',Arial",
                        "font-size": "12.0pt"
                      }
                    }
                  },{
                    "#s-050678c8-976c-4d3f-acef-51bdf9d84ba9 #s-Button-blue": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#F9F8FC",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#F9F8FC",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#F9F8FC",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#F9F8FC",
                        "border-radius": "7px 7px 7px 7px"
                      }
                    }
                  } ],
                  "exectype": "timed",
                  "delay": 300
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        },
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimShow",
                  "parameter": {
                    "target": [ "#s-Group_1" ]
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Image_3")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/0edd48fc-8c9f-4c34-b312-e13042a81790"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  });